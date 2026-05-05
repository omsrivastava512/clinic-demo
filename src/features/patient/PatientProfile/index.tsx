import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { PatientProfile } from '@/types';
import { MOCK_PATIENT_PROFILES } from '@/data/mock_data';
import { PassportPanel } from './PassportPanel';
import { ClinicalHistoryPanel } from './ClinicalHistoryPanel';

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivePanel = 'profile' | 'history';

// ─── Simulated async fetch ────────────────────────────────────────────────────

/**
 * Simulates an async profile load with a 100 ms delay so the loading state
 * is visible. Returns null when the ID is not found.
 */
function fetchPatientProfile(id: string): Promise<PatientProfile | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const profile = MOCK_PATIENT_PROFILES.find((p) => p.id === id) ?? null;
        resolve(profile);
      } catch (err) {
        reject(err);
      }
    }, 100);
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * PatientProfile — main route container for `/patient/:id`.
 *
 * Responsibilities:
 * - Reads `:id` from route params
 * - Simulates async profile load (100 ms) with loading / error / not-found states
 * - Desktop (≥ lg): side-by-side PassportPanel + ClinicalHistoryPanel
 * - Mobile/tablet (< lg): panel switcher toggling between Profile and History
 *
 * Requirements: 1.2, 1.3, 1.4, 1.5, 8.3, 8.4, 8.5
 */
export function PatientProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>('profile');

  // ── Load profile ────────────────────────────────────────────────────────────
  const loadProfile = () => {
    if (!id) {
      setLoading(false);
      setError(null);
      setProfile(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetchPatientProfile(id)
      .then((data) => {
        setProfile(data);
      })
      .catch(() => {
        setError('Unable to load patient data. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBack = () => navigate(-1);

  // ── Loading state ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-zinc-500 dark:text-zinc-400">
          <div className="w-8 h-8 rounded-full border-2 border-zinc-300 dark:border-zinc-600 border-t-zinc-600 dark:border-t-zinc-300 animate-spin" />
          <p className="text-sm">Loading patient profile…</p>
        </div>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 max-w-sm text-center">
          <p className="text-zinc-700 dark:text-zinc-300 font-medium">{error}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={loadProfile}
              className="px-4 py-2 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Not found state ─────────────────────────────────────────────────────────
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 max-w-sm text-center">
          <p className="text-zinc-700 dark:text-zinc-300 font-medium">Patient not found</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No patient record matches the ID{' '}
            <span className="font-mono text-zinc-700 dark:text-zinc-300">{id}</span>.
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
          >
            Back to Ledger
          </button>
        </div>
      </div>
    );
  }

  // ── Loaded — render layout ──────────────────────────────────────────────────
  return (
    <div className="h-dvh flex flex-col rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_40px_-15px_rgba(0,0,0,1)]">

      {/* ── Mobile / tablet panel switcher (hidden on lg+) ── */}
      <div className="flex lg:hidden border-b border-zinc-800 shrink-0">
        <button
          type="button"
          onClick={() => setActivePanel('profile')}
          className={[
            'flex-1 py-2.5 text-sm font-medium transition-colors',
            activePanel === 'profile'
              ? 'text-zinc-100 border-b-2 border-zinc-100'
              : 'text-zinc-500 hover:text-zinc-300',
          ].join(' ')}
        >
          Profile
        </button>
        <button
          type="button"
          onClick={() => setActivePanel('history')}
          className={[
            'flex-1 py-2.5 text-sm font-medium transition-colors',
            activePanel === 'history'
              ? 'text-zinc-100 border-b-2 border-zinc-100'
              : 'text-zinc-500 hover:text-zinc-300',
          ].join(' ')}
        >
          History
        </button>
      </div>

      {/* ── Panel area — fills remaining height, each side scrolls independently ── */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">

        {/* PassportPanel */}
        <div className={[
          'overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          activePanel === 'profile' ? 'block lg:block' : 'hidden lg:block',
        ].join(' ')}>
          <PassportPanel patient={profile} onBack={handleBack} />
        </div>

        {/* ClinicalHistoryPanel */}
        <div className={[
          'flex-1 min-w-0 min-h-0 flex flex-col',
          activePanel === 'history' ? 'block lg:flex' : 'hidden lg:flex',
        ].join(' ')}>
          <ClinicalHistoryPanel patient={profile} />
        </div>

      </div>
    </div>
  );
}

export default PatientProfilePage;
