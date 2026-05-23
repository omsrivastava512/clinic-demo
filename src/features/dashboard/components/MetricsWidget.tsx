import type { WidgetProps, MetricId } from '../types';
import { MOCK_INVOICES, MOCK_VISITS, MOCK_PATIENT_PROFILES } from '@/data/mock_data';

export function MetricsWidget({ config }: WidgetProps) {
  
  // Calculate basic metrics from mock data
  const dataMap = {
    REVENUE: {
      label: 'Total Revenue',
      value: `₹${MOCK_INVOICES.filter((i) => i.paymentStatus === 'Paid').reduce((sum, i) => sum + i.amount, 0).toLocaleString('en-IN')}`,
      colorClass: 'text-zinc-900 dark:text-white'
    },
    VISITS: {
      label: 'Total Visits',
      value: MOCK_VISITS.length.toString(),
      colorClass: 'text-zinc-900 dark:text-white'
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
    <div className="w-full h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col shadow-sm dark:shadow-none">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Key Metrics</h3>
      <div className="flex flex-col gap-4 flex-1 justify-center">
        {metricsToShow.map((metricId, index) => {
          const metricData = dataMap[metricId];
          const isLast = index === metricsToShow.length - 1;
          
          return (
            <div key={metricId} className={`flex justify-between items-end ${!isLast ? 'border-b border-zinc-100 dark:border-zinc-800 pb-3' : ''}`}>
              <div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1">{metricData.label}</div>
                <div className={`text-2xl font-bold ${metricData.colorClass}`}>{metricData.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
