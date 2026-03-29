"use client";

import { Button } from "@/components/ui/button";

type Props = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = active === category;
        return (
          <Button key={category} onClick={() => onChange(category)} variant={isActive ? "default" : "secondary"} size="sm">
            {category}
          </Button>
        );
      })}
    </div>
  );
}
