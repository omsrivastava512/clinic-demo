interface ProfileErrorProps {
  error: string;
  onRetry: () => void;
  onBack: () => void;
}

export function ProfileError({ error, onRetry, onBack }: ProfileErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 max-w-sm text-center">
        <p className="text-zinc-700 dark:text-zinc-300 font-medium">{error}</p>
        <div className="flex gap-3">
          {/* DECISION [TRIGGER: TYPE_CONSTRAINT] [ORIGIN: AI_AUTONOMOUS]: Explicit onRetry invocation prevents leaking React MouseEvent to async caller. */}
          <button type="button" onClick={onRetry}
            className="px-4 py-2 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
            Retry
          </button>
          <button type="button" onClick={onBack}
            className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
