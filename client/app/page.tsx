import { getMemes } from "@/lib/getMemes";
import HomeClient from "@/components/HomeClient";

export  default async function HomePage() {
  const memes = await getMemes();

  return <HomeClient memes={memes} />;
}