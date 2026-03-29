"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import MemeGrid from "@/components/MemeGrid";
import { memes } from "@/types/meme";
import { categories, filterMemes } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return filterMemes(memes, search, category);
  }, [search, category]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Badge className="w-fit px-4 py-2 uppercase tracking-[0.2em]" variant="default">
            Meme Reply Engine
          </Badge>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Search a meme. Copy the vibe. Reply instantly.</h1>
            <p className="text-base text-zinc-400 sm:text-lg">
              Find reaction meme
            </p>
          </div>
        </div>

        <Card className="bg-zinc-950/70">
          <CardContent className="space-y-4 p-4 sm:p-6">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter categories={categories} active={category} onChange={setCategory} />
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-400">
            Showing <span className="font-semibold text-white">{filtered.length}</span> meme{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        <MemeGrid memes={filtered} />
      </section>
    </main>
  );
}
