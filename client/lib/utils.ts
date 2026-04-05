import { Meme } from "@/types/meme";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const categories = ["All", "Happy", "Sad", "Angry", "Disappointed", "Freaky", "Uncategorized"];  

export function filterMemes(memes: Meme[], search: string, category: string) {
  const query = search.trim().toLowerCase();

  return memes.filter((meme) => {
    const matchesCategory = category === "All" || meme.category === category;

   const haystack = [
      meme.category,
      meme.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

       const matchesSearch = !query || haystack.includes(query);
       return matchesCategory && matchesSearch;
  });
}

