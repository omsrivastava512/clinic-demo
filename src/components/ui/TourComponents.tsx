import { type ReactNode } from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib';

// --- Types & Interfaces ---

interface TourCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'relative';
}

interface TourHeaderProps {
  children: ReactNode;
  onClose?: () => void;
}

interface TourSharedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface TourButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

// --- 1. Main Container ---
export const TourCard = ({
  children,
  className = '',
  position = 'bottom-right',
  ...props
}: TourCardProps) => {
  const positions: Record<NonNullable<TourCardProps['position']>, string> = {
    'bottom-right': 'fixed bottom-5 right-5',
    'bottom-left': 'fixed bottom-5 left-5',
    'top-right': 'fixed top-5 right-5',
    'top-left': 'fixed top-5 left-5',
    'relative': 'relative'
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "w-[calc(100vw-2.5rem)] sm:w-84",
        "rounded-xl border border-border bg-card/95 p-4 sm:p-5",
        "backdrop-blur-md shadow-lg dark:shadow-2xl z-50",
        "animate-in fade-in slide-in-from-bottom-2 duration-200",
        positions[position],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// --- 2. Header & Title ---
export const TourHeader = ({ children, onClose }: TourHeaderProps) => (
  <div className="flex items-start justify-between gap-2 mb-2">
    <div className="flex flex-col gap-0.5">{children}</div>
    {onClose && (
      <button
        onClick={onClose}
        type="button"
        className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/40"
      >
        <XIcon className="h-3.5 w-3.5" />
        <span className="sr-only">Close</span>
      </button>
    )}
  </div>
);

export const TourTitle = ({ children, className = '', ...props }: TourSharedProps) => (
  <h3
    className={cn("text-xs font-semibold text-foreground tracking-tight uppercase tracking-wider", className)}
    {...props}
  >
    {children}
  </h3>
);

// --- 3. Description/Content ---
export const TourDescription = ({ children, className = '', ...props }: TourSharedProps) => (
  <div
    className={cn("text-xs text-muted-foreground mb-4 leading-relaxed", className)}
    {...props}
  >
    {children}
  </div>
);

// --- 4. Footer ---
export const TourFooter = ({ children, className = '', ...props }: TourSharedProps) => (
  <div
    className={cn("flex items-center justify-between pt-2 border-t border-border/50", className)}
    {...props}
  >
    {children}
  </div>
);

// --- 5. Action Buttons ---
export const TourButton = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: TourButtonProps) => {
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs',
    outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
    ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
  };

  return (
    <button
      type="button"
      className={cn(
        "px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
