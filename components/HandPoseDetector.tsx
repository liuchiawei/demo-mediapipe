"use client";

import { useRef } from "react";
import Webcam from "@/components/Webcam";
import GestureDisplaySection from "@/components/section/GestureDisplaySection";
import { mediaConfig } from "@/lib/config";
import { useGestureRecognizer } from "@/lib/useGestureRecognizer";
import type { GestureItem } from "@/lib/gesture";
import { HandPoseDetector as HandPoseDetectorMessage } from "@/lib/message";

export type { GestureItem };

export default function HandPoseDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ready, gestures } = useGestureRecognizer(videoRef, canvasRef);
  const { width } = mediaConfig.video;

  return (
    <div className="flex flex-col items-center gap-4">
      {!ready ? (
        <p className="text-muted-foreground">
          {HandPoseDetectorMessage.loadingMessage}
        </p>
      ) : null}
      <div
        className="relative overflow-hidden rounded-lg bg-black shadow-lg"
        style={{ width, maxWidth: "100%" }}
      >
        <Webcam ref={videoRef} className="block h-full w-full object-cover" />
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 object-cover"
        />
      </div>
      <GestureDisplaySection
        gestures={gestures}
        ready={ready}
        emptyMessage={HandPoseDetectorMessage.emptyMessage}
      />
    </div>
  );
}
