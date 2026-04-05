
import HomeClient from "@/components/HomeClient";
import { fetchMemes } from "@/lib/fetchMemes";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const memes = await fetchMemes();
  return <HomeClient memes={memes} />;
}