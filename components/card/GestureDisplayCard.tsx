import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { GestureItem } from '@/lib/gesture';
import { HandLables, HandPoseDetector } from '@/lib/message';

export type GestureDisplayCardProps = {
  title: string;
  gestures: GestureItem[];
  ready: boolean;
  emptyMessage?: React.ReactNode;
};

export default function GestureDisplayCard({ title, gestures, ready, emptyMessage }: GestureDisplayCardProps) {
  return (
    <Card>
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {gestures.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {HandPoseDetector.emptyMessage}
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {gestures.map((g, i) => (
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
  );
}