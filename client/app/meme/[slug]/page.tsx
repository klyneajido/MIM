import { notFound } from "next/navigation";
import { getMemes } from "@/lib/getMemes";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function MemePage({ params }: Props) {
  const { slug } = await params;

  const memes = getMemes();
  const meme = memes.find((m) => m.slug === slug);

  if (!meme) return notFound();

  return (
    <div className="mx-auto px-6 py-12 bg-foreground">
      <div className="relative mx-auto max-w-4xl mb-6 aspect-4/5 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <Image
          src={meme.image}
          alt={meme.title}
          fill
          className="object-contain"
        />
      </div>

      <div className="mx-auto space-y-3 text-zinc-300">
        <p>
          <span className=" mx-auto font-semibold text-foreground">Category:</span>{" "}
          {meme.category}
        </p>


        {meme.tags.length > 0 && (
          <p>
            <span className="mx-auto font-semibold text-foreground">Tags:</span>{" "}
            {meme.tags.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}