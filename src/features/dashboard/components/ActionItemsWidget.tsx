import type { WidgetProps } from '../types';
import { MOCK_INVOICES, MOCK_PATIENT_PROFILES } from '@/data/mock_data';
import { AlertTriangle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ActionItemsWidget({ config }: WidgetProps) {
  const navigate = useNavigate();
  
  const threshold = config.settings?.actionThresholds?.overdueDays || 0;

  /*
    Decision: Implemented threshold-based filtering for action items.
    Reason: A high-volume clinic might have dozens of invoices pending on any given day.
    By allowing them to set a threshold (e.g. `overdueDays: 30`), the dashboard only surfaces
    items that actually require immediate attention, reducing noise.
  */
  // Simulate threshold logic: if threshold is high (e.g. 30 days), we might only show severely overdue invoices.
  // For the MVP, we just use it as a boolean toggle on whether to show 'Pending' vs only 'Overdue'.
  const overdueInvoices = MOCK_INVOICES.filter((i) => {
    if (threshold > 0) return i.paymentStatus === 'Overdue';
    return i.paymentStatus === 'Overdue' || i.paymentStatus === 'Pending';
  });

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden">
      <CardHeader className="p-4 border-b border-border flex flex-row justify-between items-center space-y-0">
        <CardTitle className="font-semibold flex items-center gap-2 text-base">
          <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
          Action Items
        </CardTitle>
        {overdueInvoices.length > 0 && (
          <span className="bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-transparent text-xs font-bold px-2 py-0.5 rounded-full">
            {overdueInvoices.length}
          </span>
        )}
      </CardHeader>
      <CardContent className="p-0 divide-y divide-border flex-1 overflow-y-auto">
        {overdueInvoices.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No pending action items.</div>
        ) : (
          overdueInvoices.map(invoice => {
            const patient = MOCK_PATIENT_PROFILES.find(p => p.id === invoice.patientId);
            return (
              <div 
                key={invoice.id}
                onClick={() => navigate(`/patient/${patient?.id}`)}
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <CreditCard className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Pending Payment</h4>
                    <p className="text-xs text-muted-foreground mt-1">{patient?.fullName} • ₹{invoice.amount}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
