"use client";

import { useEffect, useRef, useState } from "react";
import { mediaConfig } from "@/lib/config";

export default function HandPose() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    async function initCamera() {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: mediaConfig.video.width,
            height: mediaConfig.video.height,
            facingMode: mediaConfig.video.facingMode,
          },
          audio: mediaConfig.audio,
        });
        setStream(mediaStream);
      } catch (err) {
        setError(
          err instanceof Error
            ? `${err.message} | カメラの取得に失敗しました`
            : "Unable to access camera | カメラの取得に失敗しました",
        );
      }
    }

    initCamera();
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!stream || !videoRef.current) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div>
      <h1>Hand Pose</h1>
      {error && <p role="alert">{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full max-w-2xl rounded-lg border bg-black aspect-video object-cover"
        // scaleX(-1) is used to flip the video horizontally
        style={{ transform: "scaleX(-1)" }}
      />
    </div>
  );
}
