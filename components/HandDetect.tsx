"use client";

import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/hand-pose-detection";
import Webcam from "react-webcam";

export default function HandDetect() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runHandPose = async () => {
    const net = await handpose.createDetector(handpose.SupportedModels.MediaPipeHands, {
      runtime: "mediapipe",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
      modelType: "full",
    });
    console.log("handpose loaded");
  };

  runHandPose();

  return (
    <div className="relative w-full h-full">
      <Webcam
        ref={webcamRef}
        className="absolute inset-0 w-[640px] h-[480px] text-center mx-auto scale-x-[-1]"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-[640px] h-[480px] text-center mx-auto"
      />
    </div>
  );
}
