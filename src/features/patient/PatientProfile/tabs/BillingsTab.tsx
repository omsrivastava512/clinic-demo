import type { InvoiceRecord } from '@/types';
import { StatusBadge } from '@/components/common/status-badge';
import type { StatusBadgeVariant } from '@/components/common/status-badge';
import { Receipt } from 'lucide-react';

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
    // DECISION [ORIGIN: AI_AUTONOMOUS]: Upgraded empty state to high fidelity for design consistency across profile tabs.
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/20 mt-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-3 border border-zinc-200 dark:border-zinc-700">
          <Receipt className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
        </div>
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">No Billing Records</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs">There are no invoices or billing records for this patient yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-0 flex-1 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden mb-8 shadow-xs">
      <div className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-400 uppercase tracking-wider shrink-0 bg-zinc-50 dark:bg-zinc-900/80">
        Invoice History
      </div>
      <div className="flex-1 divide-y divide-zinc-100 dark:divide-zinc-800/80 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="px-5 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <div>
              <p className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
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
