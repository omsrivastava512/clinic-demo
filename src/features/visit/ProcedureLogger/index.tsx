
import type { InvoiceItem, MedicalComplaint } from "@/types";
import { useProcedureLogger } from "./hook/useProcedureLogger.tsx";
import { RecieptFooter } from "./components/RecieptFooter.tsx";
import { ComplaintSection } from "./components/ComplaintSection.tsx";
import { ReceiptList } from "./components/ReceiptList.tsx";
import type { ItemRecord } from "./types.tsx";
import ProcedureHeader from "./components/ProcedureHeader.tsx";
import { ProcedureBodyLayout, RightLayout } from "./components/primitives.tsx";

const validateInvoiceItems = (items: ItemRecord, selectedComplaints: MedicalComplaint[]) => {
    const selectedIds = new Set(selectedComplaints.map(c => c.id));

    return Object.values(items).filter(
        item => selectedIds.has(item.complaintId))
}

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
        <div className="h-[90dvh] flex flex-col">
            <ProcedureHeader
                complaintList={selectedComplaints.map(c => c.title)}
                patientName="Amit Trivedi"
            />
            <ProcedureBodyLayout
            >
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
                <RightLayout
                   
                >
                    <ReceiptList
                        hasItems={hasItems}
                        selectedComplaints={selectedComplaints}
                        getItemsForComplaint={getItemsForComplaint}
                    />
                    {/* Footer: total + submit — pinned to the bottom of the receipt panel */}
                    <RecieptFooter
                        totalCost={totalCost}
                        onComplete={() => onComplete(validateInvoiceItems(items, selectedComplaints))}
                        isDisabled={!hasItems}
                    />
                </RightLayout>
            </ProcedureBodyLayout>
        </div>
    );
};

export default ProcedureLogger;

