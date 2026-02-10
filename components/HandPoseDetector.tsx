"use client";

import { useRef } from "react";
import Webcam from "@/components/Webcam";
import { mediaConfig } from "@/lib/config";
import { useGestureRecognizer } from "@/lib/useGestureRecognizer";
import type { GestureItem } from "@/lib/gesture";

const loadingMessage = (
  <p className="text-muted-foreground">モデルを読み込み中です…</p>
);

const emptyMessage = (
  <p className="text-muted-foreground text-sm">手を画面にかざしてください</p>
);

export type { GestureItem };

export default function HandPoseDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ready, gestures } = useGestureRecognizer(videoRef, canvasRef);
  const { width } = mediaConfig.video;

  return (
    <div className="flex flex-col items-center gap-4">
      {!ready ? loadingMessage : null}
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
        {gestures.length === 0 && ready ? emptyMessage : null}
        {gestures.length > 0 ? (
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
        ) : null}
      </div>
    </div>
  );
}
