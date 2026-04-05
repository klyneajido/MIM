
import HomeClient from "@/components/HomeClient";
import { fetchMemes } from "@/lib/fetchMemes";

export  default async function HomePage() {
  const memes = await fetchMemes();

  return <HomeClient memes={memes} />;
}