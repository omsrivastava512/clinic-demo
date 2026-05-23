export type WidgetId = 'QUICK_ACTIONS' | 'METRICS' | 'ACTION_ITEMS' | 'RECENT_PATIENTS' | 'REVENUE_TREND' | 'REFERRAL_SOURCES' | 'CLINIC_HEALTH';

export type MetricId = 'REVENUE' | 'VISITS' | 'PENDING_INVOICES' | 'NEW_PATIENTS';

export interface QuickActionConfig {
  label: string;
  iconName: string;
  route: string;
  colorClass: string;
}

/*
  Decision: Introduced a unified WidgetSettings interface.
  Reason: Consolidating all widget-specific configurations (like timeRange or metricsToShow)
  into a single JSON-serializable object allows the entire dashboard layout to eventually
  be stored and fetched from a database. This completely decouples the React components
  from the hardcoded layout logic.
*/
export interface WidgetSettings {
  timeRange?: '7d' | '30d' | 'YTD';
  metricsToShow?: MetricId[];
  actionThresholds?: { overdueDays: number };
  quickActions?: QuickActionConfig[];
}

export interface WidgetConfig {
  id: WidgetId;
  // We specify colSpan for the dashboard grid. 'full' maps to col-span-full
  colSpan: 1 | 2 | 3 | 4 | 'full';
  settings?: WidgetSettings;
}

export interface WidgetProps {
  config: WidgetConfig;
}
