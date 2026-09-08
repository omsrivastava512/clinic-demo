import type { VitalSign } from '@/types';
import { calculateVitalStatus } from '@/lib';
import { HeartPulse } from 'lucide-react';

export interface VitalsGridProps {
  vitals: VitalSign[];
}

const VITAL_LABELS: Record<VitalSign['type'], string> = {
  BP:   'Blood Pressure',
  HR:   'Heart Rate',
  TEMP: 'Temperature',
  SPO2: 'Oxygen Saturation',
};

export function VitalsGrid({ vitals }: VitalsGridProps) {
  if (vitals.length === 0) {
    // DECISION [ORIGIN: AI_AUTONOMOUS]: Upgraded empty state to high fidelity for consistency across all profile components.
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/20 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
          <HeartPulse className="w-6 h-6 text-zinc-400 dark:text-zinc-500 animate-pulse" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No Vitals Recorded</h3>
        <p className="text-sm text-zinc-500 mt-1 max-w-xs">No clinical vitals have been logged for this patient yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
      {vitals.map((vital) => {
        const status = calculateVitalStatus(vital);
        const TrendIcon = status.icon;
        return (
          <div key={vital.type}
            className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-sm dark:shadow-none">
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold mb-1 tracking-wider uppercase">
              {VITAL_LABELS[vital.type]}
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-white tabular-nums">
              {vital.value}{' '}
              <span className="text-sm font-normal text-zinc-500">{vital.unit}</span>
            </div>
            <div className={`text-xs mt-1 flex items-center gap-1 ${status.color}`}>
              <TrendIcon size={12} strokeWidth={2} aria-hidden="true" />
              {status.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VitalsGrid;
