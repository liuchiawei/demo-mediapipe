"use client";

import type { GestureItem } from "@/lib/gesture";
import { HandLables, HandPoseDetector } from "@/lib/message";
import GestureDisplayCard from "@/components/card/GestureDisplayCard";

function normalizeHand(hand: string): "Left" | "Right" {
  const lower = hand.toLowerCase();
  if (lower === "left") return "Left";
  if (lower === "right") return "Right";
  return "Left";
}

export type GestureDisplaySectionProps = {
  gestures: GestureItem[];
  ready: boolean;
  emptyMessage?: React.ReactNode;
};

export default function GestureDisplaySection({
  gestures,
  ready,
  emptyMessage = HandPoseDetector.emptyMessage,
}: GestureDisplaySectionProps) {
  const leftGestures = gestures.filter((g) => normalizeHand(g.hand) === "Left");
  const rightGestures = gestures.filter(
    (g) => normalizeHand(g.hand) === "Right",
  );

  return (
    <div className="w-full grid grid-cols-2 gap-4 min-h-[7rem]">
      <GestureDisplayCard
        title={HandLables.left}
        gestures={leftGestures}
        ready={ready}
        emptyMessage={emptyMessage}
      />
      <GestureDisplayCard
        title={HandLables.right}
        gestures={rightGestures}
        ready={ready}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
