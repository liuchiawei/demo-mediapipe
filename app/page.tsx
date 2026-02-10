import HandPoseDetector from "@/components/HandPoseDetector";

export default function MediaPipeTasksVisionPage() {
  return (
    <main className="flex flex-col justify-start items-center w-full max-w-3xl min-h-svh pt-6 pb-8 px-4 mx-auto">
      <HandPoseDetector />
    </main>
  );
}