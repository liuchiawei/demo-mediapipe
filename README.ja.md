# Demo MediaPipe — ジェスチャー検出

**Next.js** と **MediaPipe Tasks Vision** を使ったリアルタイムジェスチャー認識デモです。ブラウザの **Web カメラ**で手の動きを検出します。

## 技術スタック

- **Next.js** — React フレームワーク
- **@mediapipe/tasks-vision** — MediaPipe Vision Tasks API（`GestureRecognizer` など）。旧版の **@mediapipe/hands** は使用しません
- **Web カメラ** — ブラウザから取得するライブ映像

## はじめに

依存関係のインストール:

```bash
pnpm install
```

開発サーバーの起動:

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## プロジェクトについて

本プロジェクトは **@mediapipe/tasks-vision** の `GestureRecognizer` と `FilesetResolver` でジェスチャー認識を行い、Web カメラでリアルタイムに検出します。非推奨の `@mediapipe/hands` には依存していません。

## 関連リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [MediaPipe Tasks Vision — ジェスチャー認識](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer)
