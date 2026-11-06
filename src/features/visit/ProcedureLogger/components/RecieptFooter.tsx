import { cn, rupee } from "@/lib/utils";

// ─── ReceiptFooter ───────────────────────────────────────────────────────────────
type RecieptFooterProps = {
    totalCost: number;
    onComplete(): void;
    isDisabled: boolean;
};

export const RecieptFooter = ({ totalCost, onComplete, isDisabled }: RecieptFooterProps) => (
    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5 mt-5">
        <div className="flex justify-between items-baseline mb-4">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total</span>
            <span className="text-3xl font-bold text-zinc-900 dark:text-white font-mono tabular-nums tracking-tight">
                {rupee.format(totalCost)}
            </span>
        </div>
        {/* Disabled until at least one procedure is selected.  */}
        <button
            type="button"
            onClick={onComplete}
            disabled={isDisabled}
            className={cn(
                "w-full",
                "py-3 px-6",
                "rounded-xl",
                "font-bold text-sm",
                "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
                "hover:bg-zinc-800 dark:hover:bg-zinc-100",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                "transition-all duration-150 active:scale-[0.985] shadow-md cursor-pointer"
            )}
        >
            Create Invoice
        </button>
    </div>
);

export default RecieptFooter;
