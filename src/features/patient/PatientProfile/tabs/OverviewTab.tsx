import type { ComplaintCourse, VitalSign } from '@/types';
import { VitalsGrid } from './VitalsGrid';
import { ClinicalTimeline } from './ClinicalTimeline';
import { Activity } from 'lucide-react';

export interface OverviewTabProps {
  vitals: VitalSign[];
  courses: ComplaintCourse[];
}

export function OverviewTab({ vitals, courses }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <VitalsGrid vitals={vitals} />

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-primary" />
          Complaint History
        </h3>
        <div className="overflow-y-auto max-h-[420px] px-1 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <ClinicalTimeline courses={courses} />
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;
