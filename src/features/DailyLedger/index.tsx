import LedgerHeader from "./components/LedgerHeader";
import TableBody from "./components/TableBody";
import TableHeader from "./components/TableHeader";




/**
 * COMPONENT 1: THE LEDGER
 * The "Excel-like" input row for rapid entry.
 */
const DailyLedger = ({  }) => {
  
    // Ensure default AddNewPatientButton being selected when no patient found
   



    return (
        <div id="daily_ledger" className="w-full relative bg-white dark:bg-black border  border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col h-[500px] transition-colors duration-300">
            {/* Header */}
            <LedgerHeader />

            {/* Table Header */}
            <TableHeader />

            {/* Body */}
            <TableBody/>
            
           
        </div>
    );
};

export default DailyLedger;
