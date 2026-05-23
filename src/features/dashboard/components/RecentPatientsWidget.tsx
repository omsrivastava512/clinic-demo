import type { WidgetProps } from '../types';
import { MOCK_PATIENT_PROFILES } from '@/data/mock_data';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RecentPatientsWidget({ config }: WidgetProps) {
  const navigate = useNavigate();
  // Simply grabbing the first 5 for demo purposes as "recent"
  const recentPatients = MOCK_PATIENT_PROFILES.slice(0, 5);

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col shadow-sm dark:shadow-none">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          Recent Patients
        </h3>
        <button 
          onClick={() => navigate('/patients')}
          className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          View all
        </button>
      </div>
      <div className="p-2 flex flex-col gap-1 flex-1 overflow-y-auto">
        {recentPatients.map(patient => (
          <div 
            key={patient.id}
            onClick={() => navigate(`/patient/${patient.id}`)}
            className="p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-500 dark:text-zinc-400 shrink-0">
              {patient.fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{patient.fullName}</h4>
              <p className="text-[10px] text-zinc-500 truncate">{patient.mrn}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
