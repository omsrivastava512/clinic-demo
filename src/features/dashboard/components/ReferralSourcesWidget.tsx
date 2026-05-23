import type { WidgetProps } from '../types';

export function ReferralSourcesWidget({ config }: WidgetProps) {
  /*
    Decision: I chose a simple flex list over a Pie Chart.
    Reason: A pie chart requires a third-party library or complex SVG logic, which violates 
    the "nothing fancy/keep it simple" constraint for this iteration. A sorted list is highly 
    readable and matches the exact format you provided in the prompt.
  */

  const sources = [
    { label: 'Walk-in', value: 12, color: 'bg-indigo-500' },
    { label: 'Google', value: 8, color: 'bg-emerald-500' },
    { label: 'Doctor Referral', value: 4, color: 'bg-amber-500' },
    { label: 'Word of Mouth', value: 2, color: 'bg-blue-500' },
  ];

  const total = sources.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col shadow-sm dark:shadow-none">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Referral Sources</h3>
      
      <div className="space-y-4 flex-1 justify-center flex flex-col">
        {sources.map((source) => (
          <div key={source.label} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-300 font-medium">{source.label}</span>
              <span className="text-zinc-900 dark:text-white font-bold">{source.value}</span>
            </div>
            {/* Visual Bar representation using standard Tailwind without extra libraries */}
            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${source.color} rounded-full`}
                style={{ width: `${(source.value / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
