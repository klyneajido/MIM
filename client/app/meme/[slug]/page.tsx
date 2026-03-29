// client/app/meme/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { getMemes } from "@/lib/getMemes";
interface Props {
  params: { slug: string };
}

export default function MemePage({ params }: Props) {
const memes = getMemes();
  const meme = memes.find((m: any) => m.id === params.slug);

  if (!meme) return notFound();

  return (
    <div>
      <h1>{meme.title}</h1>
      <img src={meme.image} alt={meme.title} />
      <p>Category: {meme.category}</p>
    </div>
  );
}