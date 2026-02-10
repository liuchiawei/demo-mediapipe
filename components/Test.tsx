"use client";

import { useRef, useState, useEffect } from "react";
import {
  FilesetResolver,
  GestureRecognizer,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import Webcam from "@/components/Webcam";
import { mediaConfig } from "@/lib/config";

const WASM_PATH =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const MODEL_PATH =
  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";

export type GestureItem = {
  hand: string;
  name: string;
  score: number;
};

export default function Test() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const [ready, setReady] = useState(false);
  const [gestures, setGestures] = useState<GestureItem[]>([]);

  // Initialize GestureRecognizer once
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const vision = await FilesetResolver.forVisionTasks(WASM_PATH);
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_PATH },
          runningMode: "VIDEO",
          numHands: 2,
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

  // Detection loop: run when ready and video is available
  useEffect(() => {
    if (!ready) return;

    let rafId: number;
    let cancelled = false;

    function loop() {
      if (cancelled) return;

      const video = videoRef.current;
      const recognizer = recognizerRef.current;

      if (!video || !recognizer) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      if (video.readyState < 2) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      try {
        const result = recognizer.recognizeForVideo(video, performance.now());
        const items: GestureItem[] = [];

        if (result.gestures && result.handedness) {
          for (let i = 0; i < result.gestures.length; i++) {
            const handCategories = result.handedness[i];
            const gestureCategories = result.gestures[i];
            const hand = handCategories?.[0]?.categoryName ?? "Unknown";
            const top = gestureCategories?.[0];
            if (top) {
              items.push({
                hand,
                name: top.categoryName,
                score: top.score,
              });
            }
          }
        }
        setGestures(items);

        // Draw hand keypoints on canvas (mirrored to match Webcam scale-x-[-1])
        const canvas = canvasRef.current;
        if (canvas && result.landmarks && result.landmarks.length > 0) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-canvas.width, 0);
            const drawingUtils = new DrawingUtils(ctx);
            const connections = GestureRecognizer.HAND_CONNECTIONS;
            for (const landmarks of result.landmarks) {
              drawingUtils.drawConnectors(landmarks, connections, {
                color: "#00ff00",
                lineWidth: 2,
              });
              drawingUtils.drawLandmarks(landmarks, {
                color: "#ff0000",
                lineWidth: 1,
                radius: 3,
              });
            }
            ctx.restore();
          }
        } else if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height,
            );
          }
        }
      } catch (_) {
        // Ignore per-frame errors (e.g. video not ready)
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [ready]);

  const { width } = mediaConfig.video;

  return (
    <div className="flex flex-col items-center gap-4">
      {!ready && (
        <p className="text-muted-foreground">載入模型中…</p>
      )}
      <div
        className="relative overflow-hidden rounded-lg bg-black shadow-lg"
        style={{ width, maxWidth: "100%" }}
      >
        <Webcam
          ref={videoRef}
          className="block h-full w-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ width, maxWidth: "100%" }}
        />
      </div>
      <div className="min-h-[2rem] text-center">
        {gestures.length === 0 && ready && (
          <p className="text-muted-foreground text-sm">將手放入畫面以辨識手勢</p>
        )}
        {gestures.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-3">
            {gestures.map((g, i) => (
              <li
                key={`${g.hand}-${g.name}-${i}`}
                className="rounded-md bg-muted px-3 py-1.5 text-sm font-medium"
              >
                {g.hand}: {g.name} ({(g.score * 100).toFixed(0)}%)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
