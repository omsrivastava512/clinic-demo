import { cn } from "@/lib/utils";
import LedgerHeader from "./components/LedgerHeader";
import TableBody from "./components/TableBody";
import TableHeader from "./components/TableHeader";

/**
 * COMPONENT 1: THE LEDGER
 * The "Excel-like" input row for rapid entry.
 */
export const DailyLedger = () => {
    return (
        <div
            id="daily_ledger"
            className={cn(
                "w-full relative h-[85vh] max-h-[800px]",
                "bg-white dark:bg-zinc-950",
                "border border-zinc-200 dark:border-zinc-800 rounded-2xl",
                "shadow-xl dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_40px_-15px_rgba(0,0,0,0.8)]",
                "flex flex-col overflow-hidden"
            )}
        >
            <LedgerHeader />
            <TableHeader />
            <TableBody />
        </div>
    );
};

export default DailyLedger;
