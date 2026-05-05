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
    <div>
      <VitalsGrid vitals={vitals} />

      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <Activity className="w-4 h-4 text-zinc-500" />
        Complaint History
      </h3>
      <div className="overflow-y-auto max-h-[420px] px-1 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ClinicalTimeline courses={courses} />
      </div>
    </div>
  );
}

export default OverviewTab;
