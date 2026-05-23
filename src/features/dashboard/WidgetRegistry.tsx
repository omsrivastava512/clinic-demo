import React from 'react';
import type { WidgetId } from './types';
import { QuickActionsWidget } from './components/QuickActionsWidget';
import { MetricsWidget } from './components/MetricsWidget';
import { ActionItemsWidget } from './components/ActionItemsWidget';
import { RecentPatientsWidget } from './components/RecentPatientsWidget';
import { RevenueTrendWidget } from './components/RevenueTrendWidget';
import { ReferralSourcesWidget } from './components/ReferralSourcesWidget';
import { ClinicHealthWidget } from './components/ClinicHealthWidget';

export const WIDGET_REGISTRY: Record<WidgetId, React.FC<any>> = {
  QUICK_ACTIONS: QuickActionsWidget,
  METRICS: MetricsWidget,
  ACTION_ITEMS: ActionItemsWidget,
  RECENT_PATIENTS: RecentPatientsWidget,
  REVENUE_TREND: RevenueTrendWidget,
  REFERRAL_SOURCES: ReferralSourcesWidget,
  CLINIC_HEALTH: ClinicHealthWidget,
};
