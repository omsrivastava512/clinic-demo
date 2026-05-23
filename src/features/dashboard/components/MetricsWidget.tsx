import type { WidgetProps, MetricId } from '../types';
import { MOCK_INVOICES, MOCK_VISITS, MOCK_PATIENT_PROFILES } from '@/data/mock_data';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MetricsWidget({ config }: WidgetProps) {
  
  // Calculate basic metrics from mock data
  const dataMap = {
    REVENUE: {
      label: 'Total Revenue',
      value: `₹${MOCK_INVOICES.filter((i) => i.paymentStatus === 'Paid').reduce((sum, i) => sum + i.amount, 0).toLocaleString('en-IN')}`,
      colorClass: 'text-foreground'
    },
    VISITS: {
      label: 'Total Visits',
      value: MOCK_VISITS.length.toString(),
      colorClass: 'text-foreground'
    },
    PENDING_INVOICES: {
      label: 'Pending Invoices',
      value: MOCK_INVOICES.filter((i) => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue').length.toString(),
      colorClass: 'text-amber-600 dark:text-amber-400'
    },
    NEW_PATIENTS: {
      label: 'New Patients',
      value: MOCK_PATIENT_PROFILES.length.toString(),
      colorClass: 'text-emerald-600 dark:text-emerald-400'
    }
  };

  /*
    Decision: Refactored metrics to render dynamically from `config.settings.metricsToShow`.
    Reason: This gives the clinic complete control over what KPIs are important to them.
    A front desk worker might only want to see Visits and New Patients, while an owner 
    might prioritize Revenue and Pending Invoices.
  */
  const metricsToShow: MetricId[] = config.settings?.metricsToShow || ['REVENUE', 'VISITS', 'PENDING_INVOICES'];

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1 justify-center">
        {metricsToShow.map((metricId, index) => {
          const metricData = dataMap[metricId];
          const isLast = index === metricsToShow.length - 1;
          
          return (
            <div key={metricId} className={`flex justify-between items-end ${!isLast ? 'border-b border-border pb-3' : ''}`}>
              <div>
                <div className="text-muted-foreground text-xs font-medium mb-1">{metricData.label}</div>
                <div className={`text-2xl font-bold ${metricData.colorClass}`}>{metricData.value}</div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
