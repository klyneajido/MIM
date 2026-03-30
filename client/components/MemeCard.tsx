"use client";

import Image from "next/image";
import { Meme } from "@/types/meme";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

interface MemeCardProps {
  meme: Meme;
  onOpen: (meme: Meme) => void;
}

export default function MemeCard({ meme, onOpen }: MemeCardProps) {
  const [doneCopying, setDoneCopying] = useState(false);

  const copyImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent,
      );

      if (isMobile) {
        // Mobile: download the image
        const link = document.createElement("a");
        link.href = meme.image;
        link.download = meme.title || "image.png";
        link.click();
        alert("Image downloaded. You can now view it in your gallery.");
      } else {
        // Desktop: copy to clipboard
        if (!navigator.clipboard || !(window as any).ClipboardItem) {
          alert("Clipboard API not supported on this browser.");
          return;
        }

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
      }
    } catch (err) {
      console.error(err);
      alert("Failed to copy/download image. Try long-pressing on mobile.");
    } finally {
      setDoneCopying(true);
    }
  };
  return (
    <Card
      onClick={() => onOpen(meme)}
      className="relative rounded h-full overflow-hidden border-zinc-800 bg-zinc-900 group transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-zinc-900">
        <Image
          src={meme.image}
          alt={meme.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-100"
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
    </Card>
  );
}
