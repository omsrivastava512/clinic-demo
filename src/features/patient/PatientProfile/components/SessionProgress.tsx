interface SessionProgressProps {
  sessionsUsed: number;
  sessionsTotal: number;
  isActive: boolean;
}

export function SessionProgress({ sessionsUsed, sessionsTotal, isActive }: SessionProgressProps) {
  return (
    <div>
      <div className="flex justify-between text-xs font-medium mb-2">
        <span className="text-zinc-500">Progress</span>
        <span className="tabular-nums text-zinc-500">{sessionsUsed} / {sessionsTotal} Sessions</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: sessionsTotal }).map((_, i) => (
          <div key={i} className={`h-2.5 flex-1 rounded-full transition-all ${
            i < sessionsUsed
              ? 'bg-emerald-500'
              : i === sessionsUsed && isActive
              ? 'bg-zinc-100 dark:bg-zinc-900 border border-emerald-500/50'
              : 'bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'
          }`} />
        ))}
      </div>
    </div>
  );
}
