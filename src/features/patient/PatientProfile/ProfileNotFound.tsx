import { UserXIcon } from 'lucide-react';

interface ProfileNotFoundProps {
  id: string | undefined;
  onBack: () => void;
}

export function ProfileNotFound({ id, onBack }: ProfileNotFoundProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <div className="flex flex-col items-center gap-3 max-w-sm text-center">
        <div className="w-10 h-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center border border-border">
          <UserXIcon className="w-5 h-5" />
        </div>
        <p className="text-foreground text-sm font-semibold">Patient record not found</p>
        <p className="text-xs text-muted-foreground">
          {/* Safe rendering — id is guaranteed to be defined here (checked in loadProfile) */}
          No patient record matches identifier <span className="font-mono text-foreground font-medium">{id ?? 'unknown'}</span>.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium transition-colors shadow-xs cursor-pointer active:scale-[0.985]"
        >
          Back to Ledger
        </button>
      </div>
    </div>
  );
}
