export const mediaConfig = {
  video: {
    width: 640,
    height: 360,
    facingMode: "user",
  },
  audio: false,
};

export const detectorConfig = {
  runtime: 'mediapipe', // or 'tfjs',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
  modelType: 'full'
};

export const gestureRecognizerConfig = {
  wasmPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  modelPath:
    "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
  options: {
    runningMode: "VIDEO" as const,
    numHands: 2,
  },
};
  