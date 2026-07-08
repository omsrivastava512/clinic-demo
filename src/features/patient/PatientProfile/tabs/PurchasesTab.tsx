import type { PurchaseRecord } from '@/types';
import { StatusBadge } from '@/components/common/status-badge';
import type { StatusBadgeVariant } from '@/components/common/status-badge';
import { SessionProgress } from '../components/SessionProgress';

export interface PurchasesTabProps {
  purchases: PurchaseRecord[];
}

const STATUS_VARIANT: Record<PurchaseRecord['status'], StatusBadgeVariant> = {
  Active:    'active',
  Completed: 'completed',
  Expired:   'expired',
};

export function PurchasesTab({ purchases }: PurchasesTabProps) {
  if (purchases.length === 0) {
    return <p className="text-sm text-zinc-500 italic py-4">No purchased packages found.</p>;
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {purchases.map((pkg) => (
        <div key={pkg.id}
          className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 relative overflow-hidden shadow-sm dark:shadow-none">
          {pkg.status === 'Active' && (
            <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500" />
          )}
          <div className="flex justify-between items-start mb-4">
            <p className="font-semibold text-zinc-900 dark:text-white">{pkg.name}</p>
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

export default PurchasesTab;
