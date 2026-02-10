import Webcam from "./Webcam";

export default function HandPose() {
  return (
    <div>
      <h1>Hand Pose</h1>
      <Webcam className="w-full max-w-2xl rounded-lg border" />
    </div>
  );
}
