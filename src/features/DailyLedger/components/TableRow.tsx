import type { LedgerEntry } from "@/types";

const TableRow = ({ entry }: { entry: LedgerEntry }) => (
    <div key={entry.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
        <div className="col-span-2 text-zinc-500 font-mono text-xs">{entry.time}</div>
        <div className="col-span-6 md:col-span-4">
            <div className=" text-zinc-700 dark:text-zinc-300 font-medium">{entry.patientName}</div>
            <div className="md:hidden text-xs text-zinc-400 mt-0.5">{entry.treatment}</div>
        </div>
        <div className="hidden md:block md:col-span-4 text-zinc-600 dark:text-zinc-400 text-sm">{entry.treatment}</div>
        <div className="col-span-4 md:col-span-2 text-right">
            <span className={`text-xs px-1 sm:px-2 py-1 rounded ${getStatusBadgeStyle(entry.status)}`}>
                {entry.status}
            </span>
        </div>
    </div>
)

export default TableRow




const getStatusBadgeStyle = (status: LedgerEntry['status']) => {
    switch (status) {
        case 'Paid':
            return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-500';
        case 'In Therapy':
            return 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400';
        case 'Waiting':
            return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500';
        default:
            return 'bg-zinc-100 text-zinc-500';
    }
};
