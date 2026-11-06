import { cn } from "@/lib";
import { ledgerRowLayout } from "../ledgerRow.styles";

const TableHeader = () => (
    <div className={cn(
        ledgerRowLayout.main,
        "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400",
        "border-b border-zinc-200 dark:border-zinc-800",
        "text-xs font-semibold uppercase tracking-wider py-3"
    )}>
        <div className={ledgerRowLayout.time}>Time</div>
        <div className={ledgerRowLayout.patientName}>Patient Name</div>
        <div className={ledgerRowLayout.treatment}>Treatment</div>
        <div className={ledgerRowLayout.status}>Status</div>
    </div>
);

export default TableHeader;
