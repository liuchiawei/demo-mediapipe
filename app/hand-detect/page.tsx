import HandDetect from "@/components/HandDetect";
import { handDetect } from "@/lib/message";

export default function HandDetectPage() {
  return (
    <main className="flex flex-col justify-center items-center space-y-4 h-svh mx-auto">
      <header
        className="flex flex-col items-center justify-center space-y-1"
        aria-label="text-area"
      >
        <h2 className="text-lg font-semi-bold font-roboto">{handDetect.titleEn}</h2>
        <h1 className="text-3xl font-black">{handDetect.title}</h1>
        <p className="text-sm text-gray-500 text-justify">
          {handDetect.description}
        </p>
      </header>
      <section className="w-full h-full">
        <HandDetect />
      </section>
    </main>
  );
}
