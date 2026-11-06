import { ClipboardClockIcon } from "lucide-react";

type HeaderProps = {
    complaintList: string[];
    patientName: string;
};

export const ProcedureHeader = ({ complaintList, patientName }: HeaderProps) => {
    return (
        <div className="shrink-0 flex items-center gap-4 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shrink-0">
                <ClipboardClockIcon className="w-5 h-5" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                    Log Today's Procedures for <span>{patientName}</span>
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                    Complaints: <span className="text-zinc-700 dark:text-zinc-300">{complaintList.join(', ')}</span>
                </p>
            </div>
        </div>
    );
};

export default ProcedureHeader;
