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
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
    'relative': 'relative'
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "w-[calc(100vw-3rem)] sm:w-80",
        "rounded-xl  border border-slate-700",
        "bg-zinc-100 p-4 sm:p-5 ", "backdrop-blur-lg",
        "shadow-xl shadow-black/20 ", "isolate z-10000",
        "animate-in fade-in slide-in-from-bottom-3 sm:slide-in-from-bottom-5 duration-300",
        "dark:border-slate-700 dark:bg-zinc-950 ",
        positions[position], className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// --- 2. Header & Title ---
export const TourHeader = ({ children, onClose }: TourHeaderProps) => (
  <div className="flex items-start justify-between mb-2">
    <div className="flex flex-col gap-1">{children}</div>
    {onClose && (
      <button
        onClick={onClose}
        type="button"
        className=
        {cn(
          "rounded-sm",
          "opacity-70 hover:opacity-100",
          "transition-opacity",
          "focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ring-offset-white",
          "dark:focus:ring-slate-300 dark:ring-offset-slate-950"
        )}
      >
        <XIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        <span className="sr-only">Close</span>
      </button>
    )}
  </div>
);

export const TourTitle = ({ children, className = '', ...props }: TourSharedProps) => (
  <h3
    className={`font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-50 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

// --- 3. Description/Content ---
export const TourDescription = ({ children, className = '', ...props }: TourSharedProps) => (
  <div
    className={`text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed tracking-wider ${className}`}
    {...props}
  >
    {children}
  </div>
);

// --- 4. Footer ---
export const TourFooter = ({ children, className = '', ...props }: TourSharedProps) => (
  <div
    className={`flex items-center justify-between mt-2 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// --- 5. Reusable Button ---
export const TourButton = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: TourButtonProps) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 h-10 px-4 py-2";

  const variants: Record<NonNullable<TourButtonProps['variant']>, string> = {
    primary: "bg-zinc-900 text-slate-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-slate-900 dark:hover:bg-zinc-50/90 shadow",
    outline: "border border-slate-200 bg-transparent hover:bg-zinc-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-zinc-800 dark:hover:text-slate-50",
    ghost: "hover:bg-zinc-100 hover:text-slate-900 dark:hover:bg-zinc-800 dark:hover:text-slate-50"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};