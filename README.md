# Demo MediaPipe — Gesture Detection

Real-time gesture recognition demo built with **Next.js** and **MediaPipe Tasks Vision**, using the browser **web camera**.

**Read in other languages:** [日本語 (README.ja.md)](README.ja.md) · [繁體中文 (README.zh-TW.md)](README.zh-TW.md)

## Tech Stack

- **Next.js** — React framework
- **@mediapipe/tasks-vision** — MediaPipe Vision Tasks API (e.g. `GestureRecognizer`). **Not** the legacy `@mediapipe/hands`
- **Web Camera** — Live video stream from the browser

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## About This Project

This project uses **@mediapipe/tasks-vision** (`GestureRecognizer`, `FilesetResolver`) for gesture recognition with the web camera. It does **not** use the deprecated `@mediapipe/hands` package.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MediaPipe Tasks Vision — Gesture Recognizer](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer)
