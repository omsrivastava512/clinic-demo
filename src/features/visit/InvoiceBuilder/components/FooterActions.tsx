import { cn } from "@/lib";
import { PrinterIcon } from "lucide-react";

export const FooterActions = ({ onClose, isEmpty }: { onClose(): void; isEmpty: boolean }) => (
    <div className="flex justify-between items-center pt-5 border-t border-zinc-200 dark:border-zinc-800">
        <button
            type="button"
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-xs font-medium transition-colors cursor-pointer"
            onClick={() => alert("Yet to be implemented")}
        >
            <PrinterIcon className="w-4 h-4" />
            <span>Print Receipt</span>
        </button>
        <button
            onClick={onClose}
            type="button"
            disabled={isEmpty}
            className={cn(
                "px-6 py-2.5",
                "bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                "transition-all duration-150 active:scale-[0.985] cursor-pointer"
            )}
        >
            Confirm Payment
        </button>
    </div>
);

export default FooterActions;
