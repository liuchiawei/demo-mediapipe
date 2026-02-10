"use client";

import { useRef, useState, useEffect } from "react";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { gestureRecognizerConfig } from "@/lib/config";
import type { GestureItem } from "@/lib/gesture";
import { parseGestureResult } from "@/lib/gesture";
import {
  drawGestureLandmarks,
  clearGestureCanvas,
} from "@/lib/drawGestureLandmarks";
import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

const THROTTLE_MS = 100;

export function useGestureRecognizer(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>
): { ready: boolean; gestures: GestureItem[] } {
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const [ready, setReady] = useState(false);
  const [gestures, setGestures] = useState<GestureItem[]>([]);
  const gesturesRef = useRef<GestureItem[]>([]);
  const lastFlushRef = useRef(0);
  /** Previous frame landmarks: draw first, then run recognition (smoother paint). */
  const lastLandmarksRef = useRef<NormalizedLandmark[][]>([]);

  useEffect(() => {
    let cancelled = false;
    const { wasmPath, modelPath, options } = gestureRecognizerConfig;

    async function init() {
      try {
        const vision = await FilesetResolver.forVisionTasks(wasmPath);
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: { modelAssetPath: modelPath },
          runningMode: options.runningMode,
          numHands: options.numHands,
        });
        if (!cancelled) {
          recognizerRef.current = recognizer;
          setReady(true);
        } else {
          recognizer.close();
        }
      } catch (err) {
        if (!cancelled) {
          console.error("GestureRecognizer init failed:", err);
          setReady(false);
        }
      }
    }

    init();
    return () => {
      cancelled = true;
      recognizerRef.current?.close();
      recognizerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    let rafId: number;
    let cancelled = false;

    function flushGestures(now: number) {
      if (now - lastFlushRef.current >= THROTTLE_MS) {
        lastFlushRef.current = now;
        setGestures([...gesturesRef.current]);
      }
    }

    function loop() {
      if (cancelled) return;

      const video = videoRef.current;
      const recognizer = recognizerRef.current;
      const canvas = canvasRef.current;

      if (!video || !recognizer) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      if (video.readyState < 2) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      // Draw previous frame's landmarks first so this frame can paint without waiting for recognition.
      if (canvas) {
        const prev = lastLandmarksRef.current;
        if (prev.length > 0) {
          drawGestureLandmarks(canvas, video, prev);
        } else {
          clearGestureCanvas(canvas, video.videoWidth, video.videoHeight);
        }
      }

      try {
        const result = recognizer.recognizeForVideo(video, performance.now());
        const items = parseGestureResult(result);
        gesturesRef.current = items;
        flushGestures(performance.now());
        lastLandmarksRef.current = (result.landmarks ?? []) as NormalizedLandmark[][];
      } catch (_) {
        lastLandmarksRef.current = [];
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [ready, videoRef, canvasRef]);

  return { ready, gestures };
}
