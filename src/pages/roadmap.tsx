import React, { useMemo, useState } from 'react';
import { Check, ChevronRight, Circle, X, Moon, Sun } from 'lucide-react';

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

export const ROADMAP_STAGES = [
  {
    id: 'V0',
    label: 'Current foundation',
    title: 'Catalog demo / proof of concept',
    description:
      'Component-first work with dummy data. Covers all frontend surfaces — including the full procedure/session intake flow — before any backend is wired in.',
    items: [
      'Build polished clinic components in isolation',
      'Use dummy data only',
      'Perfect visual design and interaction states',
      'Keep the demo layer modular and reusable',
      'Build procedure / session intake flow UI',
      'Build patient registration and intake forms',
      'Ensure intake UX is fast and low-friction',
    ],
  },
  {
    id: 'V1',
    label: 'Full-stack MVP',
    title: 'Front end meets backend',
    description:
      'Turn the catalog into a working front-end module that talks to Supabase + PostgreSQL.',
    items: [
      'Wire components to real backend data',
      'Move from static/demo behavior to live data flow',
      'Use Supabase auth and database layers',
      'Stabilize the first MVP workflow',
    ],
  },
  {
    id: 'V2',
    label: 'Operational intake',
    title: 'Wire intake flow to backend',
    description:
      'The intake UI is already built in V0. This stage connects it to live backend data from V1 — turning the static demo flow into a real operational entry point for day-to-day clinic work.',
    items: [
      'Connect intake forms to Supabase data layer',
      'Persist procedure / session records to the database',
      'Introduce React Query or SWR for server state management',
      'Handle loading, error, and refetch states across intake flows',
      'Validate and handle real submission states',
      'Stabilize the end-to-end intake workflow',
    ],
  },
  {
    id: 'V3',
    label: 'Scheduling layer',
    title: 'Appointment management',
    description:
      'Add a module to see who is scheduled, where, and when. This helps the clinic manage time instead of only collecting intake.',
    items: [
      'Create appointment records',
      'Show patient schedule visibility',
      'Support time management for staff',
      'Link appointments to existing patient data',
    ],
  },
  {
    id: 'V4',
    label: 'Accountability layer',
    title: 'Audit and traceability',
    description:
      'Audit becomes necessary once the system grows beyond a simple single-clinic flow.',
    items: [
      'Record who did what and when',
      'Support review of important changes',
      'Prepare for multi-user operations',
      'Keep the data history inspectable',
    ],
  },
  {
    id: 'V5',
    label: 'Platform phase',
    title: 'Multi-clinic / multi-tenant support',
    description:
      'Move from one clinic workspace to a broader platform structure with clean boundaries between clinics, roles, and audit trails.',
    items: [
      'Separate data by clinic/workspace',
      'Support multiple tenants cleanly',
      'Enforce role and access boundaries',
      'Keep audit and scheduling consistent across tenants',
    ],
  },
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function clampStageIndex(currentStage) {
  const idx = ROADMAP_STAGES.findIndex((s) => s.id === currentStage);
  return idx === -1 ? 0 : idx;
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Bug fix: was only "We are here" | "Next" — now handles Done too */
function StageBadge({ status }) {
  if (status === 'current') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-600 bg-slate-950 dark:bg-white px-2.5 py-1 text-xs font-medium text-white dark:text-slate-950 shadow-sm shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-950" />
        We are here
      </span>
    );
  }
  if (status === 'done') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 shrink-0">
        <Check className="h-3 w-3" />
        Done
      </span>
    );
  }
  // upcoming
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">
      <Circle className="h-3 w-3" />
      Next
    </span>
  );
}

function ChecklistItem({ checked, children }) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3">
      <span
        className={
          checked
            ? 'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950'
            : 'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500'
        }
      >
        {checked ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-2.5 w-2.5" />}
      </span>
      <span className={checked ? 'text-sm font-medium text-slate-900 dark:text-slate-100' : 'text-sm text-slate-500 dark:text-slate-400'}>
        {children}
      </span>
    </li>
  );
}

