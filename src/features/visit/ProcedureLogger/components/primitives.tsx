import { cn } from "@/lib";
import type { InvoiceItem, Procedure } from "@/types";
import { CheckIcon, SearchIcon } from "lucide-react";
import type { ReactNode } from "react";

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
        type="button"
        onClick={onToggle}
        className={cn(
            "text-left p-3.5 rounded-xl border transition-all duration-150 flex justify-between items-start cursor-pointer active:scale-[0.985]",
            selected
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-md"
                : "bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
        )}
    >
        <div className="min-w-0 pr-2">
            <div className="font-semibold text-sm leading-snug">{proc.name}</div>
            {/* Monospace keeps rupee amounts visually aligned across cards */}
            <div className={cn(
                "text-xs font-mono tabular-nums mt-1.5 font-medium",
                selected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400 dark:text-zinc-500"
            )}>
                ₹{proc.cost}
            </div>
        </div>
        <div className={cn(
            "w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors",
            selected
                ? "bg-emerald-500 text-white border-emerald-500"
                : "border-zinc-300 dark:border-zinc-700 text-transparent"
        )}>
            <CheckIcon className="w-3.5 h-3.5" />
        </div>
    </button>
);

// ─── ReceiptItem ───────────────────────────────────────────────────────────────
// A single line in the live receipt panel. 
interface ReceiptItemProps {
    item: InvoiceItem;
}

export const ReceiptItem: React.FC<ReceiptItemProps> = ({ item }) => (
    <div className="flex justify-between items-center text-xs py-2 border-b border-zinc-200/60 dark:border-zinc-800/60 last:border-0">
        <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate pr-2">{item.name}</span>
        <span className="font-mono tabular-nums text-zinc-500 dark:text-zinc-400 shrink-0 font-medium">₹{item.cost}</span>
    </div>
);

// ─── StickySectionHeader ───────────────────────────────────────────────────────────────
type StickySectionHeaderProps = {
    index: number;
    title: string;
};

export const StickySectionHeader = ({ index, title }: StickySectionHeaderProps) => (
    <div className="flex items-center gap-3 mb-4 sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md py-3 z-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center text-xs font-bold font-mono border border-zinc-200 dark:border-zinc-700 shrink-0">
            {index + 1}
        </div>
        <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">{title}</h3>
            <p className="text-xs text-zinc-500">Select procedures for this specific area</p>
        </div>
    </div>
);

// ─── SearchMoreProcedures ───────────────────────────────────────────────────────────────
export const SearchMoreProcedures = () => (
    <div className={cn(
        "sm:col-span-2 my-1 px-3.5 py-2.5",
        "text-left flex justify-between items-center",
        "border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl",
        "text-xs bg-zinc-50 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-400",
        "hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
        "focus-within:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-400/10",
        "transition-all duration-150"
    )}>
        <input
            type="text"
            placeholder="Search less common procedures..."
            className="flex-1 bg-transparent border-none w-full placeholder:text-zinc-400 text-zinc-900 dark:text-white outline-none text-xs font-medium"
            title="Search Database: Use this to find rare procedures (e.g., 'Cupping', 'Needling', 'Lazer') not listed in the quick select grid."
        />
        <SearchIcon className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />
    </div>
);

type LayoutProps = {
    children: ReactNode;
};

export const RightLayout = ({ children }: LayoutProps) => (
    <div
        className={cn(
            "w-full md:w-80",
            "flex flex-col",
            "bg-zinc-50/80 dark:bg-zinc-900/50",
            "border border-zinc-200 dark:border-zinc-800 rounded-2xl",
            "p-6 shadow-sm shrink-0 backdrop-blur-sm"
        )}
    >
        {children}
    </div>
);

export const ProcedureBodyLayout = ({ children }: LayoutProps) => (
    <div
        className={cn(
            "w-full flex-1",
            "md:flex md:flex-row",
            "gap-6",
            "overflow-y-auto",
            "transition-colors duration-150"
        )}
    >
        {children}
    </div>
);
