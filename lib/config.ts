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
  