export type GestureItem = {
  hand: string;
  name: string;
  score: number;
};

/** Shape of recognizer result used for parsing (avoids coupling to @mediapipe types). */
export type GestureRecognizerResultLike = {
  gestures?: Array<Array<{ categoryName: string; score: number }>>;
  handedness?: Array<Array<{ categoryName: string }>>;
};

export function parseGestureResult(
  result: GestureRecognizerResultLike
): GestureItem[] {
  const items: GestureItem[] = [];
  if (!result.gestures || !result.handedness) return items;
  for (let i = 0; i < result.gestures.length; i++) {
    const handCategories = result.handedness[i];
    const gestureCategories = result.gestures[i];
    const hand = handCategories?.[0]?.categoryName ?? "Unknown";
    const top = gestureCategories?.[0];
    if (top) {
      items.push({
        hand,
        name: top.categoryName,
        score: top.score,
      });
    }
  }
  return items;
}
