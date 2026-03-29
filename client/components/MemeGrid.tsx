import { Meme } from "@/types/meme";
import MemeCard from "./MemeCard";
import { Card, CardContent } from "@/components/ui/card";

export default function MemeGrid({ memes }: { memes: Meme[] }) {
  if (!memes.length) {
    return (
      <Card className="border-dashed text-zinc-900">
        <CardContent className="p-10 text-center text-zinc-900">
          No memes found. Try a different keyword.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
      {memes.map((meme) => (
        <div key={meme.id} className="h-full">
          <MemeCard meme={meme} />
        </div>
      ))}
    </div>
  );
}