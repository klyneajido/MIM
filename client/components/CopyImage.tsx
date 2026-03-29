"use client";

import { useState } from "react";

export default function CopyImageButton({ imageUrl }: { imageUrl: string }) {
  const [copying, setCopying] = useState(false);

  const copyImage = async () => {
    try {
      setCopying(true);

      // Create image element
      const img = document.createElement("img") as HTMLImageElement;
      img.crossOrigin = "anonymous"; // needed if hosted elsewhere
      img.src = imageUrl;

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
    <button
      onClick={copyImage}
      disabled={copying}
      className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:opacity-50"
    >
      {copying ? "Copying..." : "Copy Image"}
    </button>
  );
}