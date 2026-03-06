import { ClipboardClockIcon } from "lucide-react";

type HeaderProps = {
    complaintList: string[];
    patientName: string;
}
export const ProcedureHeader = ({ complaintList, patientName }: HeaderProps) => {
    return (
        <div className="shrink-0 flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
            <div className="w-10 h-10 rounded-full dark:bg-zinc-900 flex items-center justify-center border dark:border-zinc-800 border-zinc-300 dark:text-white font-bold shrink-0">
                <ClipboardClockIcon/>
            </div>
            <div>
                <h3 className="text-lg font-bold dark:text-zinc-100 ">Log Today's Procedures for
                    <span> {patientName} </span>
                </h3>
                <p className="text-sm text-zinc-500">Complaints: <span className="dark:text-zinc-300">{complaintList.join(', ')}</span></p>
            </div>
        </div>)
}

export default ProcedureHeader