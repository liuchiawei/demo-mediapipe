"use client";

import { useRef, useState, useEffect } from "react";
import { mediaConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Webcam({ className }: { className?: string }) {
  const webcamRef = useRef<HTMLVideoElement>(null);
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
    if (!stream || !webcamRef.current) return;
    webcamRef.current.srcObject = stream;
  }, [stream]);

  return (
    <>
      {error && (
        <p role="alert" className="text-red-500">
          {error}
        </p>
      )}
      <video
        ref={webcamRef}
        autoPlay
        playsInline
        muted
        className={cn(
          "bg-black aspect-video object-cover scale-x-[-1]",
          className,
        )}
      />
    </>
  );
}
