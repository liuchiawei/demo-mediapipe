import HandPose from "../components/HandPose";
import { TopPage } from "@/lib/message";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-svh mx-auto">
      <header className="space-y-1" aria-label="text-area">
        <h2 className="text-lg font-semi-bold font-roboto text-center">{TopPage.titleEn}</h2>
        <h1 className="text-3xl font-black text-center">{TopPage.title}</h1>
        <p className="text-sm text-gray-500 text-justify">{TopPage.description}</p>
      </header>
      <section className="w-full h-full flex justify-center items-center">
        <HandPose />
      </section>
    </main>
  );
}
