import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
import {
  DrawingUtils,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";

const HAND_CONNECTIONS = GestureRecognizer.HAND_CONNECTIONS;

/** Reused style objects to avoid per-frame allocation. */
const DEFAULT_CONNECTOR_STYLE = {
  color: "#00ff00",
  lineWidth: 2,
};
const DEFAULT_LANDMARK_STYLE = {
  color: "#ff0000",
  lineWidth: 1,
  radius: 3,
};

const ctxOptions: CanvasRenderingContext2DSettings = {
  willReadFrequently: false,
};

const canvasCache = new WeakMap<
  HTMLCanvasElement,
  { ctx: CanvasRenderingContext2D; drawingUtils: DrawingUtils }
>();

function getCachedContextAndUtils(
  canvas: HTMLCanvasElement
): { ctx: CanvasRenderingContext2D; drawingUtils: DrawingUtils } | null {
  let cached = canvasCache.get(canvas);
  if (!cached) {
    const ctx = canvas.getContext("2d", ctxOptions);
    if (!ctx) return null;
    cached = { ctx, drawingUtils: new DrawingUtils(ctx) };
    canvasCache.set(canvas, cached);
  }
  return cached;
}

export type DrawGestureLandmarksOptions = {
  connectorColor?: string;
  connectorLineWidth?: number;
  landmarkColor?: string;
  landmarkLineWidth?: number;
  landmarkRadius?: number;
};

/**
 * Draw hand landmarks on canvas (mirrored to match Webcam scale-x-[-1]).
 * Optimized: only resizes canvas when dimensions change, reuses DrawingUtils and style objects.
 */
export function drawGestureLandmarks(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  landmarks: NormalizedLandmark[][],
  _options: DrawGestureLandmarksOptions = {}
): void {
  if (landmarks.length === 0) return;
  const cached = getCachedContextAndUtils(canvas);
  if (!cached) return;
  const { ctx, drawingUtils } = cached;

  const w = video.videoWidth;
  const h = video.videoHeight;
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(-1, 1);
  ctx.translate(-canvas.width, 0);

  for (const handLandmarks of landmarks) {
    drawingUtils.drawConnectors(handLandmarks, HAND_CONNECTIONS, DEFAULT_CONNECTOR_STYLE);
    drawingUtils.drawLandmarks(handLandmarks, DEFAULT_LANDMARK_STYLE);
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
