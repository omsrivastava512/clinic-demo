import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { PatientProfile } from '@/types';
import {
  MOCK_PATIENT_PROFILES,
  MOCK_VISITS_V2,
  MOCK_COMPLAINT_COURSES,
  MOCK_PACKAGES,
  MOCK_INVOICES,
} from '@/data/mock_data';
import { PassportPanel } from './PassportPanel';
import { ClinicalHistoryPanel } from './ClinicalHistoryPanel';
import { ProfileLoading } from './ProfileLoading';
import { ProfileError } from './ProfileError';
import { ProfileNotFound } from './ProfileNotFound';

type ActivePanel = 'profile' | 'history';

// Discriminated union — treating "not found" as a valid outcome, not an exception
type FetchResult =
  | { kind: 'ok'; data: PatientProfile }
  | { kind: 'not-found' }
  | { kind: 'error'; message: string };

function fetchPatientProfile(id: string): Promise<FetchResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Ref: ADR-PP-11 — 20% error simulation for UI error boundary testing in dev.
      if (Math.random() < 0.2) {
        resolve({ kind: 'error', message: 'Simulated network error. Please try again.' });
        return;
      }
      const patient = MOCK_PATIENT_PROFILES.find((p) => p.id === id);
      if (patient) resolve({ kind: 'ok', data: patient });
      else resolve({ kind: 'not-found' });
      // Future: network errors will resolve with { kind: 'error', message: '...' }
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

  // Memoized to avoid recreating on every render — used in effect and retry button.
  // Ref: ADR-PP-08 — optional AbortController prevents crashes when Retry invokes loadProfile directly.
  const loadProfile = useCallback((controller?: AbortController) => {
    // Explicit check for undefined id prevents rendering literal "undefined" in UI
    if (!id) {
      setLoading(false);
      setError('Invalid patient ID in URL');
      setProfile(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetchPatientProfile(id).then((result) => {
      if (controller?.signal.aborted) return;

      if (result.kind === 'ok') {
        setProfile(result.data);
      } else if (result.kind === 'not-found') {
        setProfile(null);
      } else {
        setError(result.message);
      }
    }).finally(() => {
      if (controller?.signal.aborted) return;
      setLoading(false);
    });
  }, [id]);

  // Effect only depends on loadProfile, which is stable (memoized on id).
  // Ref: ADR-PP-09 — deferred full cleanup; React Query/SWR adoption planned for Supabase phase.
  useEffect(() => {
    const controller = new AbortController();
    loadProfile(controller);

    return () => { controller.abort() };
  }, [loadProfile]);

  // Ref: ADR-PP-10 — safe navigation fallback for direct-link / fresh-tab entry.
  const handleBack = useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Memoized derived data — avoid refiltering on every render (e.g., activePanel toggle)
  const visits = useMemo(() => MOCK_VISITS_V2.filter((v) => v.patientId === id), [id]);
  const courses = useMemo(() => MOCK_COMPLAINT_COURSES.filter((c) => c.patientId === id), [id]);
  const packages = useMemo(() => MOCK_PACKAGES.filter((p) => p.patientId === id), [id]);
  const invoices = useMemo(() => MOCK_INVOICES.filter((i) => i.patientId === id), [id]);

  if (loading) return <ProfileLoading />;

  if (error) return <ProfileError error={error} onRetry={() => loadProfile()} onBack={handleBack} />;

  if (!profile) return <ProfileNotFound id={id} onBack={handleBack} />;

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
            packages={packages}
            invoices={invoices}
          />
        </div>
      </div>
    </div>
  );
}

export default PatientProfilePage;
