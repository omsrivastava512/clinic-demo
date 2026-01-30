import {cn} from "@/lib";
import { ledgerRowLayout } from "../ledgerRow.styles";

const TableHeader = () => (
    <div className={cn(
        ledgerRowLayout.main,    // grid
        "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 ",  // color
        "border-b border-zinc-200 dark:border-zinc-800",    // border
        "text-xs font-medium  uppercase tracking-wider"     // misc
    )}>
        <div className={ledgerRowLayout.time}>Time</div>
        <div className={ledgerRowLayout.patientName}>Patient Name</div>
        <div className={ledgerRowLayout.treatment}>Treatment</div>
        <div className={ledgerRowLayout.status}>Status</div>
    </div>
);


export default TableHeader

