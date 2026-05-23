import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { WidgetConfig, MetricId } from '../types';

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
  /*
    Decision: The modal maintains a local `draftLayout` state instead of mutating the parent directly.
    Reason: This prevents the dashboard behind the modal from re-rendering and shifting while the user 
    is still tweaking settings. Changes are only committed when `onSave` is explicitly called.
  */
  const [draftLayout, setDraftLayout] = useState<WidgetConfig[]>(currentLayout);

  if (!isOpen) return null;

  // Helper to safely update a specific widget's settings in the draft layout
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

  // Find current settings for specific widgets to populate UI controls
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Dashboard Settings</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-8">
          
          {/* Revenue Trend Config */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Revenue Trend Range</h3>
              <p className="text-xs text-zinc-500 mt-1">Select the time period for the revenue chart.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => updateWidgetSettings('REVENUE_TREND', { timeRange: '7d' })}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                  currentTrendRange === '7d' 
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/50' 
                    : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => updateWidgetSettings('REVENUE_TREND', { timeRange: '30d' })}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                  currentTrendRange === '30d' 
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/50' 
                    : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                Last 30 Days
              </button>
            </div>
          </div>

          {/* Key Metrics Config */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Visible KPIs</h3>
              <p className="text-xs text-zinc-500 mt-1">Choose which metrics to display in the Key Metrics widget.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_METRICS.map(metric => (
                <label key={metric.id} className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/20 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
                  <input 
                    type="checkbox"
                    checked={currentMetrics.includes(metric.id)}
                    onChange={() => handleMetricToggle(metric.id)}
                    className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{metric.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Items Config */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Action Items Alert Threshold</h3>
              <p className="text-xs text-zinc-500 mt-1">Show invoice alerts only if they are overdue by this many days. (Set to 0 to show all pending).</p>
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="number"
                min="0"
                value={currentOverdueThreshold}
                onChange={(e) => updateWidgetSettings('ACTION_ITEMS', { actionThresholds: { overdueDays: parseInt(e.target.value) || 0 } })}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-900 dark:text-white w-24 focus:outline-none focus:border-indigo-500"
              />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Days</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onSave(draftLayout);
              onClose();
            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
          >
            Save & Apply
          </button>
        </div>

      </div>
    </div>
  );
}
