import handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { detectorConfig } from "./config";

const model = handPoseDetection.SupportedModels.MediaPipeHands;
const config = {
  runtime: detectorConfig.runtime as "mediapipe" | "tfjs",
  solutionPath: detectorConfig.solutionPath,
  modelType: detectorConfig.modelType as "full" | "lite",
};

export const detector = await handPoseDetection.createDetector(model, config);