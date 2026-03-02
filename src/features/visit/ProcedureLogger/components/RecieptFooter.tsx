// ─── ReceiptFooter ───────────────────────────────────────────────────────────────
type RecieptFooterProps = {
    totalCost: number;
    onComplete(): void;
    isDisabled: boolean;
};
export const RecieptFooter = ({ totalCost, onComplete, isDisabled }: RecieptFooterProps) => (<div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 mt-4">
    <div className="flex justify-between items-center mb-4">
        <span className="text-zinc-500 dark:text-zinc-400">Total</span>
        <span className="text-2xl font-bold text-zinc-900 dark:text-white font-mono">
            ₹{totalCost}
        </span>
    </div>
    {/* Disabled until at least one procedure is selected.  */}
    <button
        onClick={onComplete}
        disabled={isDisabled}
        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-3 rounded hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 transition-colors"
    >
        Create Invoice
    </button>
</div>);
