import { supabase } from "./supabase";
import { Meme } from "@/types/meme";

export async function fetchMemes(): Promise<Meme[]> {
  const { data, error } = await supabase
    .from("memes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching memes:", error);
    return [];
  }

  return data as Meme[];
}