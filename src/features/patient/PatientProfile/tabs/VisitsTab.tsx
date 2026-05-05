import { useSearchParams } from 'react-router-dom';
import type { ComplaintCourse, Visit } from '@/types';

export interface VisitsTabProps {
  visits: Visit[];
  courses: ComplaintCourse[];
}

export function VisitsTab({ visits, courses }: VisitsTabProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeType      = searchParams.get('type') ?? '';      // '' | 'CONSULTATION' | 'MACHINE_ONLY'
  const activeComplaint = searchParams.get('complaint') ?? ''; // '' | complaintId

  function setParam(key: string, value: string) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    }, { replace: false });
  }

  // Apply filters
  const filtered = visits.filter(v => {
    if (activeType      && v.visitType    !== activeType)      return false;
    if (activeComplaint && v.complaintId  !== activeComplaint) return false;
    return true;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const hasFilters = activeType || activeComplaint;

  return (
    <div className="flex flex-col min-h-0 flex-1 gap-4 pb-8">

      {/* ── Filter toolbar — fixed, never scrolls ── */}
      <div className="flex flex-wrap items-center gap-3 shrink-0">

        {/* Visit type — segmented button group */}
        <div className="flex items-center rounded-lg border border-zinc-800 overflow-hidden text-xs font-medium">
          {(['', 'CONSULTATION', 'MACHINE_ONLY'] as const).map((val) => {
            const label = val === '' ? 'All' : val === 'CONSULTATION' ? 'Consult' : 'Machine Only';
            const active = activeType === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => setParam('type', val)}
                className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Complaint — native select */}
        <select
          value={activeComplaint}
          onChange={e => setParam('complaint', e.target.value)}
          className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-zinc-600 cursor-pointer"
        >
          <option value="">All complaints</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>
              {c.complaintName}
              {c.status === 'Active' ? ' (Active)' : ''}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                next.delete('type');
                next.delete('complaint');
                return next;
              }, { replace: false });
            }}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Clear filters
          </button>
        )}

        {/* Result count */}
        <span className="text-xs text-zinc-600 ml-auto">
          {sorted.length} of {visits.length} visits
        </span>
      </div>

      {/* ── Table ── */}
      {sorted.length === 0 ? (
        <p className="text-sm text-zinc-600 italic py-4">No visits match the current filters.</p>
      ) : (
        <div className="flex flex-col min-h-0 flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left shrink-0">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500 whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500">Complaint</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500 whitespace-nowrap">Visit Type</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500">Procedures</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500 text-right whitespace-nowrap">Total</th>
              </tr>
            </thead>
          </table>
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-zinc-800/60">
                {sorted.map((visit) => (
                  <tr key={visit.id} className="hover:bg-zinc-900 transition-colors align-top">

                    <td className="px-4 py-3 font-mono text-xs text-zinc-500 whitespace-nowrap w-[110px]">
                      {visit.date}
                    </td>

                    <td className="px-4 py-3 font-medium text-zinc-200">
                      {visit.complaint}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap ${
                        visit.visitType === 'CONSULTATION'
                          ? 'bg-violet-950/50 text-violet-200 border border-violet-900/50'
                          : 'bg-blue-950/50 text-blue-200 border border-blue-900/50'
                      }`}>
                        {visit.visitType === 'MACHINE_ONLY'
                          ? 'Machine Only'
                          : 'Consult' + (visit.consultationType === 'FIRST' ? ' · 1st' : '')}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {visit.services.length === 0 ? (
                        <span className="text-zinc-600 text-xs">—</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {visit.services.map((svc) => (
                            <span
                              key={svc.id}
                              title={svc.isCharged ? `₹${svc.chargedAmount}` : 'Included in consult'}
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border ${
                                svc.serviceCategory === 'PREMIUM'
                                  ? 'bg-amber-950/40 text-amber-200 border-amber-900/50'
                                  : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                              }`}
                            >
                              {svc.serviceName}
                              {svc.isCharged && (
                                <span className="ml-1 opacity-60">₹{svc.chargedAmount}</span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3 font-mono text-sm text-right whitespace-nowrap">
                      {visit.grandTotal === 0
                        ? <span className="text-zinc-600">₹0</span>
                        : <span className="text-zinc-200">₹{visit.grandTotal.toLocaleString('en-IN')}</span>
                      }
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default VisitsTab;
