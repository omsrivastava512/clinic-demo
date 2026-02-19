import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import type { InvoiceItem, MedicalComplaint, Procedure } from "@/types";
import { PHYSIO_PROCEDURES } from "@/data/mock_data";
import { useProcedureLogger } from "./hook/useProcedureLogger.tsx";

// ─── ProcedureCard ─────────────────────────────────────────────────────────────
//
// A single selectable procedure tile. Renders the procedure name, cost, and a
// checkmark when active. Stateless — selection state is owned by the hook above.
//
// WHY separate component: The card's selected/unselected styling is non-trivial.
// Isolating it here means the grid in ContextSection stays clean, and the card
// can be tested or restyled independently.

interface ProcedureCardProps {
    proc: Procedure;
    /** Whether this specific ctx+proc combination is currently selected. */
    selected: boolean;
    onToggle: () => void;
}

const ProcedureCard: React.FC<ProcedureCardProps> = ({ proc, selected, onToggle }) => (
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
//
// A single line in the live receipt panel. Keeps the name + cost layout DRY —
// the same pattern would otherwise be duplicated for every item in the list.

interface ReceiptItemProps {
    item: InvoiceItem;
}

const ReceiptItem: React.FC<ReceiptItemProps> = ({ item }) => (
    <div className="flex justify-between text-sm py-1 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
        {/* truncate prevents long procedure names from breaking the fixed-width panel */}
        <span className="text-zinc-700 dark:text-zinc-300 truncate pr-2">{item.name}</span>
        <span className="font-mono text-zinc-500">₹{item.cost}</span>
    </div>
);

// ─── ContextSection ────────────────────────────────────────────────────────────
//
// Renders one "zone" of procedure selection scoped to a single MedicalComplaint.
// Each context gets its own sticky header and a 2-column grid of ProcedureCards.
//
// WHY sticky header: When there are many contexts, the user needs to know which
// context they're currently scrolling through without losing their position.
//
// WHY left border + indent: Creates a visual hierarchy that ties each procedure
// grid to its parent context, making the many-to-many relationship scannable.

interface ContextSectionProps {
    ctx: MedicalComplaint;
    /** Zero-based position in the selectedContexts array — used for the index badge and stagger delay. */
    index: number;
    isSelected: (ctxId: string, procId: string) => boolean;
    onToggle: (ctx: MedicalComplaint, proc: Procedure) => void;
}

/**
 * Each section fades in with a small stagger so the UI feels responsive
 * when contexts are first rendered, rather than everything appearing at once.
 */
const ANIMATION_STEP_MS = 100;

const ContextSection: React.FC<ContextSectionProps> = ({ ctx, index, isSelected, onToggle }) => (
    <div className="animate-fadeIn" style={{ animationDelay: `${index * ANIMATION_STEP_MS}ms` }}>

        {/* Sticky context header — stays visible while scrolling through its procedure grid */}
        <div className="flex items-center gap-3 mb-4 sticky top-0 bg-zinc-50/95 dark:bg-black/95 backdrop-blur py-2 z-10 border-b border-zinc-200 dark:border-zinc-900">
            {/* Numbered badge so the user can cross-reference this section with the receipt */}
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700">
                {index + 1}
            </div>
            <div>
                <h3 className="text-zinc-900 dark:text-white font-bold">{ctx.title}</h3>
                <p className="text-xs text-zinc-500">Select procedures for this specific area</p>
            </div>
        </div>

        {/* Procedure grid — left-indented and bordered to visually "belong" to the header above */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4 border-l-2 border-zinc-300 dark:border-zinc-800">
            {PHYSIO_PROCEDURES.map(proc => (
                <ProcedureCard
                    key={proc.id}
                    proc={proc}
                    selected={isSelected(ctx.id, proc.id)}
                    // Bind both ctx and proc here so ProcedureCard only needs a zero-arg onToggle
                    onToggle={() => onToggle(ctx, proc)}
                />
            ))}
        </div>
    </div>
);

// ─── ProcedureLogger ───────────────────────────────────────────────────────────
//
// The top-level component for Step 3 of the invoice flow.
//
// LAYOUT: Two-column on md+ screens:
//   LEFT  — Scrollable list of ContextSections (one per selected complaint)
//   RIGHT — Fixed-width live receipt panel that updates as procedures are toggled
//
// The component itself holds no logic — everything is delegated to useProcedureLogger.
// This keeps the JSX readable and makes the business logic independently testable.

interface ProcedureLoggerProps {
    /** The subset of MedicalComplaints the user confirmed in Step 2. */
    selectedContexts: MedicalComplaint[];
    /** Called with the final flat list of InvoiceItems when the user clicks "Create Invoice". */
    onComplete: (items: InvoiceItem[]) => void;
}

const ProcedureLogger: React.FC<ProcedureLoggerProps> = ({ selectedContexts, onComplete }) => {
    const { items, toggleProcedure, isSelected, itemsForContext, totalCost, hasItems } =
        useProcedureLogger();

    return (
        <div className="w-full md:flex overflow-y-scroll md:flex-row gap-6 h-150 transition-colors duration-300">

            {/* LEFT: Scrollable procedure selection — one section per context */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-8 h-full">
                {selectedContexts.map((ctx, index) => (
                    <ContextSection
                        key={ctx.id}
                        ctx={ctx}
                        index={index}
                        isSelected={isSelected}
                        onToggle={toggleProcedure}
                    />
                ))}
            </div>

            {/* RIGHT: Live receipt — updates instantly on every toggle */}
            <div className="w-full md:w-80 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
                    Current Session Bill
                </h4>

                <div className="flex-1 overflow-y-auto space-y-3">
                    {/* Empty state — shown until the first procedure is selected */}
                    {!hasItems && (
                        <p className="text-center text-zinc-500 dark:text-zinc-600 text-sm py-10">
                            No procedures selected yet.
                        </p>
                    )}

                    {/*
                     * Mirror the left panel's context grouping in the receipt.
                     * WHY: Matching the structure on both sides makes it easy for
                     * the clinician to verify they've logged the right procedure
                     * against the right complaint before submitting.
                     */}
                    {selectedContexts.map(ctx => {
                        const ctxItems = itemsForContext(ctx.id);
                        // Skip rendering a context group if nothing is selected under it yet
                        if (ctxItems.length === 0) return null;
                        return (
                            <div key={ctx.id} className="mb-4">
                                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase mb-1 truncate">
                                    {ctx.title}
                                </div>
                                {ctxItems.map(item => (
                                    <ReceiptItem key={`${item.contextId}-${item.procedureId}`} item={item} />
                                ))}
                            </div>
                        );
                    })}
                </div>

                {/* Footer: total + submit — pinned to the bottom of the receipt panel */}
                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-zinc-500 dark:text-zinc-400">Total</span>
                        <span className="text-2xl font-bold text-zinc-900 dark:text-white font-mono">
                            ₹{totalCost}
                        </span>
                    </div>
                    {/*
                     * Disabled until at least one procedure is selected.
                     * WHY: Prevents submitting an empty invoice which would create
                     * a confusing zero-cost record in the billing system.
                     */}
                    <button
                        onClick={() => onComplete(Object.values(items))}
                        disabled={!hasItems}
                        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-3 rounded hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                    >
                        Create Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProcedureLogger;