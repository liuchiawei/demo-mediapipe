"use client";

import type { GestureItem } from "@/lib/gesture";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { HandLables, HandPoseDetector } from "@/lib/message";

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
    <div className="w-full grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{HandLables.left}</CardTitle>
        </CardHeader>
        <CardContent>
          {leftGestures.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {HandPoseDetector.emptyMessage}
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {leftGestures.map((g, i) => (
                <li key={`left-${g.name}-${i}`}>
                  <Badge variant="secondary">
                    {g.name} ({(g.score * 100).toFixed(0)}%)
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{HandLables.right}</CardTitle>
        </CardHeader>
        <CardContent>
          {rightGestures.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {HandPoseDetector.emptyMessage}
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {rightGestures.map((g, i) => (
                <li key={`right-${g.name}-${i}`}>
                  <Badge variant="secondary">
                    {g.name} ({(g.score * 100).toFixed(0)}%)
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
