import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PATIENT_PROFILES, MOCK_INVOICES, MOCK_VISITS_V2 } from '@/data/mock_data';
import { Users, Activity, CreditCard, AlertTriangle } from 'lucide-react';
import PatientCard from './PatientCard';

export default function Dashboard() {
  const navigate = useNavigate();

  // Ref: ADR-PP-20 — HashMap indexing to reduce render-loop complexity from O(P×(V+I)) to O(1) per card.
  const visitsCountLookup = useMemo(() => {
    const lookup: Record<string, number> = {};
    MOCK_VISITS_V2.forEach((visit) => {
      const pId = visit.patientId;
      lookup[pId] = (lookup[pId] || 0) + 1;
    });
    return lookup;
  }, []);

  const unpaidInvoicesCountLookup = useMemo(() => {
    const lookup: Record<string, number> = {};
    MOCK_INVOICES.forEach((invoice) => {
      if (invoice.paymentStatus === 'Pending' || invoice.paymentStatus === 'Overdue') {
        const pId = invoice.patientId;
        lookup[pId] = (lookup[pId] || 0) + 1;
      }
    });
    return lookup;
  }, []);

  // Stats computed inside component (not at module scope) to stay migration-ready for a reactive API.
  // Ref: ADR-PP-21 — useMemo on stats re-introduced after senior review; prevents redundant filter/reduce on every render.
  const stats = useMemo(() => {
    const totalPatients = MOCK_PATIENT_PROFILES.length;
    const totalVisits = MOCK_VISITS_V2.length; // Using Visit model instead of VisitRecord
    const totalRevenue = MOCK_INVOICES
      .filter((i) => i.paymentStatus === 'Paid')
      .reduce((sum, i) => sum + i.amount, 0);
    const pendingInvoices = MOCK_INVOICES.filter(
      (i) => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue'
    ).length;

    return [
      { label: 'Total Patients', value: String(totalPatients), icon: Users },
      { label: 'Total Visits', value: String(totalVisits), icon: Activity },
      { label: 'Revenue Collected', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: CreditCard },
      { label: 'Pending / Overdue', value: String(pendingInvoices), icon: AlertTriangle },
    ];
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Patient Profiles</h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">Click any patient card to open their full clinical record.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs p-5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors backdrop-blur-sm"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight text-zinc-900 dark:text-white mt-4 font-sans">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Patient cards */}
      <div>
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Patient Profiles</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PATIENT_PROFILES.map((patient) => {
            const visitsCount = visitsCountLookup[patient.id] ?? 0;
            const unpaidInvoicesCount = unpaidInvoicesCountLookup[patient.id] ?? 0;

            // Ref: ADR-PP-22 — PatientCard receives O(1) lookup values as memoizable primitive props.
            return (
              <PatientCard
                key={patient.id}
                patient={patient}
                visitsCount={visitsCount}
                unpaidInvoicesCount={unpaidInvoicesCount}
                onClick={() => navigate(`/patient/${patient.id}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
