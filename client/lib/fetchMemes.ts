
import { Meme } from "@/types/meme";
import { getSupabaseClient } from "./supabase";
export async function fetchMemes(): Promise<Meme[]> {
  const supabase = getSupabaseClient();
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