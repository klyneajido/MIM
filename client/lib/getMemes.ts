import "server-only"
import { Meme } from "@/types/meme";
import path from "path";
import fs from "fs";

export function getMemes(): Meme[] {
  const memesDirectory = path.join(process.cwd(), "public/memes");
  const files = fs.readdirSync(memesDirectory);

  return files.map((file, index) => {
    const name = file.replace(/\.[^/.]+$/, "");
    
    return {
      id: index + 1,
      title: name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      slug: name.toLowerCase().replace(/[_\s]+/g, "-"),
      image: `/memes/${file}`,
      caption: "",
      tags: [],
      category: "Uncategorized",
      keywords: [],
    };
  });
}