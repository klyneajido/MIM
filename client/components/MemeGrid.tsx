import { Meme } from "@/types/meme";
import MemeCard from "./MemeCard";
import { Card, CardContent } from "@/components/ui/card";

export default function MemeGrid({ memes }: { memes: Meme[] }) {
  if (!memes.length) {
    return (
      <Card className="border-dashed border-zinc-700 bg-zinc-900">
        <CardContent className="p-10 text-center text-zinc-400">
          No memes found. Try a different keyword.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {memes.map((meme) => (
        <div key={meme.id} className="h-full">
          <MemeCard meme={meme} />
        </div>
      ))}
    </div>
  );
}