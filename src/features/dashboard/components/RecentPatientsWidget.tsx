import type { WidgetProps } from '../types';
import { MOCK_PATIENT_PROFILES } from '@/data/mock_data';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Decision: Prefixed `_config` with underscore to resolve TS6133 unused parameter compiler error.
export function RecentPatientsWidget({ config: _config }: WidgetProps) {
  const navigate = useNavigate();
  // Simply grabbing the first 5 for demo purposes as "recent"
  const recentPatients = MOCK_PATIENT_PROFILES.slice(0, 5);

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden">
      <CardHeader className="p-4 border-b border-border flex flex-row justify-between items-center space-y-0">
        <CardTitle className="font-semibold flex items-center gap-2 text-base">
          <Users className="w-4 h-4 text-muted-foreground" />
          Recent Patients
        </CardTitle>
        <button 
          onClick={() => navigate('/patients')}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
        </button>
      </CardHeader>
      <CardContent className="p-2 flex flex-col gap-1 flex-1 overflow-y-auto">
        {recentPatients.map(patient => (
          <div 
            key={patient.id}
            onClick={() => navigate(`/patient/${patient.id}`)}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
              {patient.fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{patient.fullName}</h4>
              <p className="text-[10px] text-muted-foreground truncate">{patient.mrn}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
