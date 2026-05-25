import { useSearchParams } from 'react-router-dom';
import type { ComplaintCourse, Visit } from '@/types';
import { StatusBadge } from '@/components/common/status-badge';
import { ServiceTag } from '../components/ServiceTag';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface VisitsTabProps {
  visits: Visit[];
  courses: ComplaintCourse[];
}

const VISIT_TYPE_OPTIONS = [
  { value: '',             label: 'All' },
  { value: 'CONSULTATION', label: 'Consult' },
  { value: 'MACHINE_ONLY', label: 'Machine Only' },
] as const;

export function VisitsTab({ visits, courses }: VisitsTabProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeType      = searchParams.get('type') ?? '';
  const activeComplaint = searchParams.get('complaint') ?? '';

  function setParam(key: string, value: string) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value); else next.delete(key);
      return next;
    }, { replace: true });
  }

  const filtered = visits.filter(v => {
    if (activeType      && v.visitType   !== activeType)      return false;
    if (activeComplaint && v.complaintId !== activeComplaint) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const hasFilters = activeType || activeComplaint;

  return (
    <div className="flex flex-col min-h-0 flex-1 gap-4 pb-8">

      {/* ── Filter toolbar ── */}
      <div className="flex flex-wrap items-center gap-3 shrink-0">

        {/* Visit type — segmented control (3 fixed options, ToggleGroup not available) */}
        <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden text-xs font-medium">
          {VISIT_TYPE_OPTIONS.map(({ value, label }) => {
            const active = activeType === value;
            return (
              <button key={value} type="button" onClick={() => setParam('type', value)}
                className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}>
                {label}
              </button>
            );
          })}
        </div>

        {/* Complaint — ShadCN Select */}
        <Select value={activeComplaint !== '' ? activeComplaint : '__all__'} onValueChange={(v) => v && setParam('complaint', v === '__all__' ? '' : v)}>
          <SelectTrigger size="sm" className="text-xs w-fit">
            <SelectValue>
              {activeComplaint
                ? (courses.find(c => c.id === activeComplaint)?.complaintName ?? 'All complaints')
                : 'All complaints'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="min-w-max">
            <SelectItem value="__all__">All complaints</SelectItem>
            {courses.map(c => (
              <SelectItem key={c.id} value={c.id}>
                {c.complaintName}{c.status === 'Active' ? ' · Active' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <button type="button"
            onClick={() => setSearchParams(prev => {
              const n = new URLSearchParams(prev);
              n.delete('type'); n.delete('complaint');
              return n;
            }, { replace: true })}
            className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            Clear filters
          </button>
        )}

        <span className="text-xs text-zinc-400 ml-auto">
          {sorted.length} of {visits.length} visits
        </span>
      </div>

      {/* ── Table ── */}
      {sorted.length === 0 ? (
        <p className="text-sm text-zinc-500 italic py-4">No visits match the current filters.</p>
      ) : (
        <div className="flex flex-col min-h-0 flex-1 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-sm dark:shadow-none">
          {/* Sticky header */}
          <table className="w-full text-sm text-left shrink-0">
            <thead className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-transparent">
              <tr>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-400 whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-400">Complaint</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-400 whitespace-nowrap">Visit Type</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-400">Procedures</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-zinc-400 text-right whitespace-nowrap">Total</th>
              </tr>
            </thead>
          </table>
          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {sorted.map((visit) => (
                  <tr key={visit.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors align-top">

                    <td className="px-4 py-3 font-mono text-xs text-zinc-400 whitespace-nowrap w-[110px]">
                      {visit.date}
                    </td>

                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-200">
                      {visit.complaint}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge variant={visit.visitType === 'CONSULTATION' ? 'consult' : 'machine-only'}>
                        {visit.visitType === 'MACHINE_ONLY'
                          ? 'Machine Only'
                          : 'Consult' + (visit.consultationType === 'FIRST' ? ' · 1st' : '')}
                      </StatusBadge>
                    </td>

                    <td className="px-4 py-3">
                      {visit.services.length === 0 ? (
                        <span className="text-zinc-400 text-xs">—</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {visit.services.map((svc) => (
                            <ServiceTag
                              key={svc.id}
                              serviceName={svc.serviceName}
                              isCharged={svc.isCharged}
                              chargedAmount={svc.chargedAmount}
                              serviceCategory={svc.serviceCategory}
                            />
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3 font-mono text-sm text-right whitespace-nowrap">
                      {visit.grandTotal === 0
                        ? <span className="text-zinc-400">₹0</span>
                        : <span className="text-zinc-900 dark:text-zinc-200">₹{visit.grandTotal.toLocaleString('en-IN')}</span>
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
