import { useNavigate } from 'react-router-dom';
import { MOCK_PATIENT_PROFILES, MOCK_INVOICES, MOCK_VISITS_V2 } from '@/data/mock_data';
import { calculateAge, getInitials } from '@/lib';
import { Users, Activity, CreditCard, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '@/components/common/status-badge';
import type { StatusBadgeVariant } from '@/components/common/status-badge';
import type { PatientAlert } from '@/types';

const ALERT_VARIANT: Record<PatientAlert['type'], StatusBadgeVariant> = {
  ALLERGY:   'allergy',
  FALL_RISK: 'fall-risk',
  DNR:       'dnr',
  OTHER:     'other',
};

export default function Dashboard() {
  const navigate = useNavigate();

  // Stats computed inside component, not at module scope
  // This ensures stats update when data changes (e.g., after real API integration)
  // Removed useMemo — computation is trivial and doesn't benefit from memoization
  const totalPatients = MOCK_PATIENT_PROFILES.length;
  const totalVisits = MOCK_VISITS_V2.length; // Using Visit model instead of VisitRecord
  const totalRevenue = MOCK_INVOICES
    .filter((i) => i.paymentStatus === 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);
  const pendingInvoices = MOCK_INVOICES.filter(
    (i) => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue'
  ).length;

  const stats = [
    { label: 'Total Patients',    value: String(totalPatients),                       icon: Users },
    { label: 'Total Visits',      value: String(totalVisits),                         icon: Activity },
    { label: 'Revenue Collected', value: `₹${totalRevenue.toLocaleString('en-IN')}`,  icon: CreditCard },
    { label: 'Pending / Overdue', value: String(pendingInvoices),                     icon: AlertTriangle },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Patient Profiles</h2>
        <p className="text-zinc-500 text-sm mt-1">Click any patient card to open their full clinical record.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label}
            className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-zinc-500">{label}</span>
              <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
            </div>
            <div className="text-2xl font-bold tabular-nums tracking-tight text-zinc-900 dark:text-white mt-3">{value}</div>
          </div>
        ))}
      </div>

      {/* Patient cards */}
      <div>
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Patient Profiles</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PATIENT_PROFILES.map((patient) => {
            const age = calculateAge(patient.dateOfBirth);
            const initials = getInitials(patient.fullName);
            // Using Visit model (MOCK_VISITS_V2) instead of legacy VisitRecord
            const visits = MOCK_VISITS_V2.filter((v) => v.patientId === patient.id);
            const invoices = MOCK_INVOICES.filter((i) => i.patientId === patient.id);
            const outstanding = invoices.filter(
              (i) => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue'
            );

            return (
              <button key={patient.id} type="button"
                onClick={() => navigate(`/patient/${patient.id}`)}
                className="text-left bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm p-5 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 transition-all active:scale-[0.99] cursor-pointer">

                <div className="flex items-center gap-3 mb-4">
                  {patient.photoUrl ? (
                    <img src={patient.photoUrl} alt={patient.fullName}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-500 dark:text-zinc-400 shrink-0">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 dark:text-white truncate">{patient.fullName}</p>
                    <p className="text-xs text-zinc-500 capitalize mt-0.5">{age} yrs · {patient.gender} · {patient.bloodType}</p>
                  </div>
                </div>

                {patient.alerts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {patient.alerts.map((alert, i) => (
                      <StatusBadge key={i} variant={ALERT_VARIANT[alert.type]}>
                        {alert.label}
                      </StatusBadge>
                    ))}
                  </div>
                )}

                <div className="flex gap-4 text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  <span>{visits.length} visit{visits.length !== 1 ? 's' : ''}</span>
                  <span className="font-mono">{patient.mrn}</span>
                  {outstanding.length > 0 && (
                    <span className="text-amber-600 dark:text-amber-400 font-medium ml-auto">
                      {outstanding.length} unpaid
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
