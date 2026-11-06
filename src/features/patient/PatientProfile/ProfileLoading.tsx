export function ProfileLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="w-7 h-7 rounded-full border-2 border-border border-t-primary animate-spin" />
        <p className="text-xs font-medium">Loading clinical profile…</p>
      </div>
    </div>
  );
}
