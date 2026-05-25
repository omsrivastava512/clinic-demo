import type { InvoiceRecord } from '@/types';
import { StatusBadge } from '@/components/common/status-badge';
import type { StatusBadgeVariant } from '@/components/common/status-badge';

export interface BillingsTabProps {
  invoices: InvoiceRecord[];
}

const STATUS_VARIANT: Record<InvoiceRecord['paymentStatus'], StatusBadgeVariant> = {
  Paid:    'paid',
  Pending: 'pending',
  Overdue: 'overdue',
};

export function BillingsTab({ invoices }: BillingsTabProps) {
  if (invoices.length === 0) {
    return <p className="text-sm text-zinc-500 italic py-4">No billing records found.</p>;
  }

  return (
    <div className="flex flex-col min-h-0 flex-1 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden mb-8 shadow-sm dark:shadow-none">
      <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 text-[10px] font-medium text-zinc-400 uppercase tracking-wider shrink-0 bg-zinc-50 dark:bg-transparent">
        Invoice History
      </div>
      <div className="flex-1 divide-y divide-zinc-100 dark:divide-zinc-800 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {invoices.map((invoice) => (
          <div key={invoice.id}
            className="px-4 py-3 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <div>
              <p className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-200">
                ₹{invoice.amount.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">{invoice.date}</p>
            </div>
            <StatusBadge variant={STATUS_VARIANT[invoice.paymentStatus]}>
              {invoice.paymentStatus}
            </StatusBadge>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillingsTab;
