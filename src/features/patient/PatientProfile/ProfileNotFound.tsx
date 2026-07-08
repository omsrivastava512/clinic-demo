interface ProfileNotFoundProps {
  id: string | undefined;
  onBack: () => void;
}

export function ProfileNotFound({ id, onBack }: ProfileNotFoundProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 max-w-sm text-center">
        <p className="text-zinc-700 dark:text-zinc-300 font-medium">Patient not found</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {/* Safe rendering — id is guaranteed to be defined here (checked in loadProfile) */}
          No patient record matches the ID <span className="font-mono">{id ?? 'unknown'}</span>.
        </p>
        <button type="button" onClick={onBack}
          className="px-4 py-2 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
          Back to Ledger
        </button>
      </div>
    </div>
  );
}
