import type { ComplaintCourse, VitalSign } from '@/types';
import { VitalsGrid } from './VitalsGrid';
import { ClinicalTimeline } from './ClinicalTimeline';
import { Activity } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface OverviewTabProps {
  vitals: VitalSign[];
  courses: ComplaintCourse[];
}

export function OverviewTab({ vitals, courses }: OverviewTabProps) {
  return (
    <div>
      <VitalsGrid vitals={vitals} />

      <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
        <Activity className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
        Complaint History
      </h3>
      {/* Ref: ADR-PP-26 — ScrollArea wrapper ensures consistent scrollbar hiding. */}
      <ScrollArea className="overflow-y-auto max-h-[420px] px-1 pr-2">
        <ClinicalTimeline courses={courses} />
      </ScrollArea>
    </div>
  );
}

export default OverviewTab;
