import { AlertCircleIcon } from 'lucide-react';

interface ProfileErrorProps {
  error: string;
  onRetry: () => void;
  onBack: () => void;
}

export function ProfileError({ error, onRetry, onBack }: ProfileErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <div className="flex flex-col items-center gap-3.5 max-w-sm text-center">
        <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20">
          <AlertCircleIcon className="w-5 h-5" />
        </div>
        <p className="text-foreground text-sm font-medium">{error}</p>
        <div className="flex gap-2.5 mt-1">
          {/* DECISION [TRIGGER: TYPE_CONSTRAINT] [ORIGIN: AI_AUTONOMOUS]: Explicit onRetry invocation prevents leaking React MouseEvent to async caller. */}
          <button
            type="button"
            onClick={onRetry}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium transition-colors shadow-xs cursor-pointer active:scale-[0.985]"
          >
            Retry
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted text-xs font-medium transition-colors cursor-pointer active:scale-[0.985]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
