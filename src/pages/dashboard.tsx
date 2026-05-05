import { useNavigate } from 'react-router-dom';
import { MOCK_PATIENT_PROFILES, MOCK_INVOICES, MOCK_VISITS } from '@/data/mock_data';
import { calculateAge, getInitials } from '@/lib';
import { Users, Activity, CreditCard, AlertTriangle } from 'lucide-react';

// ─── Derived stats ────────────────────────────────────────────────────────────

const totalPatients = MOCK_PATIENT_PROFILES.length;
const totalVisits = MOCK_VISITS.length;
const totalRevenue = MOCK_INVOICES
  .filter((i) => i.paymentStatus === 'Paid')
  .reduce((sum, i) => sum + i.amount, 0);
const pendingInvoices = MOCK_INVOICES.filter(
  (i) => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue'
).length;

const STATS = [
  { label: 'Total Patients', value: String(totalPatients), icon: Users },
  { label: 'Total Visits', value: String(totalVisits), icon: Activity },
  { label: 'Revenue Collected', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: CreditCard },
  { label: 'Pending / Overdue', value: String(pendingInvoices), icon: AlertTriangle },
];

function alertClass(type: 'ALLERGY' | 'FALL_RISK' | 'DNR' | 'OTHER') {
  switch (type) {
    case 'ALLERGY':   return 'bg-red-950/50 text-red-200 border border-red-900/50';
    case 'FALL_RISK': return 'bg-amber-950/50 text-amber-200 border border-amber-900/50';
    case 'DNR':       return 'bg-blue-950/50 text-blue-200 border border-blue-900/50';
    default:          return 'bg-zinc-800 text-zinc-100 border border-zinc-700';
  }
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Patient Passport</h2>
        <p className="text-zinc-400 text-sm mt-1">Click any patient card to open their full clinical record.</p>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-zinc-500">{label}</span>
              <Icon className="w-4 h-4 text-zinc-600" />
            </div>
            <div className="text-2xl font-bold tabular-nums tracking-tight text-white mt-3">{value}</div>
          </div>
        ))}
      </div>

      {/* ── Patient cards ── */}
      <div>
        <div className="text-[10px] font-bold text-zinc-500 mb-3 tracking-wider uppercase">
          Patient Profiles
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PATIENT_PROFILES.map((patient) => {
            const age = calculateAge(patient.dateOfBirth);
            const initials = getInitials(patient.fullName);
            const visits = MOCK_VISITS.filter((v) => v.patientId === patient.id);
            const invoices = MOCK_INVOICES.filter((i) => i.patientId === patient.id);
            const outstanding = invoices.filter(
              (i) => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue'
            );

            return (
              <button
                key={patient.id}
                type="button"
                onClick={() => navigate(`/patient/${patient.id}`)}
                className="text-left bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-zinc-600 hover:bg-zinc-900 transition-all active:scale-[0.99] cursor-pointer"
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-3 mb-4">
                  {patient.photoUrl ? (
                    <img
                      src={patient.photoUrl}
                      alt={patient.fullName}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-400 shrink-0">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{patient.fullName}</p>
                    <p className="text-xs text-zinc-500 capitalize mt-0.5">
                      {age} yrs · {patient.gender} · {patient.bloodType}
                    </p>
                  </div>
                </div>

                {/* Alerts */}
                {patient.alerts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {patient.alerts.map((alert, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${alertClass(alert.type)}`}
                      >
                        {alert.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer stats */}
                <div className="flex gap-4 text-xs text-zinc-500 border-t border-zinc-800 pt-3">
                  <span>{visits.length} visit{visits.length !== 1 ? 's' : ''}</span>
                  <span className="font-mono">{patient.mrn}</span>
                  {outstanding.length > 0 && (
                    <span className="text-amber-400 font-medium ml-auto">
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
