import {cn} from "@/utils";
import LedgerHeader from "./components/LedgerHeader";
import TableBody from "./components/TableBody";
import TableHeader from "./components/TableHeader";




/**
 * COMPONENT 1: THE LEDGER
 * The "Excel-like" input row for rapid entry.
 */
const DailyLedger = ({ }) => {

    // Ensure default AddNewPatientButton being selected when no patient found




    return (
        <div id="daily_ledger" className={cn(
            "w-full relative h-[500px]",  // box
            "bg-white dark:bg-black",  // bg
            "border border-zinc-200 dark:border-zinc-800 rounded-lg",  // border           
            "flex flex-col  transition-colors duration-300"  // others
        )}>
            <LedgerHeader />
            <TableHeader />
            <TableBody />
        </div>
    );
};

export default DailyLedger;
