import { MOCK_LEDGER_ENTRIES } from "@/data/mock_data";
import { cn } from "@/lib";

const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });

const LedgerHeader = ({ opdCount = MOCK_LEDGER_ENTRIES.length }) => {
    return (
        <div className={cn(
            "flex justify-between items-end p-6",
            "border-b border-zinc-200 dark:border-zinc-800",
            "bg-zinc-50/70 dark:bg-zinc-950/70 backdrop-blur-md"
        )}>
            <div>
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-zinc-900 dark:text-white font-bold text-lg tracking-tight">Daily Register</h3>
                </div>
                <p className="text-zinc-500 text-xs font-medium">Dr. Sharma's Clinic · <span className="font-mono">{today}</span></p>
            </div>
            {/* OPD Count */}
            <div className="text-right">
                <div className="text-3xl font-bold font-mono text-zinc-900 dark:text-white tabular-nums tracking-tight">{opdCount}</div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mt-0.5">Today's OPD</div>
            </div>
        </div>
    );
};

export default LedgerHeader;
