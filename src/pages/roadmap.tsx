import React, { useMemo, useState } from 'react';
import { Check, ChevronRight, Circle, X, Moon, Sun } from 'lucide-react';
import { ROADMAP_STAGES } from '@/data/roadmap_data';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type StageId = 'V0' | 'V1' | 'V2' | 'V3' | 'V4' | 'V5';

export type StageStatus = 'current' | 'done' | 'upcoming';

export interface RoadmapStage {
    id: StageId;
    label: string;
    title: string;
    description: string;
    items: string[];
}


// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function clampStageIndex(currentStage: StageId): number {
    const idx = ROADMAP_STAGES.findIndex((s) => s.id === currentStage);
    return idx === -1 ? 0 : idx;
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

interface StageBadgeProps {
    status: StageStatus;
}

function StageBadge({ status }: StageBadgeProps) {
    if (status === 'current') {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 dark:border-zinc-600 bg-zinc-950 dark:bg-white px-2.5 py-1 text-xs font-medium text-white dark:text-zinc-950 shadow-sm shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-zinc-950" />
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
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
            <Circle className="h-3 w-3" />
            Next
        </span>
    );
}

interface ChecklistItemProps {
    checked: boolean;
    children: React.ReactNode;
}

function ChecklistItem({ checked, children }: ChecklistItemProps) {
    return (
        <li className="flex items-start gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <span
                className={
                    checked
                        ? 'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950'
                        : 'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-600 text-zinc-400 dark:text-zinc-500'
                }
            >
                {checked ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-2.5 w-2.5" />}
            </span>
            <span
                className={
                    checked
                        ? 'text-sm font-medium text-zinc-900 dark:text-zinc-100'
                        : 'text-sm text-zinc-500 dark:text-zinc-400'
                }
            >
                {children}
            </span>
        </li>
    );
}

interface RoadmapStageCardProps {
    stage: RoadmapStage;
    stageIndex: number;
    currentIndex: number;
    stageProgress: number;
}

function RoadmapStageCard({ stage, stageIndex, currentIndex, stageProgress }: RoadmapStageCardProps) {
    const isCurrent = stageIndex === currentIndex;
    const isDone = stageIndex < currentIndex;
    const status: StageStatus = isCurrent ? 'current' : isDone ? 'done' : 'upcoming';
    const completedCount = isDone
        ? stage.items.length
        : stageProgress;

    return (
        <section
            className={
                isCurrent
                    ? 'rounded-3xl border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900/60 p-5 shadow-sm'
                    : isDone
                        ? 'rounded-3xl border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-zinc-900 p-5 shadow-sm opacity-80'
                        : 'rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 shadow-sm'
            }
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="mb-2 flex items-center gap-2 flex-wrap">
                        <span className="rounded-full bg-zinc-950 dark:bg-zinc-100 px-3 py-1 text-xs font-semibold tracking-wide text-white dark:text-zinc-950">
                            {stage.id}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                            {stage.label}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">{stage.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {stage.description}
                    </p>
                </div>
                <StageBadge status={status} />
            </div>


            {/* Checklist */}
            <div className="mt-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                    <ChevronRight className="h-4 w-4" />
                    Checklist
                </div>
                <ul className="grid gap-3">
                    {stage.items.map((item,i) => (
                        <ChecklistItem key={item} checked={i<completedCount}>
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

export interface RoadmapPanelProps {
    currentStage?: StageId;
    title?: string;
    subtitle?: string;
    /** Slot for a close button or any header action */
    headerAction?: React.ReactNode;
    stageProgress?: Partial<Record<StageId, number>>;

}

export function RoadmapPanel({
    currentStage = 'V0',
    title = 'Clinic roadmap',
    subtitle = 'Roadmap',
    headerAction = null,
    stageProgress
}: RoadmapPanelProps) {
    const currentIndex = useMemo(() => clampStageIndex(currentStage), [currentStage]);
    const current = ROADMAP_STAGES[currentIndex];

    return (
        <div className="flex flex-col overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 shadow-2xl w-full">
            <header className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        Roadmap model
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                        {title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {subtitle}
                    </p>
                </div>
                {headerAction}
            </header>

            <div className="overflow-y-auto px-6 py-6">
                {/* Header */}
                <div className="mb-6 rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-zinc-950 dark:bg-zinc-100 px-3 py-1 text-xs font-semibold text-white dark:text-zinc-950">
                            Current position: {current.id}
                        </span>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {current.title}
                        </span>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        The checklist is not interactive, prop-driven and for presentation only.
                        Earlier stages read as completed. The current stage is highlighted. Later stages remain upcoming.
                    </p>
                </div>

                {/* Stage Cards */}
                <div className="grid gap-5">
                    {ROADMAP_STAGES.map((stage, i) => (
                        <RoadmapStageCard
                            key={stage.id}
                            stage={stage}
                            stageIndex={i}
                            stageProgress={stageProgress?.[stage.id]??0}
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

export interface ModalOverlayProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function ModalOverlay({ open, onOpenChange, children }: ModalOverlayProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <div
                className="absolute inset-0 bg-zinc-950/55 backdrop-blur-sm"
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

export interface RoadmapModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentStage?: StageId;
    title?: string;
    subtitle?: string;
}

export function RoadmapModal({
    open,
    onOpenChange,
    currentStage = 'V0',
    title = 'Clinic roadmap',
    subtitle = 'Roadmap',
}: RoadmapModalProps) {
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
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-950 dark:hover:text-zinc-50"
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

export function ClinicRoadmapDemoPage() {
    const [open, setOpen] = useState<boolean>(false);
    const [activeStage, setActiveStage] = useState<StageId>('V0');
    const [darkMode, setDarkMode] = useState<boolean>(false);

    function openAt(stageId: StageId): void {
        setActiveStage(stageId);
        setOpen(true);
    }

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 p-6 text-zinc-950 dark:text-zinc-50 transition-colors duration-300">
                <div className="mx-auto max-w-5xl space-y-4">

                    {/* Dark mode toggle */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setDarkMode((d) => !d)}
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-700"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            {darkMode ? 'Light mode' : 'Dark mode'}
                        </button>
                    </div>

                    {/* Trigger card */}
                    <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                            Clinic demo
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                            Roadmap trigger component
                        </h1>
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            Each button opens the modal at a specific stage. Stage state is lifted to the
                            parent so the modal always reflects the correct position.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => openAt('V0')}
                                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 dark:bg-zinc-100 px-5 py-3 text-sm font-medium text-white dark:text-zinc-950 transition hover:bg-zinc-800 dark:hover:bg-zinc-200"
                            >
                                Open at V0 (current)
                                <ChevronRight className="h-4 w-4" />
                            </button>

                            <button
                                type="button"
                                onClick={() => openAt('V1')}
                                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-50 dark:hover:bg-zinc-700"
                            >
                                Open at V1
                            </button>

                            <button
                                type="button"
                                onClick={() => openAt('V3')}
                                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-50 dark:hover:bg-zinc-700"
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