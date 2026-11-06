import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "border-border/80 bg-card/70 dark:bg-card/40 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/30 disabled:bg-muted/40 disabled:text-muted-foreground h-8.5 rounded-lg border px-3 py-1 text-sm transition-colors duration-150 w-full min-w-0 outline-none file:h-6 file:text-xs file:font-medium file:border-0 file:bg-transparent file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 shadow-2xs dark:shadow-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
