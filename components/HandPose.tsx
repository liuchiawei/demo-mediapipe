"use client";

import { useRef } from "react";
import Webcam from "./Webcam";

export default function HandPose() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div className="relative w-[640px] h-[480px]">
      <Webcam className="absolute inset-0 w-[640px] h-[480px] text-center" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-[640px] h-[480px] text-center"
      />
    </div>
  );
}
