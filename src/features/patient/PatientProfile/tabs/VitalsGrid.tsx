import type { VitalSign } from '@/types';
import { calculateVitalStatus } from '@/lib';

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
    return <p className="text-sm text-zinc-500 italic py-4">No vitals recorded.</p>;
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
