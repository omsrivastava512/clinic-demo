import type { ComplaintCourse } from '@/types';
import { StatusBadge } from '@/components/common/status-badge';
import { usePatientProfileUrlState } from '../hooks/usePatientProfileUrlState';

export interface ClinicalTimelineProps {
  courses: ComplaintCourse[];
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function ClinicalTimeline({ courses }: ClinicalTimelineProps) {
  // Using centralized URL state hook
  const { goToVisits } = usePatientProfileUrlState();

  if (courses.length === 0) {
    return <p className="text-sm text-zinc-500 italic">No complaint history recorded.</p>;
  }

  const sorted = [...courses].sort((a, b) => {
    if (a.status === 'Active' && b.status !== 'Active') return -1;
    if (a.status !== 'Active' && b.status === 'Active') return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <div className="relative pl-4 pr-1 border-l border-zinc-200 dark:border-zinc-800 space-y-8">
      {sorted.map((course, idx) => {
        const isActive = course.status === 'Active';
        const isFirst = idx === 0;

        return (
          <div key={course.id} className="relative">
            <div className={`absolute -left-[21px] top-2 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-black ${
              isActive
                ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                : isFirst
                ? 'bg-zinc-900 dark:bg-white shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                : 'bg-zinc-300 dark:bg-zinc-600'
            }`} />

            {isActive ? (
              <button type="button" onClick={() => goToVisits({ complaintId: course.id })}
                className="ml-4 w-[calc(100%-1rem)] text-left bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-emerald-500 rounded-lg p-4 shadow-sm dark:shadow-none hover:shadow-md dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all group">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="font-semibold text-zinc-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {course.complaintName}
                  </span>
                  <StatusBadge variant="active">Active</StatusBadge>
                </div>
                <p className="text-xs text-zinc-500 mb-3">{fmt(course.startDate)} → Ongoing</p>
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>
                    <span className="tabular-nums font-bold text-zinc-900 dark:text-white text-sm">{course.totalSessions}</span>
                    {' '}sessions so far
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                    View visits →
                  </span>
                </div>
              </button>
            ) : (
              <button type="button" onClick={() => goToVisits({ complaintId: course.id })}
                className={`ml-4 w-[calc(100%-1rem)] text-left transition-opacity hover:opacity-100 group ${isFirst ? '' : 'opacity-60'}`}>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                    {course.complaintName}
                  </span>
                  <StatusBadge variant="completed">Completed</StatusBadge>
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-600">
                  {fmt(course.startDate)} → {fmt(course.endDate)}
                  {' · '}<span className="tabular-nums">{course.totalSessions}</span> sessions
                  <span className="ml-2 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 transition-colors">View visits →</span>
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
