import { cn } from "@/lib";

interface FieldErrorProps {
  message?: string;
  className?: string;
}

export function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p 
      className={cn(
        "text-red-500 text-xs mt-1 animate-in fade-in slide-in-from-top-1",
        className
      )}
    >
      {message}
    </p>
  );
}
