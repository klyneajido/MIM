"use client";

import Image from "next/image";
import Link from "next/link";
import { Meme } from "@/types/meme";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function MemeCard({ meme }: { meme: Meme }) {
  const [doneCopying, setDoneCopying] = useState(false);

  const copyImage = async () => {
    try {
      const img = document.createElement("img") as HTMLImageElement;
      img.crossOrigin = "anonymous";
      img.src = meme.image;

      await img.decode();

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png"),
      );
      if (!blob) throw new Error("Failed to convert image");

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      console.log("Image copied to clipboard");
    } catch (err) {
      console.error(err);
      alert("Failed to copy image. (JPEG not supported in some browsers)");
    } finally {
      setDoneCopying(true);
    }
  };

  return (
    <Card className="relative rounded h-full overflow-hidden border-zinc-800 bg-zinc-900 group transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]">
      <div className="relative aspect-4/5 overflow-hidden bg-zinc-900">
        <Image
          src={meme.image}
          alt={meme.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 z-10">
          <Badge className="border-white/10 bg-black/60 text-white backdrop-blur-md hover:bg-black/80">
            {meme.category}
          </Badge>
        </div>

        <button
          onClick={copyImage}
          disabled={doneCopying}
          className={`absolute inset-0 z-20 m-auto h-10 w-50 rounded-2xl bg-orange-500/30 text-white text-sm font-semibold backdrop-blur-md 
                      flex items-center justify-center 
                      opacity-0 scale-90 transition-all duration-300 
                      group-hover:opacity-100 group-hover:scale-100
                      ${doneCopying ? "opacity-100 scale-100" : ""}`}
        >
          {doneCopying ? "Copied" : "Copy Image"}
        </button>

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

        </div>
      </CardContent>
    </Card>
  );
}
