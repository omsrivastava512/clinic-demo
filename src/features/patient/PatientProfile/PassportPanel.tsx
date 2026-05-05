import type { PatientProfile } from '@/types';
import { getInitials, calculateAge } from '@/lib';

export interface PassportPanelProps {
  patient: PatientProfile;
  onBack: () => void;
}

function alertClass(type: PatientProfile['alerts'][number]['type']) {
  switch (type) {
    case 'ALLERGY':
      return 'bg-red-950/50 text-red-200 border border-red-900/50 dark:bg-red-950/50 dark:text-red-200';
    case 'FALL_RISK':
      return 'bg-amber-950/50 text-amber-200 border border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-200';
    case 'DNR':
      return 'bg-blue-950/50 text-blue-200 border border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-200';
    default:
      return 'bg-zinc-800 text-zinc-100 border border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100';
  }
}

export function PassportPanel({ patient, onBack }: PassportPanelProps) {
  const age = calculateAge(patient.dateOfBirth);
  const initials = getInitials(patient.fullName);

  return (
    <div className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/30 flex flex-col p-6 gap-6">

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors w-fit"
      >
        ← Back
      </button>

      {/* Avatar + identity */}
      <div className="flex flex-col items-center text-center gap-2">
        {patient.photoUrl ? (
          <img
            src={patient.photoUrl}
            alt={patient.fullName}
            className="w-24 h-24 rounded-full object-cover border border-zinc-700"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-2xl font-semibold text-zinc-400 select-none">
            {initials}
          </div>
        )}
        <h2 className="text-xl font-bold text-white leading-tight">{patient.fullName}</h2>
        <p className="text-sm text-zinc-500 capitalize">{age} yrs · {patient.gender}</p>
      </div>

      {/* Alerts */}
      {patient.alerts.length > 0 && (
        <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
          <div className="text-[10px] font-bold text-zinc-500 mb-2 tracking-wider uppercase">Critical Alerts</div>
          <div className="flex flex-wrap gap-2">
            {patient.alerts.map((alert, i) => (
              <span
                key={i}
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${alertClass(alert.type)}`}
              >
                {alert.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Static info rows */}
      <div className="space-y-3 text-sm">
        {[
          { label: 'MRN', value: patient.mrn, mono: true },
          { label: 'Blood Type', value: patient.bloodType },
          { label: 'Insurer', value: patient.insurerName },
        ].map(({ label, value, mono }) => (
          <div key={label} className="flex justify-between py-2 border-b border-zinc-800">
            <span className="text-zinc-500">{label}</span>
            <span className={`text-zinc-300 font-medium ${mono ? 'font-mono' : ''}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PassportPanel;
