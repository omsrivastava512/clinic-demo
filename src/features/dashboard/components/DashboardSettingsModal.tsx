// Decision: Removed unused `React` import to resolve TS6133 compiler error in React 19 JSX transform context.
import { useState } from 'react';
import type { WidgetConfig, MetricId } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface DashboardSettingsModalProps {
  currentLayout: WidgetConfig[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (newLayout: WidgetConfig[]) => void;
}

const AVAILABLE_METRICS: { id: MetricId; label: string }[] = [
  { id: 'REVENUE', label: 'Total Revenue' },
  { id: 'VISITS', label: 'Total Visits' },
  { id: 'PENDING_INVOICES', label: 'Pending Invoices' },
  { id: 'NEW_PATIENTS', label: 'New Patients' },
];

export function DashboardSettingsModal({ currentLayout, isOpen, onClose, onSave }: DashboardSettingsModalProps) {
  const [draftLayout, setDraftLayout] = useState<WidgetConfig[]>(currentLayout);

  const updateWidgetSettings = (widgetId: string, newSettings: any) => {
    setDraftLayout(draftLayout.map(widget => {
      if (widget.id === widgetId) {
        return {
          ...widget,
          settings: { ...widget.settings, ...newSettings }
        };
      }
      return widget;
    }));
  };

  const trendWidget = draftLayout.find(w => w.id === 'REVENUE_TREND');
  const metricsWidget = draftLayout.find(w => w.id === 'METRICS');
  const actionsWidget = draftLayout.find(w => w.id === 'ACTION_ITEMS');

  const currentTrendRange = trendWidget?.settings?.timeRange || '7d';
  const currentMetrics = metricsWidget?.settings?.metricsToShow || ['REVENUE', 'VISITS', 'PENDING_INVOICES'];
  const currentOverdueThreshold = actionsWidget?.settings?.actionThresholds?.overdueDays || 0;

  const handleMetricToggle = (metricId: MetricId) => {
    let newMetrics = [...currentMetrics];
    if (newMetrics.includes(metricId)) {
      newMetrics = newMetrics.filter(m => m !== metricId);
    } else {
      newMetrics.push(metricId);
    }
    updateWidgetSettings('METRICS', { metricsToShow: newMetrics });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-2 border-b border-border">
          <DialogTitle>Dashboard Settings</DialogTitle>
        </DialogHeader>

        <div className="p-6 flex-1 overflow-y-auto space-y-8">
          {/* Revenue Trend Config */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-foreground">Revenue Trend Range</h3>
              <p className="text-xs text-muted-foreground mt-1">Select the time period for the revenue chart.</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant={currentTrendRange === '7d' ? 'default' : 'outline'}
                onClick={() => updateWidgetSettings('REVENUE_TREND', { timeRange: '7d' })}
              >
                Last 7 Days
              </Button>
              <Button
                variant={currentTrendRange === '30d' ? 'default' : 'outline'}
                onClick={() => updateWidgetSettings('REVENUE_TREND', { timeRange: '30d' })}
              >
                Last 30 Days
              </Button>
            </div>
          </div>

          {/* Key Metrics Config */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-foreground">Visible KPIs</h3>
              <p className="text-xs text-muted-foreground mt-1">Choose which metrics to display in the Key Metrics widget.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_METRICS.map(metric => (
                <label key={metric.id} htmlFor={metric.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
                  <Checkbox 
                    id={metric.id}
                    checked={currentMetrics.includes(metric.id)}
                    onCheckedChange={() => handleMetricToggle(metric.id)}
                  />
                  <span className="text-sm text-foreground">{metric.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Items Config */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-foreground">Action Items Alert Threshold</h3>
              <p className="text-xs text-muted-foreground mt-1">Show invoice alerts only if they are overdue by this many days. (Set to 0 to show all pending).</p>
            </div>
            <div className="flex items-center gap-3">
              <Input 
                type="number"
                min="0"
                value={currentOverdueThreshold}
                onChange={(e) => updateWidgetSettings('ACTION_ITEMS', { actionThresholds: { overdueDays: parseInt(e.target.value) || 0 } })}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">Days</span>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 border-t border-border bg-muted/40 sm:justify-end">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              onSave(draftLayout);
              onClose();
            }}
          >
            Save & Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
