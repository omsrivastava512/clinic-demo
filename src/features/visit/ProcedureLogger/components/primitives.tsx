import { cn } from "@/lib";
import type { InvoiceItem, Procedure } from "@/types";
import { CheckIcon, SearchIcon } from "lucide-react";

// ─── ProcedureCard ─────────────────────────────────────────────────────────────
// A single selectable procedure tile. Renders the procedure name, cost, and a
// checkmark when active. Stateless — selection state is owned by the hook above.
interface ProcedureCardProps {
    proc: Procedure;
    /** Whether this specific ctx+proc combination is currently selected. */
    selected: boolean;
    onToggle: () => void;
}
export const ProcedureCard: React.FC<ProcedureCardProps> = ({ proc, selected, onToggle }) => (
    <button
        onClick={onToggle}
        className={cn(
            // Base styles shared between both states
            "text-left p-3 rounded-md border transition-all flex justify-between items-start",
            selected
                // Active state: high-contrast border + subtle shadow to "lift" the card
                ? "bg-zinc-100 border-zinc-900 text-zinc-900 dark:bg-zinc-900 dark:border-white dark:text-white shadow-sm dark:shadow-white/5"
                // Idle state: muted with a hover affordance so the grid feels interactive
                : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:bg-zinc-900/50"
        )}
    >
        <div>
            <div className="font-medium text-sm">{proc.name}</div>
            {/* Monospace keeps rupee amounts visually aligned across cards */}
            <div className="text-[10px] font-mono mt-1 opacity-60">₹{proc.cost}</div>
        </div>
        {/* Only render the icon in the DOM when selected to avoid invisible layout space */}
        {selected && <CheckIcon className="w-4 h-4 shrink-0 text-zinc-900 dark:text-white" />}
    </button>
);



// ─── ReceiptItem ───────────────────────────────────────────────────────────────
// A single line in the live receipt panel. 
interface ReceiptItemProps {
    item: InvoiceItem;
}
export const ReceiptItem: React.FC<ReceiptItemProps> = ({ item }) => (
    <div className="flex justify-between text-sm py-1 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
        {/* truncate prevents long procedure names from breaking the fixed-width panel */}
        <span className="text-zinc-700 dark:text-zinc-300 truncate pr-2">{item.name}</span>
        <span className="font-mono text-zinc-500">₹{item.cost}</span>
    </div>
);


// ─── StickySectionHeader ───────────────────────────────────────────────────────────────
// When there are many contexts, the user needs to know which
// context they're currently scrolling through without losing their position.
type StickySectionHeaderProps = {
    index: number;
    title: string;
}
export const StickySectionHeader = ({ index, title }: StickySectionHeaderProps) => (<div className="flex items-center gap-3 mb-4 sticky top-0 bg-zinc-50/95 dark:bg-black/95 backdrop-blur py-2 z-10 border-b border-zinc-200 dark:border-zinc-900">
    {/* Numbered badge so the user can cross-reference this section with the receipt */}
    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700">
        {index + 1}
    </div>
    <div>
        <h3 className="text-zinc-900 dark:text-white font-bold">{title}</h3>
        <p className="text-xs text-zinc-500">Select procedures for this specific area</p>
    </div>
</div>);


// ─── SearchMoreProcedures ───────────────────────────────────────────────────────────────
export const SearchMoreProcedures = () => (
    <div className={cn(
        "sm:col-span-2  my-2 p-3 ",
        "text-left flex justify-between items-center",
        "border border-zinc-300 dark:border-zinc-800 rounded",
        "text-sm dark:text-white bg-zinc-100/50 dark:bg-zinc-900/50",
        "hover:border-zinc-600 dark:hover:border-zinc-400",
        "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
        "focus-within:border-zinc-600 dark:focus-within:border-zinc-400"
    )}>
        <input
            type="text"
            placeholder="Search less common procedures..."
            className="flex-1 bg-transparent border-none w-full placeholder-zinc-400 dark:placeholder-zinc-600  outline-none"
            title="Search Database: Use this to find rare procedures (e.g., 'Cupping', 'Needling', 'Lazer') not listed in the quick select grid."
        />
        <SearchIcon className=" w-5 h-4 text-zinc-600" />
    </div>
)

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
