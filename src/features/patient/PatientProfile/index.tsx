import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { PatientProfile } from '@/types';
import {
  MOCK_PATIENT_PROFILES,
  MOCK_VISITS_V2,
  MOCK_COMPLAINT_COURSES,
  MOCK_PURCHASES,
  MOCK_INVOICES,
} from '@/data/mock_data';
import { PassportPanel } from './PassportPanel';
import { ClinicalHistoryPanel } from './ClinicalHistoryPanel';

type ActivePanel = 'profile' | 'history';

function fetchPatientProfile(id: string): Promise<PatientProfile | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(MOCK_PATIENT_PROFILES.find((p) => p.id === id) ?? null);
      } catch (err) { reject(err); }
    }, 100);
  });
}

export function PatientProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>('profile');

  const loadProfile = () => {
    if (!id) { setLoading(false); setError(null); setProfile(null); return; }
    setLoading(true); setError(null);
    fetchPatientProfile(id)
      .then(setProfile)
      .catch(() => setError('Unable to load patient data. Please try again.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProfile(); }, [id]); // eslint-disable-line

  const handleBack = () => navigate(-1);

  // ── Derived data — owned here, passed as props ────────────────────────────
  const visits    = MOCK_VISITS_V2.filter((v) => v.patientId === id);
  const courses   = MOCK_COMPLAINT_COURSES.filter((c) => c.patientId === id);
  const purchases = MOCK_PURCHASES.filter((p) => p.patientId === id);
  const invoices  = MOCK_INVOICES.filter((i) => i.patientId === id);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3 text-zinc-500">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-300 dark:border-zinc-600 border-t-zinc-600 dark:border-t-zinc-300 animate-spin" />
        <p className="text-sm">Loading patient profile…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 max-w-sm text-center">
        <p className="text-zinc-700 dark:text-zinc-300 font-medium">{error}</p>
        <div className="flex gap-3">
          <button type="button" onClick={loadProfile}
            className="px-4 py-2 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
            Retry
          </button>
          <button type="button" onClick={handleBack}
            className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Back
          </button>
        </div>
      </div>
    </div>
  );

  if (!profile) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 max-w-sm text-center">
        <p className="text-zinc-700 dark:text-zinc-300 font-medium">Patient not found</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No patient record matches the ID <span className="font-mono">{id}</span>.
        </p>
        <button type="button" onClick={handleBack}
          className="px-4 py-2 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
          Back to Ledger
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-dvh flex flex-col rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black shadow-sm dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_40px_-15px_rgba(0,0,0,1)]">

      {/* Mobile panel switcher */}
      <div className="flex lg:hidden border-b border-zinc-200 dark:border-zinc-800 shrink-0 items-center bg-white dark:bg-black">
        <button type="button" onClick={handleBack}
          className="px-4 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors border-r border-zinc-200 dark:border-zinc-800 shrink-0">
          ← Back
        </button>
        {(['profile', 'history'] as const).map((panel) => (
          <button key={panel} type="button" onClick={() => setActivePanel(panel)}
            className={['flex-1 py-2.5 text-sm font-medium transition-colors capitalize',
              activePanel === panel
                ? 'text-zinc-900 dark:text-zinc-100 border-b-2 border-zinc-900 dark:border-zinc-100'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300',
            ].join(' ')}>
            {panel}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        <div className={['overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          activePanel === 'profile' ? 'block lg:block' : 'hidden lg:block'].join(' ')}>
          <PassportPanel patient={profile} onBack={handleBack} />
        </div>
        <div className={['flex-1 min-w-0 min-h-0 flex flex-col',
          activePanel === 'history' ? 'block lg:flex' : 'hidden lg:flex'].join(' ')}>
          <ClinicalHistoryPanel
            vitals={profile.vitals}
            visits={visits}
            courses={courses}
            purchases={purchases}
            invoices={invoices}
          />
        </div>
      </div>
    </div>
  );
}

export default PatientProfilePage;
