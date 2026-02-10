# Demo MediaPipe — 手勢偵測

基於 **Next.js** 與 **MediaPipe Tasks Vision** 的即時手勢辨識示範，使用瀏覽器 **網路攝影機（Web Camera）** 進行手勢偵測。

## 技術棧

- **Next.js** — React 框架
- **@mediapipe/tasks-vision** — MediaPipe Vision Tasks API（如 `GestureRecognizer`），**非**舊版 `@mediapipe/hands`
- **Web Camera** — 透過瀏覽器取得即時影像串流

## 開始使用

安裝依賴：

```bash
pnpm install
```

啟動開發伺服器：

```bash
pnpm dev
```

在瀏覽器開啟 [http://localhost:3000](http://localhost:3000)。

## 專案說明

本專案使用 **@mediapipe/tasks-vision** 的 `GestureRecognizer` 與 `FilesetResolver` 進行手勢辨識，搭配網路攝影機即時偵測手勢，不依賴已棄用的 `@mediapipe/hands`。

## 相關資源

- [Next.js 文件](https://nextjs.org/docs)
- [MediaPipe Tasks Vision — 手勢辨識](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer)
