export function ProfileLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3 text-zinc-500">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-300 dark:border-zinc-600 border-t-zinc-600 dark:border-t-zinc-300 animate-spin" />
        <p className="text-sm">Loading patient profile…</p>
      </div>
    </div>
  );
}
