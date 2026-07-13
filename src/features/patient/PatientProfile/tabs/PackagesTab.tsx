import type { PurchaseRecord } from '@/types';
import { StatusBadge } from '@/components/common/status-badge';
import type { StatusBadgeVariant } from '@/components/common/status-badge';
import { SessionProgress } from '../components/SessionProgress';
import { PackageOpen } from 'lucide-react';

export interface PackagesTabProps {
  purchases: PurchaseRecord[];
}

const STATUS_VARIANT: Record<PurchaseRecord['status'], StatusBadgeVariant> = {
  Active:    'active',
  Completed: 'completed',
  Expired:   'expired',
};

// DECISION: Renamed from PurchasesTab to PackagesTab to reflect the clinical "Course of Treatment" mental model.
// Also upgraded the empty state to a high-fidelity visual matching the rest of the application.
export function PackagesTab({ purchases }: PackagesTabProps) {
  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/20 mt-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
          <PackageOpen className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No Packages Found</h3>
        <p className="text-sm text-zinc-500 mt-1 max-w-xs">This patient does not have any active or past treatment packages.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {purchases.map((pkg) => (
        <div key={pkg.id}
          className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:shadow-none">
          {pkg.status === 'Active' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 dark:bg-emerald-400" />
          )}
          <div className="flex justify-between items-start mb-4">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">{pkg.name}</p>
            <StatusBadge variant={STATUS_VARIANT[pkg.status]}>{pkg.status}</StatusBadge>
          </div>
          <SessionProgress
            sessionsUsed={pkg.sessionsUsed}
            sessionsTotal={pkg.sessionsTotal}
            isActive={pkg.status === 'Active'}
          />
        </div>
      ))}
    </div>
  );
}

export default PackagesTab;
