import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { WidgetProps, QuickActionConfig } from '../types';

/* 
  Helper to resolve string icon names to Lucide components.
  In a production app, to avoid tree-shaking issues, you might want a manual registry
  instead of `* as Icons`, but this works beautifully for a dynamic config engine MVP.
*/
const renderIcon = (iconName: string, className: string) => {
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

export function QuickActionsWidget({ config }: WidgetProps) {
  const navigate = useNavigate();

  // Fallback to defaults if settings are not provided by the config engine
  const actions: QuickActionConfig[] = config.settings?.quickActions || [
    { label: 'New Patient', iconName: 'UserPlus', route: '/patients/new', colorClass: 'indigo' },
    { label: 'New Visit', iconName: 'Activity', route: '/visits/new', colorClass: 'emerald' },
    { label: 'Today\'s Ledger', iconName: 'CreditCard', route: '/today', colorClass: 'amber' },
  ];

  return (
    /*
      Decision: Removed the bulky outer container per feedback. 
      Trade-off: These buttons now sit directly on the dashboard background. They are visually 
      lighter but still maintain their own hit areas and hover states.
    */
    <div className="w-full h-full">
      {/* 
        Grid adjusts to the number of actions passed in. 
        If 4 actions are passed, it creates 4 columns on large screens. 
      */}
      <div className={`grid grid-cols-1 gap-4 ${
        {
          1: 'sm:grid-cols-1',
          2: 'sm:grid-cols-2',
          3: 'sm:grid-cols-3',
          4: 'sm:grid-cols-4',
        }[Math.min(actions.length, 4)]
      }`}>
        {actions.map((action, idx) => {
          // Dynamic color classes based on the config string
          // We apply light mode styles as default, and dark mode styles with dark:
          const colorVariants: Record<string, { iconBg: string, iconText: string, hoverBorder: string }> = {
            indigo: { iconBg: 'bg-indigo-50 dark:bg-indigo-500/10', iconText: 'text-indigo-600 dark:text-indigo-400', hoverBorder: 'hover:border-indigo-200 dark:hover:border-indigo-500/50' },
            emerald: { iconBg: 'bg-emerald-50 dark:bg-emerald-500/10', iconText: 'text-emerald-600 dark:text-emerald-400', hoverBorder: 'hover:border-emerald-200 dark:hover:border-emerald-500/50' },
            amber: { iconBg: 'bg-amber-50 dark:bg-amber-500/10', iconText: 'text-amber-600 dark:text-amber-400', hoverBorder: 'hover:border-amber-200 dark:hover:border-amber-500/50' },
            blue: { iconBg: 'bg-blue-50 dark:bg-blue-500/10', iconText: 'text-blue-600 dark:text-blue-400', hoverBorder: 'hover:border-blue-200 dark:hover:border-blue-500/50' },
            rose: { iconBg: 'bg-rose-50 dark:bg-rose-500/10', iconText: 'text-rose-600 dark:text-rose-400', hoverBorder: 'hover:border-rose-200 dark:hover:border-rose-500/50' },
          };
          const colors = colorVariants[action.colorClass] || colorVariants['indigo'];

          return (
            <button 
              key={`${action.label}-${idx}`}
              onClick={() => navigate(action.route)}
              className={`bg-card border border-border ${colors.hoverBorder} hover:shadow-md hover:bg-muted/50 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all group shadow-sm`}
            >
              <div className={`w-10 h-10 rounded-full ${colors.iconBg} flex items-center justify-center ${colors.iconText} group-hover:scale-110 transition-transform`}>
                {renderIcon(action.iconName, "w-5 h-5")}
              </div>
              <span className="text-sm font-medium text-card-foreground">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
