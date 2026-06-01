import type { PatientProfile } from '@/types';
import { getInitials, calculateAge } from '@/lib';
import { StatusBadge } from '@/components/common/status-badge';
import type { StatusBadgeVariant } from '@/components/common/status-badge';

export interface PassportPanelProps {
  patient: PatientProfile;
  onBack: () => void;
}

// Maps DB alert type → StatusBadge variant
const ALERT_VARIANT: Record<PatientProfile['alerts'][number]['type'], StatusBadgeVariant> = {
  ALLERGY:   'allergy',
  FALL_RISK: 'fall-risk',
  DNR:       'dnr',
  OTHER:     'other',
};

// ── Local sub-component ───────────────────────────────────────────────────────
function InfoRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
      <span className="text-zinc-500">{label}</span>
      <span className={`text-zinc-900 dark:text-zinc-300 font-medium ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}

export function PassportPanel({ patient, onBack }: PassportPanelProps) {
  const age = calculateAge(patient.dateOfBirth);
  const initials = getInitials(patient.fullName);

  return (
    <div className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 flex flex-col p-6 gap-6">

      <button type="button" onClick={onBack}
        className="hidden lg:block text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors w-fit">
        ← Back
      </button>

      <div className="flex flex-col items-center text-center gap-2">
        {patient.photoUrl ? (
          <img src={patient.photoUrl} alt={patient.fullName}
            className="w-24 h-24 rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
        ) : (
          <div className="w-24 h-24 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl font-semibold text-zinc-500 dark:text-zinc-400 select-none">
            {initials}
          </div>
        )}
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight">{patient.fullName}</h2>
        <p className="text-sm text-zinc-500 capitalize">{age} yrs · {patient.gender}</p>
      </div>

      {patient.alerts.length > 0 && (
        <div className="p-3 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
          <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-2 tracking-wider uppercase">Critical Alerts</div>
          <div className="flex flex-wrap gap-2">
            {patient.alerts.map((alert, i) => (
              <StatusBadge key={i} variant={ALERT_VARIANT[alert.type]}>
                {alert.label}
              </StatusBadge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3 text-sm">
        <InfoRow label="MRN"        value={patient.mrn}         mono />
        <InfoRow label="Blood Type" value={patient.bloodType} />
        <InfoRow label="Insurer"    value={patient.insurerName} />
      </div>
    </div>
  );
}

export default PassportPanel;
