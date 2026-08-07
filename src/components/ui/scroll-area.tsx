import * as React from 'react';
import { cn } from '@/lib/utils';

// Hides scrollbar across webkit (Chrome/Safari), legacy IE/Edge, and Firefox without disabling
// scrollability — overflow is intentionally NOT set here so callers control overflow direction/bounds.
const HIDE_SCROLLBAR = '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Ref: ADR-PP-25 — forwardRef passes DOM ref to underlying scroll container.
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(HIDE_SCROLLBAR, className)} {...props}>
        {children}
      </div>
    );
  }
);

// Explicit displayName required for React DevTools component tree inspection
ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
export default ScrollArea;
