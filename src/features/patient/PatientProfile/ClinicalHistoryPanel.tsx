import type { ComplaintCourse, InvoiceRecord, PackageRecord, Visit } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './tabs/OverviewTab';
import { VisitsTab } from './tabs/VisitsTab';
import { PackagesTab } from './tabs/PackagesTab';
import { BillingsTab } from './tabs/BillingsTab';
import type { VitalSign } from '@/types';
import { usePatientProfileUrlState } from './hooks/usePatientProfileUrlState';

export interface ClinicalHistoryPanelProps {
  vitals: VitalSign[];
  visits: Visit[];
  courses: ComplaintCourse[];
  packages: PackageRecord[];
  invoices: InvoiceRecord[];
}

const TABS = [
  { value: 'overview',  label: 'Overview'  },
  { value: 'visits',    label: 'Visits'    },
  { value: 'packages',  label: 'Packages'  },
  { value: 'billings',  label: 'Billings'  },
] as const;

export function ClinicalHistoryPanel({ vitals, visits, courses, packages, invoices }: ClinicalHistoryPanelProps) {
  // Using centralized URL state hook instead of inline useSearchParams
  const { tab, setTab } = usePatientProfileUrlState();

  return (
    <div className="flex-1 min-h-0 bg-white dark:bg-black flex flex-col overflow-hidden">
      <Tabs value={tab} onValueChange={setTab} className="flex flex-col flex-1 overflow-hidden">

        {/* Tab bar — uses variant="line" from the existing tabs component */}
        <div className="px-6 bg-white dark:bg-black shrink-0">
          <TabsList variant="line" className="gap-6 h-14">
            {TABS.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 data-active:text-zinc-900 dark:data-active:text-white px-0">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <TabsContent value="overview" className="flex-1 overflow-y-auto p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <OverviewTab vitals={vitals} courses={courses} />
          </TabsContent>
          <TabsContent value="visits" className="flex-1 min-h-0 flex flex-col p-8 pb-0">
            <VisitsTab visits={visits} courses={courses} />
          </TabsContent>
          <TabsContent value="packages" className="flex-1 min-h-0 flex flex-col p-8 pb-0">
            <PackagesTab packages={packages} />
          </TabsContent>
          <TabsContent value="billings" className="flex-1 min-h-0 flex flex-col p-8 pb-0">
            <BillingsTab invoices={invoices} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default ClinicalHistoryPanel;
