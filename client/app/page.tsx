import { getMemes } from "@/lib/getMemes";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  const memes = getMemes();

  return <HomeClient memes={memes} />;
}