function RoadmapStageCard({ stage, stageIndex, currentIndex }) {
  const isCurrent = stageIndex === currentIndex;
  const isDone = stageIndex < currentIndex;
  const status = isCurrent ? 'current' : isDone ? 'done' : 'upcoming';
  const itemsChecked = isDone || isCurrent;

  return (
    <section
      className={
        isCurrent
          ? 'rounded-3xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/60 p-5 shadow-sm'
          : isDone
          ? 'rounded-3xl border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-slate-900 p-5 shadow-sm opacity-80'
          : 'rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm'
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <span className="rounded-full bg-slate-950 dark:bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-white dark:text-slate-950">
              {stage.id}
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {stage.label}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-50">{stage.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            {stage.description}
          </p>
        </div>
        <StageBadge status={status} />
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          <ChevronRight className="h-4 w-4" />
          Checklist
        </div>
        <ul className="grid gap-3">
          {stage.items.map((item) => (
            <ChecklistItem key={item} checked={itemsChecked}>
              {item}
            </ChecklistItem>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// RoadmapPanel — pure content, no overlay
// Use directly as a tab, page section, or any
// inline context. No modal chrome involved.
// ─────────────────────────────────────────────

export function RoadmapPanel({
  currentStage = 'V0',
  title = 'Clinic roadmap',
  subtitle = 'Roadmap',
  headerAction = null,
}) {
  const currentIndex = useMemo(() => clampStageIndex(currentStage), [currentStage]);
  const current = ROADMAP_STAGES[currentIndex];

  return (
    <div className="flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-2xl w-full">
      <header className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Roadmap model
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            {title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
        {headerAction}
      </header>

      <div className="overflow-y-auto px-6 py-6">
        <div className="mb-6 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-950 dark:bg-slate-100 px-3 py-1 text-xs font-semibold text-white dark:text-slate-950">
              Current position: {current.id}
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {current.title}
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            This prop-driven marker decides which stage is visually treated as the present state.
            Earlier stages read as completed. The current stage is highlighted. Later stages remain upcoming.
          </p>
        </div>

        <div className="grid gap-5">
          {ROADMAP_STAGES.map((stage, index) => (
            <RoadmapStageCard
              key={stage.id}
              stage={stage}
              stageIndex={index}
              currentIndex={currentIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ModalOverlay — generic backdrop + centering
// Wrap anything in this to get modal behaviour.
// ─────────────────────────────────────────────

export function ModalOverlay({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-5xl">
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// RoadmapModal — ModalOverlay + RoadmapPanel
// The ready-made composition for modal usage.
// ─────────────────────────────────────────────

export function RoadmapModal({
  open,
  onOpenChange,
  currentStage = 'V0',
  title = 'Clinic roadmap',
  subtitle = 'Roadmap',
}) {
  return (
    <ModalOverlay open={open} onOpenChange={onOpenChange}>
      <RoadmapPanel
        currentStage={currentStage}
        title={title}
        subtitle={subtitle}
        headerAction={
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-slate-50"
            aria-label="Close roadmap modal"
          >
            <X className="h-5 w-5" />
          </button>
        }
      />
    </ModalOverlay>
  );
}

// ─────────────────────────────────────────────
// Demo page
// ─────────────────────────────────────────────

export default function ClinicRoadmapDemoPage() {
  const [open, setOpen] = useState(false);
  // Bug fix: track which stage the modal should open at
  const [activeStage, setActiveStage] = useState('V0');
  const [darkMode, setDarkMode] = useState(false);

  function openAt(stageId) {
    setActiveStage(stageId);
    setOpen(true);
  }

  return (
    // Dark mode is toggled by adding the `dark` class to the root wrapper
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6 text-slate-950 dark:text-slate-50 transition-colors duration-300">
        <div className="mx-auto max-w-5xl space-y-4">

          {/* Dark mode toggle */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setDarkMode((d) => !d)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm transition hover:bg-slate-50 dark:hover:bg-slate-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
          </div>

          {/* Trigger card */}
          <div className="rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Clinic demo
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Roadmap trigger component
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Each button opens the modal at a specific stage. Stage state is lifted to the
              parent so the modal always reflects the correct position.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openAt('V0')}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 dark:bg-slate-100 px-5 py-3 text-sm font-medium text-white dark:text-slate-950 transition hover:bg-slate-800 dark:hover:bg-slate-200"
              >
                Open at V0 (current)
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Bug fix: was calling setOpen(true) without updating the stage */}
              <button
                type="button"
                onClick={() => openAt('V1')}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Open at V1
              </button>

              <button
                type="button"
                onClick={() => openAt('V3')}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Open at V3
              </button>
            </div>
          </div>
        </div>

        <RoadmapModal
          open={open}
          onOpenChange={setOpen}
          currentStage={activeStage}
          title="Clinic roadmap"
          subtitle="Track where the product stands and what comes next."
        />
      </div>
    </div>
  );
}