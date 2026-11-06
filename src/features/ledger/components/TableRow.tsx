import type { LedgerEntry } from "@/types";
import { cn } from "@/lib";
import { ledgerRowLayout } from "../ledgerRow.styles";
import { useNavigate } from "react-router-dom";

const statusBadgeStyles = {
    'Paid': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60',
    'In Therapy': 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60',
    'Waiting': 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60',
    'default': 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
} as const;

const TableRow = ({ entry }: { entry: LedgerEntry }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (entry.patientId) {
            navigate(`/patient/${entry.patientId}`);
        }
    };

    return (
        <div
            key={entry.id}
            onClick={handleClick}
            className={cn(
                ledgerRowLayout.main,
                "border-b border-zinc-100 dark:border-zinc-900/60 py-3.5",
                "hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 transition-colors",
                entry.patientId && "cursor-pointer group"
            )}
        >
            <div className={cn(
                ledgerRowLayout.time,
                "text-zinc-500 font-mono text-xs tabular-nums"
            )}>
                {entry.time}
            </div>

            <div className={ledgerRowLayout.patientName}>
                <div className="text-zinc-900 dark:text-zinc-100 font-semibold tracking-tight text-sm group-hover:text-primary transition-colors">
                    {entry.patientName}
                </div>
                <div className="md:hidden text-xs text-zinc-500 mt-0.5">
                    {entry.treatment}
                </div>
            </div>
            <div className={cn(
                ledgerRowLayout.treatment,
                "text-zinc-600 dark:text-zinc-400 text-sm font-normal"
            )}>
                {entry.treatment}
            </div>
            <div className={ledgerRowLayout.status}>
                <span className={cn(
                    "text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1",
                    statusBadgeStyles[entry.status] ?? statusBadgeStyles.default
                )}>
                    {entry.status}
                </span>
            </div>
        </div>
    );
};

export default TableRow;
