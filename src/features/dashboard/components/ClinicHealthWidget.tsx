import type { WidgetProps } from '../types';

export function ClinicHealthWidget({ config }: WidgetProps) {
  /*
    Assumption: We didn't specify actual active treatment plan data in the mock data,
    so I'm hardcoding these values for now. 
    Trade-off: I chose to put these three specific KPIs (No-Show, Retention, Active Plans) 
    together because they represent the "operational health" of a Physio clinic, as opposed 
    to financial health. Grouping them saves dashboard space.
  */
  
  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col shadow-sm dark:shadow-none">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Clinic Health</h3>
      
      <div className="flex flex-col gap-4 flex-1 justify-center">
        {/* KPI 1 */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1">No-show Rate</div>
            <div className="text-xl font-bold text-zinc-900 dark:text-white">4.2%</div>
          </div>
          <div className="text-emerald-700 dark:text-emerald-400 text-xs bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-transparent px-2 py-1 rounded-full">
            Healthy
          </div>
        </div>

        {/* KPI 2 */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1">New vs Returning</div>
            <div className="text-xl font-bold text-zinc-900 dark:text-white">1 : 4</div>
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-xs">
            Past 30d
          </div>
        </div>

        {/* KPI 3 */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1">Active Treatment Plans</div>
            <div className="text-xl font-bold text-zinc-900 dark:text-white">28</div>
          </div>
        </div>
      </div>
    </div>
  );
}
