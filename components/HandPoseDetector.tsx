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
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="min-h-[1.5rem] flex items-center justify-center text-center">
        {!ready ? (
          <p className="text-muted-foreground text-sm">
            {HandPoseDetectorMessage.loadingMessage}
          </p>
        ) : null}
      </div>
      <div
        className="relative w-full overflow-hidden rounded-lg bg-black shadow-lg aspect-video"
        style={{ width, maxWidth: "100%" }}
      >
        <Webcam ref={videoRef} className="block h-full w-full object-cover" />
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          width={width}
          height={mediaConfig.video.height}
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
