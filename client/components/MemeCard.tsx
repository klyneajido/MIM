"use client";

import Image from "next/image";
import { Meme } from "@/types/meme";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react"; 

interface MemeCardProps {
  meme: Meme;
  onOpen: (meme: Meme) => void;
}

export default function MemeCard({ meme, onOpen }: MemeCardProps) {
  const [isCopying, setIsCopying] = useState(false);

  const copyImageToClipboard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const img = document.createElement("img");
      img.crossOrigin = "anonymous";
      img.src = meme.image;
      await img.decode();

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000); 
      }, "image/png");

    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card
      onClick={() => onOpen(meme)}
      className="group relative h-full rounded-sm overflow-hidden border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] cursor-pointer"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-zinc-900">
        <Image
          loading="lazy" 
          src={meme.image}
          alt={meme.category}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 z-10">
          <Badge className="border-white/10 bg-black/40 text-xs font-medium text-white backdrop-blur-md hover:bg-black/60 rounded">
            {meme.category}
          </Badge>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={copyImageToClipboard}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold tracking-wide transition-all duration-200 
              ${isCopying 
                ? "bg-orange-500 text-white" 
                : "bg-white text-black hover:scale-105 active:scale-95"
              } shadow-xl`}
          >
            {isCopying ? (
              <>
                <Check weight="bold" size={16} />
                Copied
              </>
            ) : ( 
              <>
                <Copy weight="bold" size={16} />
                Copy Image
              </>
            )}
          </button>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </Card>
  );
}