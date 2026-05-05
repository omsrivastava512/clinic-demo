import type { PurchaseRecord } from '@/types';

export interface PurchasesTabProps {
  purchases: PurchaseRecord[];
}

const statusClass: Record<PurchaseRecord['status'], string> = {
  Active: 'bg-emerald-950/50 text-emerald-200 border border-emerald-900/50',
  Completed: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
  Expired: 'bg-red-950/50 text-red-200 border border-red-900/50',
};

export function PurchasesTab({ purchases }: PurchasesTabProps) {
  if (purchases.length === 0) {
    return <p className="text-sm text-zinc-600 italic py-4">No purchased packages found.</p>;
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {purchases.map((pkg) => (
        <div key={pkg.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 relative overflow-hidden">
          {/* Top accent bar for active packages */}
          {pkg.status === 'Active' && (
            <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-600" />
          )}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-semibold text-white">{pkg.name}</p>
            </div>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass[pkg.status]}`}>
              {pkg.status}
            </span>
          </div>
          {/* Segmented progress bar */}
          <div>
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-zinc-400 text-xs">Progress</span>
              <span className="tabular-nums text-zinc-500 text-xs">{pkg.sessionsUsed} / {pkg.sessionsTotal} Sessions</span>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: pkg.sessionsTotal }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 flex-1 rounded-full transition-all ${
                    i < pkg.sessionsUsed
                      ? 'bg-emerald-600'
                      : i === pkg.sessionsUsed && pkg.status === 'Active'
                      ? 'bg-zinc-900 border border-emerald-600/50'
                      : 'bg-zinc-800 border border-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PurchasesTab;
