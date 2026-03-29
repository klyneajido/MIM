"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  caption: string;
  imageUrl: string;
};

export default function CopyButtons({ caption, imageUrl }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyText(value: string, type: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      alert("Copy failed. Browser blocked clipboard.");
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => copyText(caption, "caption")}>{copied === "caption" ? "Copied Caption" : "Copy Caption"}</Button>

      <Button onClick={() => copyText(imageUrl, "url")} variant="secondary">
        {copied === "url" ? "Copied URL" : "Copy Image URL"}
      </Button>

      <Button asChild variant="secondary">
        <a href={imageUrl} download>
          Download Image
        </a>
      </Button>
    </div>
  );
}