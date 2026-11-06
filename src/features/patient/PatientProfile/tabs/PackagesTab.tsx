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
      <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-xl bg-muted/20 mt-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted mb-3 border border-border">
          <PackageOpen className="w-5 h-5 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">No Packages Found</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">This patient does not have any active or past treatment packages.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}

export default PackagesTab;
