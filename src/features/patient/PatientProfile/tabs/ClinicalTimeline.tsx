import { useSearchParams } from 'react-router-dom';
import type { ComplaintCourse } from '@/types';

export interface ClinicalTimelineProps {
  courses: ComplaintCourse[];
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function ClinicalTimeline({ courses }: ClinicalTimelineProps) {
  const [, setSearchParams] = useSearchParams();

  function goToVisits(courseId: string) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', 'visits');
      next.set('complaint', courseId);
      next.delete('type');
      return next;
    }, { replace: false });
  }

  if (courses.length === 0) {
    return <p className="text-sm text-zinc-600 italic">No complaint history recorded.</p>;
  }

  const sorted = [...courses].sort((a, b) => {
    if (a.status === 'Active' && b.status !== 'Active') return -1;
    if (a.status !== 'Active' && b.status === 'Active') return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <div className="relative pl-4 pr-1 border-l border-zinc-800 space-y-8">
      {sorted.map((course, idx) => {
        const isActive = course.status === 'Active';
        const isFirst = idx === 0;

        return (
          <div key={course.id} className="relative">
            {/* Dot */}
            <div className={`absolute -left-[21px] top-2 h-2.5 w-2.5 rounded-full border-2 border-black ${
              isActive
                ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                : isFirst
                ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                : 'bg-zinc-600'
            }`} />

            {isActive ? (
              <button
                type="button"
                onClick={() => goToVisits(course.id)}
                className="ml-4 w-[calc(100%-1rem)] text-left bg-zinc-900/50 border border-zinc-800 border-l-4 border-l-emerald-500 rounded-lg p-4 hover:bg-zinc-900 hover:border-zinc-600 transition-colors group"
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="font-semibold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                    {course.complaintName}
                  </span>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold shrink-0 bg-emerald-950/50 text-emerald-200 border border-emerald-900/50">
                    Active
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mb-3">
                  {fmt(course.startDate)} → Ongoing
                </p>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>
                    <span className="tabular-nums font-bold text-white text-sm">{course.totalSessions}</span>
                    {' '}sessions so far
                  </span>
                  <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    View visits →
                  </span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goToVisits(course.id)}
                className={`ml-4 w-[calc(100%-1rem)] text-left transition-opacity hover:opacity-100 group ${isFirst ? '' : 'opacity-60'}`}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    {course.complaintName}
                  </span>
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0 bg-zinc-800 text-zinc-400 border border-zinc-700">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-zinc-600">
                  {fmt(course.startDate)} → {fmt(course.endDate)}
                  {' · '}<span className="tabular-nums">{course.totalSessions}</span> sessions
                  <span className="ml-2 text-zinc-700 group-hover:text-zinc-500 transition-colors">View visits →</span>
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
