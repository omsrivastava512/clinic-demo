
import type { InvoiceItem, MedicalComplaint } from "@/types";
import { useProcedureLogger } from "./hook/useProcedureLogger.tsx";
import { RecieptFooter } from "./components/primitives.tsx";
import { ComplaintSection } from "./components/ComplaintSection.tsx";
import { ReceiptList } from "./components/ReceiptList.tsx";



// ─── ProcedureLogger ───────────────────────────────────────────────────────────
//
// The top-level component for Step 3 of the invoice flow.
//
// LAYOUT: Two-column on md+ screens:
//   LEFT  — Scrollable list of ComplaintSections (one per selected complaint)
//   RIGHT — Fixed-width live receipt panel that updates as procedures are toggled
//
// The component itself holds no logic — everything is delegated to useProcedureLogger.
// This keeps the JSX readable and makes the business logic independently testable.

interface ProcedureLoggerProps {
    /** The subset of MedicalComplaints the user confirmed in Step 2. */
    selectedComplaints: MedicalComplaint[];
    /** Called with the final flat list of InvoiceItems when the user clicks "Create Invoice". */
    onComplete: (items: InvoiceItem[]) => void;
}

const ProcedureLogger: React.FC<ProcedureLoggerProps> = ({ selectedComplaints, onComplete }) => {
    const { items, toggleProcedure, isProcedureSelected, getItemsForComplaint, totalCost, hasItems } =
        useProcedureLogger(selectedComplaints);

    return (
        <div className="w-full md:flex overflow-y-scroll md:flex-row gap-6 h-lvh py-4 transition-colors duration-300">

            {/* LEFT: Scrollable procedure selection — one section per complaint */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-8 h-full">
                {selectedComplaints.map((ctx, index) => (
                    <ComplaintSection
                        key={ctx.id}
                        ctx={ctx}
                        index={index}
                        isSelected={isProcedureSelected}
                        onToggle={toggleProcedure}
                    />
                ))}
            </div>

            {/* RIGHT: Live receipt — updates instantly on every toggle */}
            <div className="w-full md:w-80 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col">
                <ReceiptList
                    hasItems={hasItems}
                    selectedComplaints={selectedComplaints}
                    getItemsForComplaint={getItemsForComplaint}
                />
                {/* Footer: total + submit — pinned to the bottom of the receipt panel */}
                <RecieptFooter
                    totalCost={totalCost}
                    onComplete={() => onComplete(Object.values(items))}
                    isDisabled={!hasItems}
                />
            </div>
        </div>
    );
};

export default ProcedureLogger;