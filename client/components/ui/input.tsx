import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs text-zinc-100 transition-colors outline-none",
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground",
        "placeholder:text-zinc-500",
        "focus-visible:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500/50", 
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "dark:bg-zinc-900/50 dark:border-zinc-800", 
        className
      )}
      {...props}
    />
  )
}
export { Input }
