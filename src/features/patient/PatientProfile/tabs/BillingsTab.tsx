import type { InvoiceRecord } from '@/types';

export interface BillingsTabProps {
  invoices: InvoiceRecord[];
}

const statusClass: Record<InvoiceRecord['paymentStatus'], string> = {
  Paid: 'bg-emerald-950/50 text-emerald-200 border border-emerald-900/50',
  Pending: 'bg-amber-950/50 text-amber-200 border border-amber-900/50',
  Overdue: 'bg-red-950/50 text-red-200 border border-red-900/50',
};

export function BillingsTab({ invoices }: BillingsTabProps) {
  if (invoices.length === 0) {
    return <p className="text-sm text-zinc-600 italic py-4">No billing records found.</p>;
  }

  return (
    <div className="flex flex-col min-h-0 flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden mb-8">
      <div className="px-4 py-2 border-b border-zinc-800 text-[10px] font-medium text-zinc-500 uppercase tracking-wider shrink-0">
        Invoice History
      </div>
      <div className="flex-1 divide-y divide-zinc-800 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="px-4 py-3 flex items-center justify-between hover:bg-zinc-900 transition-colors">
            <div>
              <p className="text-sm font-mono font-medium text-zinc-200">
                ₹{invoice.amount.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">{invoice.date}</p>
            </div>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass[invoice.paymentStatus]}`}>
              {invoice.paymentStatus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillingsTab;
