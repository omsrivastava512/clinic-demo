import type { ComplaintCourse } from '@/types';
import { StatusBadge } from '@/components/common/status-badge';
import { usePatientProfileUrlState } from '../hooks/usePatientProfileUrlState';
import { Activity } from 'lucide-react';

export interface ClinicalTimelineProps {
  courses: ComplaintCourse[];
}

// DECISION [ORIGIN: AI_AUTONOMOUS]: Safe date formatting fallback returning 'N/A' for empty strings to prevent render crashes.
function fmt(d: string) {
  if (!d) return 'N/A';
  const date = new Date(d);
  if (isNaN(date.getTime())) return 'Invalid Date';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function ClinicalTimeline({ courses }: ClinicalTimelineProps) {
  // Using centralized URL state hook
  const { goToVisits } = usePatientProfileUrlState();

  if (courses.length === 0) {
    // DECISION [ORIGIN: AI_AUTONOMOUS]: High-fidelity empty state matching design-system consistency across tabs.
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/20 mt-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-3 border border-zinc-200 dark:border-zinc-700">
          <Activity className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
        </div>
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">No History Recorded</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs">There are no active or completed complaints for this patient yet.</p>
      </div>
    );
  }

  const sorted = [...courses].sort((a, b) => {
    if (a.status === 'Active' && b.status !== 'Active') return -1;
    if (a.status !== 'Active' && b.status === 'Active') return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    // DECISION [TRIGGER: RUNTIME_BUG] [ORIGIN: AI_AUTONOMOUS]:
    // Render absolute line on each node instead of parent border-l to prevent line hanging past the last node.
    <div className="relative pl-4 pr-1 space-y-6">
      {sorted.map((course, idx) => {
        const isActive = course.status === 'Active';
        const isFirst = idx === 0;
        const isLast = idx === sorted.length - 1;

        return (
          <div key={course.id} className="relative">
            {/* The vertical connecting line (hidden on the last item to prevent hanging) */}
            {!isLast && (
              <div className="absolute -left-4 top-4 bottom-[-1.5rem] w-px bg-zinc-200 dark:border-zinc-800" />
            )}

            {/* The timeline dot */}
            <div
              className={`absolute -left-[21px] top-2 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-zinc-950 ${
                isActive
                  ? 'bg-emerald-500 ring-2 ring-emerald-500/20'
                  : isFirst
                  ? 'bg-zinc-900 dark:bg-white ring-1 ring-zinc-300 dark:ring-zinc-700'
                  : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            />

            {isActive ? (
              <button
                type="button"
                onClick={() => goToVisits({ complaintId: course.id })}
                className="ml-4 w-[calc(100%-1rem)] text-left bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 border-l-[3px] border-l-emerald-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <span className="font-bold text-base text-zinc-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                    {course.complaintName}
                  </span>
                  <StatusBadge variant="active">Active</StatusBadge>
                </div>
                <p className="text-xs text-zinc-500 mb-3">{fmt(course.startDate)} → Ongoing</p>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>
                    <span className="tabular-nums font-bold text-zinc-900 dark:text-white text-sm">{course.totalSessions}</span>
                    {' '}sessions so far
                  </span>
                  <span className="text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors font-medium">
                    View visits →
                  </span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goToVisits({ complaintId: course.id })}
                className={`ml-4 w-[calc(100%-1rem)] text-left transition-opacity hover:opacity-100 group cursor-pointer ${
                  isFirst ? '' : 'opacity-65'
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="font-semibold text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors tracking-tight">
                    {course.complaintName}
                  </span>
                  <StatusBadge variant="completed">Completed</StatusBadge>
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  {fmt(course.startDate)} → {fmt(course.lastDate)}
                  {' · '}<span className="tabular-nums font-mono">{course.totalSessions}</span> sessions
                  <span className="ml-2 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors font-medium">
                    View visits →
                  </span>
                </p>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ClinicalTimeline;
