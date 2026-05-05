import { useSearchParams } from 'react-router-dom';
import type { PatientProfile } from '@/types';
import { MOCK_INVOICES, MOCK_PURCHASES, MOCK_VISITS_V2, MOCK_COMPLAINT_COURSES } from '@/data/mock_data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './tabs/OverviewTab';
import { VisitsTab } from './tabs/VisitsTab';
import { PurchasesTab } from './tabs/PurchasesTab';
import { BillingsTab } from './tabs/BillingsTab';

export interface ClinicalHistoryPanelProps {
  patient: PatientProfile;
}

const TABS = [
  { value: 'overview',   label: 'Overview'   },
  { value: 'visits',     label: 'Visits'     },
  { value: 'purchases',  label: 'Purchases'  },
  { value: 'billings',   label: 'Billings'   },
] as const;

type TabValue = typeof TABS[number]['value'];

export function ClinicalHistoryPanel({ patient }: ClinicalHistoryPanelProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get('tab') ?? 'overview') as TabValue;

  function setTab(value: string) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', value);
      // Clear visit filters when leaving the visits tab
      if (value !== 'visits') {
        next.delete('type');
        next.delete('complaint');
      }
      return next;
    }, { replace: false });
  }

  const visits  = MOCK_VISITS_V2.filter((v) => v.patientId === patient.id);
  const courses = MOCK_COMPLAINT_COURSES.filter((c) => c.patientId === patient.id);
  const purchases = MOCK_PURCHASES.filter((p) => p.patientId === patient.id);
  const invoices  = MOCK_INVOICES.filter((i) => i.patientId === patient.id);

  return (
    <div className="flex-1 min-h-0 bg-black flex flex-col overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setTab}
        className="flex flex-col flex-1 overflow-hidden"
      >
        {/* Tab bar */}
        <div className="h-14 border-b border-zinc-800 flex items-center px-6 bg-black">
          <TabsList className="bg-transparent border-none shadow-none h-full gap-6 p-0 rounded-none">
            {TABS.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="h-full rounded-none border-b-2 border-transparent px-0 text-sm font-medium text-zinc-500 hover:text-zinc-300 data-active:border-white data-active:text-white data-active:bg-transparent data-active:shadow-none"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <TabsContent value="overview" className="flex-1 overflow-y-auto p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <OverviewTab vitals={patient.vitals} courses={courses} />
          </TabsContent>
          <TabsContent value="visits" className="flex-1 min-h-0 flex flex-col p-8 pb-0">
            <VisitsTab visits={visits} courses={courses} />
          </TabsContent>
          <TabsContent value="purchases" className="flex-1 min-h-0 flex flex-col p-8 pb-0">
            <PurchasesTab purchases={purchases} />
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
