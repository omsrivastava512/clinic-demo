import React from 'react';
import type { PatientProfile, PatientAlert } from '@/types';
import { calculateAge, getInitials } from '@/lib';
import { StatusBadge } from '@/components/common/status-badge';
import type { StatusBadgeVariant } from '@/components/common/status-badge';

const ALERT_VARIANT: Record<PatientAlert['type'], StatusBadgeVariant> = {
  ALLERGY:   'allergy',
  FALL_RISK: 'fall-risk',
  DNR:       'dnr',
  OTHER:     'other',
};

interface PatientCardProps {
  patient: PatientProfile;
  visitsCount: number;
  unpaidInvoicesCount: number;
  onClick: () => void;
}

// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_OVERRULED_AI]:
// AI inlined card JSX inside dashboard map loop. User refuted: causes O(N) re-renders across cards on dashboard state changes.
// Solution: Extracted PatientCard into a React.memo component receiving primitive props.
// Invariant: Props must remain primitive/memoizable values (no inline object creation in parent).
const PatientCard = React.memo(function PatientCard({
  patient,
  visitsCount,
  unpaidInvoicesCount,
  onClick,
}: PatientCardProps) {
  // DECISION [ORIGIN: AI_AUTONOMOUS]: Deriving age and initials inside the card to keep the dashboard mapping loop clean.
  const age = calculateAge(patient.dateOfBirth);
  const initials = getInitials(patient.fullName);

  return (
    <button
      type="button"
      onClick={onClick}
      // DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]: Added detailed aria-label for accessibility per review (Issue 5).
      aria-label={`Open ${patient.fullName}'s clinical record`}
      className="text-left bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm p-5 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 transition-all active:scale-[0.99] cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-4">
        {patient.photoUrl ? (
          <img
            src={patient.photoUrl}
            alt={patient.fullName}
            className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
          />
        ) : (
          <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-500 dark:text-zinc-400 shrink-0">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-zinc-900 dark:text-white truncate">{patient.fullName}</p>
          <p className="text-xs text-zinc-500 capitalize mt-0.5">
            {age} yrs · {patient.gender} · {patient.bloodType}
          </p>
        </div>
      </div>

      {patient.alerts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {patient.alerts.map((alert) => (
            // DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_OVERRULED_AI]:
            // AI used array indices as keys. User refuted (Issue 6): causes DOM reuse bugs on alert mutation.
            // Solution: Using composite natural key `${alert.type}-${alert.label}` for stable reconciliation.
            <StatusBadge key={`${alert.type}-${alert.label}`} variant={ALERT_VARIANT[alert.type]}>
              {alert.label}
            </StatusBadge>
          ))}
        </div>
      )}

      <div className="flex gap-4 text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-3">
        <span>
          {visitsCount} visit{visitsCount !== 1 ? 's' : ''}
        </span>
        <span className="font-mono">{patient.mrn}</span>
        {unpaidInvoicesCount > 0 && (
          <span className="text-amber-600 dark:text-amber-400 font-medium ml-auto">
            {unpaidInvoicesCount} unpaid
          </span>
        )}
      </div>
    </button>
  );
});

export default PatientCard;
