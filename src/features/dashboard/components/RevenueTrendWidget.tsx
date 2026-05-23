import type { WidgetProps } from '../types';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function RevenueTrendWidget({ config }: WidgetProps) {
  const timeRange = config.settings?.timeRange || '7d';
  /*
    Decision: The chart dynamically scales between 7 and 30 bars based on `timeRange`.
    Reason: Rather than hardcoding two different chart components, a single CSS-flex based 
    chart can gracefully accommodate both simply by adjusting the max-width of the bars (see line 56).
  */
  // Generate dynamic mock data based on the time range config
  let data = [];
  if (timeRange === '7d') {
    data = [
      { label: 'Mon', revenue: 4200 },
      { label: 'Tue', revenue: 5100 },
      { label: 'Wed', revenue: 3800 },
      { label: 'Thu', revenue: 6200 },
      { label: 'Fri', revenue: 5800 },
      { label: 'Sat', revenue: 7100 },
      { label: 'Sun', revenue: 2000 },
    ];
  } else {
    // 30d mock data
    for (let i = 1; i <= 30; i++) {
      data.push({
        label: `${i}`,
        revenue: Math.floor(Math.random() * 5000) + 2000
      });
    }
  }

  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const totalRevenue = data.reduce((acc, d) => acc + d.revenue, 0);

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div>
          <CardTitle className="text-sm font-semibold">Revenue Trend</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {timeRange === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-foreground">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">+12% vs prior period</div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex items-end justify-between gap-1 pt-4">
        {data.map((item, idx) => {
          const heightPercent = Math.max((item.revenue / maxRevenue) * 100, 5);
          
          return (
            <div key={`${item.label}-${idx}`} className="flex flex-col items-center gap-2 flex-1 group h-full justify-end">
              <div className="w-full relative flex justify-center h-32 items-end">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-zinc-800 dark:bg-zinc-800 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity whitespace-nowrap z-10">
                  ₹{item.revenue}
                </div>
                <div 
                  // If we have 30 bars, we make them thinner so they fit perfectly.
                  className={`w-full ${timeRange === '7d' ? 'max-w-[2rem]' : 'max-w-[0.5rem]'} bg-indigo-500/80 group-hover:bg-indigo-400 rounded-t-sm transition-all duration-300`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              {/* Only show labels if it's 7d to avoid crowding */}
              {timeRange === '7d' && (
                 <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
