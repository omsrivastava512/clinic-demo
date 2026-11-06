import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-border/80 bg-card/70 dark:bg-card/40 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/30 disabled:bg-muted/40 disabled:text-muted-foreground rounded-lg border px-3 py-2 text-sm transition-colors duration-150 flex min-h-18 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50 shadow-2xs dark:shadow-none leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
