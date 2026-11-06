import type { Patient } from "@/types";
import { getLastVisit, getAge } from "../lib";

export const PatientHeader = ({ patient }: { patient: Patient }) => (
    <div className="flex justify-between items-start mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {patient.fullName}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium mt-1">
                Returning Patient • Last visit: {getLastVisit(patient.lastVisitAt)}
            </p>
        </div>
        <div className="text-right text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="block font-semibold">MRN-9921</span>
            <span className="block">{getAge(patient.dateOfBirth)}</span>
        </div>
    </div>
);

export default PatientHeader;
