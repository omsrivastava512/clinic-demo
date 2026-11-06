import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "h-5 gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-2 overflow-hidden group/badge tabular-nums",
  {
    variants: {
      variant: {
        default: "bg-primary/12 text-primary border-primary/25 dark:bg-primary/15 dark:border-primary/30",
        secondary: "bg-secondary text-secondary-foreground border-border/70",
        destructive: "bg-destructive/10 text-destructive border-destructive/25 dark:bg-destructive/15 dark:border-destructive/30",
        outline: "border-border text-foreground/90 bg-card/50",
        ghost: "hover:bg-muted hover:text-foreground text-muted-foreground border-transparent",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
