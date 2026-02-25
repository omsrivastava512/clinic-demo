import type { MedicalComplaint } from "@/types";
import { ReceiptItem } from "./primitives";
import type { GetItemsForComplaint } from "../types";

type ReciptListProps = {
    hasItems: boolean;
    selectedComplaints: MedicalComplaint[];
    getItemsForComplaint:GetItemsForComplaint

};
export const ReceiptList = ({ hasItems, selectedComplaints, getItemsForComplaint, }: ReciptListProps) => (
    <>
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
            Current Session Bill
        </h3>

        <div className="flex-1 overflow-y-auto space-y-3">
            {/* Empty state — shown until the first procedure is selected */}
            {!hasItems && (
                <p className="text-center text-zinc-500 dark:text-zinc-600 text-sm py-10">
                    No procedures selected yet.
                </p>
            )}

            {/*
                 * Mirror the left panel's complaint grouping in the receipt.
                 * WHY: Matching the structure on both sides makes it easy for
                 * the clinician to verify they've logged the right procedure
                 * against the right complaint before submitting.
                 */}
            {selectedComplaints.map(ctx => {
                const ctxItems = getItemsForComplaint(ctx.id);
                // Skip rendering a complaint group if nothing is selected under it yet
                if (ctxItems.length === 0) return null;
                return (
                    <div key={ctx.id} className="mb-4">
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase mb-1 truncate">
                            {ctx.title}
                        </div>
                        {ctxItems.map(item => (
                            <ReceiptItem key={`${item.complaintId}-${item.procedureId}`} item={item} />
                        ))}
                    </div>
                );
            })}
        </div>

    </>
);
