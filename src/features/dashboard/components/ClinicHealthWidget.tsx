import type { WidgetProps } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Decision: Prefixed `_config` with underscore to resolve TS6133 unused parameter error during production build.
export function ClinicHealthWidget({ config: _config }: WidgetProps) {
  /*
    Assumption: We didn't specify actual active treatment plan data in the mock data,
    so I'm hardcoding these values for now. 
    Trade-off: I chose to put these three specific KPIs (No-Show, Retention, Active Plans) 
    together because they represent the "operational health" of a Physio clinic, as opposed 
    to financial health. Grouping them saves dashboard space.
  */
  
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Clinic Health</CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col gap-4 flex-1 justify-center">
        {/* KPI 1 */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-muted-foreground text-xs font-medium mb-1">No-show Rate</div>
            <div className="text-xl font-bold text-foreground">4.2%</div>
          </div>
          <div className="text-emerald-700 dark:text-emerald-400 text-xs bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-transparent px-2 py-1 rounded-full">
            Healthy
          </div>
        </div>

        {/* KPI 2 */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-muted-foreground text-xs font-medium mb-1">New vs Returning</div>
            <div className="text-xl font-bold text-foreground">1 : 4</div>
          </div>
          <div className="text-muted-foreground text-xs">
            Past 30d
          </div>
        </div>

        {/* KPI 3 */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-muted-foreground text-xs font-medium mb-1">Active Treatment Plans</div>
            <div className="text-xl font-bold text-foreground">28</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
