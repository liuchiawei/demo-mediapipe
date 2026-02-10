"use client";

import { forwardRef, useRef, useState, useEffect, useCallback } from "react";
import { mediaConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const Webcam = forwardRef<HTMLVideoElement, { className?: string }>(
  function Webcam({ className }, ref) {
    const webcamRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    const setRefs = useCallback(
      (el: HTMLVideoElement | null) => {
        (webcamRef as React.MutableRefObject<HTMLVideoElement | null>).current =
          el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      },
      [ref],
    );

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
          ref={setRefs}
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
  },
);

export default Webcam;
