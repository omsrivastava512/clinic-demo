import { cn } from "@/lib";
import { PrinterIcon } from "lucide-react";

export const FooterActions = ({ onClose, isEmpty }: { onClose(): void, isEmpty: boolean }) => (<div className="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-800">
    <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm transition-colors"
        onClick={() => alert("Yet to be implemented")}
    >
        <PrinterIcon className="w-4 h-4" /> Print Receipt
    </button>
    <button
        onClick={onClose}
        type="button"
        disabled={isEmpty}
        className={cn(
            "px-6 py-2",
            "bg-emerald-600 hover:bg-emerald-700",
            "dark:bg-emerald-700 dark:hover:bg-emerald-600",
            "disabled:bg-zinc-200 disabled:dark:bg-zinc-800",
            "disabled:text-zinc-400 disabled:dark:text-zinc-600",
            "disabled:shadow-none disabled:cursor-not-allowed",
            "hover:disabled:bg-zinc-200 dark:hover:disabled:bg-zinc-800",
            "hover:disabled:bg-emerald-200 dark:hover:disabled:bg-emerald-900/40",
            "text-white font-bold rounded transition-colors shadow-md"
        )}
    >
        Confirm Payment
    </button>
</div>)

export default FooterActions;