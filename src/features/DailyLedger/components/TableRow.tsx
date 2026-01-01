import type { LedgerEntry } from "@/types";
import cn from "classnames";
import { rowGridLayout } from "./TableHeader";

const TableRow = ({ entry }: { entry: LedgerEntry }) => (
    <div key={entry.id} className={cn(
        rowGridLayout.main,    // grid
        "border-b border-zinc-100 dark:border-zinc-900",    // border
        "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"    // hover
    )}>
        <div className={cn(
            rowGridLayout.time,
            "text-zinc-500 font-mono text-xs"
        )}>
            {entry.time}
        </div>

        <div className={rowGridLayout.patientName}>
            <div className="text-zinc-700 dark:text-zinc-300 font-medium">
                {entry.patientName}
            </div>
            <div className="md:hidden text-xs text-zinc-400 mt-0.5">
                {entry.treatment}
            </div>
        </div>
        <div className={cn(
            rowGridLayout.treatment,
            "text-zinc-600 dark:text-zinc-400 text-sm"
        )}>
            {entry.treatment}
        </div>
        <div className={rowGridLayout.status}>
            <span className={cn(
                "text-xs px-1 sm:px-2 py-1 rounded",
                statusBadgeStyles[entry.status] ?? statusBadgeStyles.default
            )}>
                {entry.status}
            </span>
        </div>
    </div>
)

export default TableRow

const statusBadgeStyles = {
    'Paid': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-500',
    'In Therapy': 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
    'Waiting': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500',
    'default': 'bg-zinc-100 text-zinc-500'
} as const;



