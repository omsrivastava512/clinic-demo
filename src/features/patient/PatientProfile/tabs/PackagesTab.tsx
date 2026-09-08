import type { PackageRecord } from '@/types';
import { PackageCard } from '../components/PackageCard';

import { PackageOpen } from 'lucide-react';

export interface PackagesTabProps {
  packages: PackageRecord[];
}

// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
// Switched to PackageCard4 (PC4) per user directive, combining clean Shadcn card styling with permanent dot grid tracking.
export function PackagesTab({ packages }: PackagesTabProps) {
  if (packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/20 mt-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
          <PackageOpen className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No Packages Found</h3>
        <p className="text-sm text-zinc-500 mt-1 max-w-xs">This patient does not have any active or past treatment packages.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}

export default PackagesTab;
