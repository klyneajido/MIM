import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { memes } from "@/types/meme";
import CopyButtons from "@/components/CopyButtons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return memes.map((meme) => ({ slug: meme.slug }));
}

export default async function MemeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meme = memes.find((item) => item.slug === slug);

  if (!meme) return notFound();

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          ← Back to memes
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="relative aspect-square overflow-hidden bg-zinc-950">
            <Image src={meme.image} alt={meme.title} fill className="object-cover" />
          </Card>

          <Card>
            <CardContent className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
              <div className="space-y-3">
                <Badge className="w-fit">{meme.category}</Badge>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{meme.title}</h1>
                <p className="text-lg text-zinc-300">{meme.caption}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {meme.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <CopyButtons caption={meme.caption} imageUrl={meme.image} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}