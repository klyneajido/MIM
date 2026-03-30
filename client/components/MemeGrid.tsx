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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface MemeGridProps {
  memes: Meme[];
}
export default function MemeGrid({ memes }: MemeGridProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 40;

  const totalPages = Math.ceil(memes.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = memes.slice(startIndex, startIndex + itemsPerPage);

  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [isOpen, setIsOpen] = useState(false);

const [isDownloading, setIsDownloading] = useState(false);

const handleDownload = async (imageUrl: string, fileName: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "download.png";
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
const onDownloadClick = async () => {
  if (!selectedMeme) return;
  
  setIsDownloading(true);
  await handleDownload(
    selectedMeme.image, 
    `meme-${selectedMeme.category}-${Date.now()}.png`
  );
  setIsDownloading(false);
};

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
            <MemeCard
              meme={meme}
              onOpen={(clickedMeme) => {
                setSelectedMeme(clickedMeme);
                setIsOpen(true);
              }}
            />
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl overflow-hidden border-zinc-800 bg-zinc-950 p-0 text-white sm:rounded-lg">
          {selectedMeme && (
            <div className="flex flex-col md:flex-row">
              <div className="relative flex flex-1 items-center justify-center bg-black/40">
                <img
                  src={selectedMeme.image}
                  alt={selectedMeme.title}
                  className="h-full max-h-[50vh] w-full object-contain md:max-h-[80vh]"
                />
              </div>

              <div className="flex w-full flex-col border-t border-zinc-800 bg-zinc-950/50 p-5 md:w-[320px] md:border-l md:border-t-0">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-bold tracking-tight">
                    Preview
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                  <section>
                    <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                      Category
                    </h4>
                    <span className="inline-flex items-center rounded-md bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-400 ring-1 ring-inset ring-orange-500/20">
                      {selectedMeme.category}
                    </span>
                  </section>
                  {selectedMeme.tags.length > 0 && (
                    <section>
                      <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMeme.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-zinc-400 hover:text-white cursor-default transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {selectedMeme.keywords.length > 0 && (
                    <section className="border-t border-zinc-900 pt-4">
                      <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                        Keywords
                      </h4>
                      <p className="text-xs leading-relaxed text-zinc-400 line-clamp-3">
                        {selectedMeme.keywords.join(", ")}
                      </p>
                    </section>
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <Button onClick={onDownloadClick}className="w-full bg-white text-black hover:bg-zinc-200 h-9 text-sm">
                    Download Image
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
