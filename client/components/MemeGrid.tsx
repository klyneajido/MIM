import { Meme } from "@/types/meme";
import MemeCard from "./MemeCard";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MemeGridProps {
  memes: Meme[];
}
export default function MemeGrid({ memes }: MemeGridProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 40;

  const totalPages = Math.ceil(memes.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = memes.slice(startIndex, startIndex + itemsPerPage);

  if (!memes.length) {
    return (
      <Card className="border-dashed border-zinc-700 bg-zinc-900">
        <CardContent className="p-10 text-center text-zinc-400">
          No memes found. Try a different keyword.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map((meme) => (
          <div key={meme.id} className="h-fit">
            <MemeCard meme={meme} />
          </div>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
