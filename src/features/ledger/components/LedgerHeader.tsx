import { MOCK_LEDGER_ENTRIES } from "@/data/mock_data"
import {cn} from "@/lib"

const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });

const LedgerHeader = ({ opdCount = MOCK_LEDGER_ENTRIES.length }) => {
    return (
        <div className={cn(
            "flex justify-between items-end z-0 p-6 ",  // flex
            "border-b border-zinc-200 dark:border-zinc-900",    // border
            "bg-zinc-50 dark:bg-zinc-950"       // bg
        )}>
            <div>
                <div className="flex-col md:flex-row gap-2 items-center">
                    <p className="text-zinc-900 dark:text-white font-medium">Daily Register</p>
                    <p className="text-zinc-500 text-xs">{today}</p>
                </div>
                <p className="text-zinc-500 text-sm">Dr. Sharma's Clinic</p>
            </div>
            {/* OPD Count */}
            <div className="text-right">
                <div className="text-2xl font-mono text-zinc-900 dark:text-white">{opdCount}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">OPD Count</div>
            </div>
        </div>
    )
}

export default LedgerHeader