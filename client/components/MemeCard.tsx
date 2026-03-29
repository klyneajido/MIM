import Image from "next/image";
import Link from "next/link";
import { Meme } from "@/types/meme";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MemeCard({ meme }: { meme: Meme }) {
  return (
    <Link href={`/meme/${meme.slug}`} className="group block">
      <Card className="overflow-hidden transition hover:-translate-y-1 hover:border-zinc-700">
        <div className="relative aspect-square overflow-hidden bg-zinc-900">
          <Image src={meme.image} alt={meme.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
        </div>

        <CardContent className="space-y-3 p-4">
          <div>
            <p className="text-lg font-semibold text-white">{meme.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{meme.caption}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>{meme.category}</Badge>
            {meme.tags.slice(0, 2).map((tag: any) => (
              <Badge key={tag} variant="default">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}