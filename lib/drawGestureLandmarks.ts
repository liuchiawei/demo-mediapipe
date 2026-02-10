import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
import {
  DrawingUtils,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";

export type DrawGestureLandmarksOptions = {
  connectorColor?: string;
  connectorLineWidth?: number;
  landmarkColor?: string;
  landmarkLineWidth?: number;
  landmarkRadius?: number;
};

const defaultOptions: Required<DrawGestureLandmarksOptions> = {
  connectorColor: "#00ff00",
  connectorLineWidth: 2,
  landmarkColor: "#ff0000",
  landmarkLineWidth: 1,
  landmarkRadius: 3,
};

/**
 * Draw hand landmarks on canvas (mirrored to match Webcam scale-x-[-1]).
 */
export function drawGestureLandmarks(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  landmarks: NormalizedLandmark[][],
  options: DrawGestureLandmarksOptions = {}
): void {
  if (landmarks.length === 0) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const opts = { ...defaultOptions, ...options };
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(-1, 1);
  ctx.translate(-canvas.width, 0);

  const drawingUtils = new DrawingUtils(ctx);
  const connections = GestureRecognizer.HAND_CONNECTIONS;
  for (const handLandmarks of landmarks) {
    drawingUtils.drawConnectors(handLandmarks, connections, {
      color: opts.connectorColor,
      lineWidth: opts.connectorLineWidth,
    });
    drawingUtils.drawLandmarks(handLandmarks, {
      color: opts.landmarkColor,
      lineWidth: opts.landmarkLineWidth,
      radius: opts.landmarkRadius,
    });
  }
  ctx.restore();
}

/**
 * Clear the canvas to the given dimensions.
 */
export function clearGestureCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void {
  const ctx = canvas.getContext("2d");
  if (ctx) ctx.clearRect(0, 0, width, height);
}
