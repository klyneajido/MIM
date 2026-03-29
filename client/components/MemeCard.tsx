"use client";

import Image from "next/image";
import Link from "next/link";
import { Meme } from "@/types/meme";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function MemeCard({ meme }: { meme: Meme }) {
const [copying, setCopying] = useState(false);

  const copyImage = async () => {
    try {
      setCopying(true);

      // Create image element
      const img = document.createElement("img") as HTMLImageElement;
      img.crossOrigin = "anonymous"; // needed if hosted elsewhere
      img.src = meme.image;

      await img.decode();

      // Draw image on canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      // Convert to PNG
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );
      if (!blob) throw new Error("Failed to convert image");

      // Copy to clipboard
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);

      alert("Image copied!");
    } catch (err) {
      console.error(err);
      alert("Failed to copy image. (JPEG not supported in some browsers)");
    } finally {
      setCopying(false);
    }
  };


  return (
    <Card className="relative h-full overflow-hidden border-zinc-800 bg-zinc-900 group transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]">
      <div className="relative aspect-4/5 overflow-hidden bg-zinc-900">
        <Image
          src={meme.image}
          alt={meme.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Category Badge */}
        <div className="absolute left-3 top-3 z-10">
          <Badge className="border-white/10 bg-black/60 text-white backdrop-blur-md hover:bg-black/80">
            {meme.category}
          </Badge>
        </div>

        {/* Hover Copy Button */}
        <button
          onClick={copyImage}
          disabled={copying}
          className="absolute inset-0 z-20 m-auto hidden h-10 w-32 rounded bg-orange-500/90 text-white text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:bg-orange-500 group-hover:flex items-center justify-center"
        >
          {copying ? "Copying..." : "Copy Image"}
        </button>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
      </div>

      <CardContent className="p-4">
        <h3 className="line-clamp-1 text-base font-bold text-zinc-100 transition-colors group-hover:text-orange-500">
          {meme.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-400">
          {meme.caption || "No caption yet."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {meme.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium uppercase tracking-wider text-zinc-500"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="text-zinc-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-orange-500">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}