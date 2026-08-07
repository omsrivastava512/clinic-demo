// Decision: Removed unused `React` import to resolve TS6133 compiler error in React 19 JSX transform context.
import { useState } from 'react';
import { Search, UserPlus, Settings } from 'lucide-react';
import { DashboardSettingsModal } from '../features/dashboard/components/DashboardSettingsModal';
import type { WidgetConfig } from '../features/dashboard/types';
import { WIDGET_REGISTRY } from '../features/dashboard/WidgetRegistry';

import { Button } from "@/components/ui/button";

// We map the requested layout into specific column configurations.
// Switching to a 4-column grid provides better balance for a 50/50 split on the second row,
// while allowing the 4 smaller widgets to neatly occupy the third row.
const DEFAULT_LAYOUT: WidgetConfig[] = [
  { 
    id: 'QUICK_ACTIONS', 
    colSpan: 'full',
    settings: {
      quickActions: [
        { label: 'New Patient', iconName: 'UserPlus', route: '/patients/new', colorClass: 'indigo' },
        { label: 'Start Visit', iconName: 'Activity', route: '/visits/new', colorClass: 'emerald' },
        { label: 'Ledger', iconName: 'CreditCard', route: '/today', colorClass: 'amber' },
        { label: 'Documents', iconName: 'FileText', route: '/documents', colorClass: 'blue' }
      ]
    }
  },
  { 
    id: 'REVENUE_TREND', 
    colSpan: 2,
    settings: { timeRange: '30d' } // We change this from default 7d to 30d to prove the config works!
  },
  { 
    id: 'METRICS', 
    colSpan: 1,
    // By providing this array, we dictate exactly which KPIs render.
    settings: { metricsToShow: ['REVENUE', 'NEW_PATIENTS', 'PENDING_INVOICES'] } 
  },
  { id: 'CLINIC_HEALTH', colSpan: 1 },
  { 
    id: 'ACTION_ITEMS', 
    colSpan: 1,
    settings: { actionThresholds: { overdueDays: 30 } } // Strict threshold config
  },
  { id: 'REFERRAL_SOURCES', colSpan: 1 },
  { id: 'RECENT_PATIENTS', colSpan: 2 },
];

export default function Dashboard() {
  const [layout, setLayout] = useState<WidgetConfig[]>(DEFAULT_LAYOUT);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  /*
    Decision: Replaced `w-full` with `w-[95%] lg:w-[80%] mx-auto` per user feedback.
    Reason: A 100% width on an ultrawide monitor can make scanning left-to-right difficult. 
    Restricting to 80% keeps the layout expansive but contained.
  */
  return (
    <div className="w-[95%] lg:w-[80%] mx-auto space-y-6 pb-12">
      {/* Top Header & Actions - Restored from Draft 1 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Good morning, Dr. Smith</h2>
          <p className="text-muted-foreground text-sm mt-1">Here is what's happening at the clinic today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer hidden sm:block" title="Search patients, invoices, or appointments (Cmd+K)">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <div className="bg-background border border-input rounded-md pl-9 pr-4 py-2 text-sm text-muted-foreground w-64 hover:border-ring transition-colors shadow-sm">
              Search anything... (Cmd+K)
            </div>
          </div>
          
          {/* Settings Trigger */}
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            title="Customize Dashboard"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </Button>

          <Button 
            title="Open New Patient Workflow"
            className="flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">New Patient</span>
          </Button>
        </div>
      </div>

      {/* 
        Widget Canvas 
        Trade-off: We are wrapping the Widget components in a div that controls the grid span.
        This forces the child widget to be 100% width/height of its container (h-full), 
        preventing widgets from bleeding out of their grid assignments or forcing layout shifts.
        Decision: Changed to grid-cols-4 on large screens.
        Reason: This allows the Metrics and Revenue Trend widgets to share the screen 50/50 (col-span-2 each), 
        while letting the four smaller widgets fit neatly into a single row underneath.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {layout.map((config, index) => {
          const WidgetComponent = WIDGET_REGISTRY[config.id];
          if (!WidgetComponent) {
            console.warn(`Widget ${config.id} not found in registry`);
            return null;
          }

          // Compute the wrapper class based on the configuration.
          let spanClass = 'lg:col-span-1';
          if (config.colSpan === 2) spanClass = 'lg:col-span-2';
          if (config.colSpan === 3) spanClass = 'lg:col-span-3';
          if (config.colSpan === 4 || config.colSpan === 'full') spanClass = 'lg:col-span-full';

          return (
            <div key={`${config.id}-${index}`} className={`${spanClass} flex`}>
              {/* Passing the config down in case the widget needs to adapt its internal layout based on its allocated size */}
              <WidgetComponent config={config} />
            </div>
          );
        })}
      </div>

      <DashboardSettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentLayout={layout}
        onSave={(newLayout) => setLayout(newLayout)}
      />
    </div>
  );
}
