import type { MedicalComplaint } from "@/types";
import { ReceiptItem } from "./primitives";
import type { GetItemsForComplaint } from "../types";

type ReciptListProps = {
    hasItems: boolean;
    selectedComplaints: MedicalComplaint[];
    getItemsForComplaint: GetItemsForComplaint;
};

export const ReceiptList = ({ hasItems, selectedComplaints, getItemsForComplaint }: ReciptListProps) => (
    <>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/60">
            <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Current Session Bill
            </h4>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* Empty state — shown until the first procedure is selected */}
            {!hasItems && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-xs text-muted-foreground">
                        No procedures selected yet.
                    </p>
                    <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                        Choose procedures from the left panel.
                    </p>
                </div>
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
                    <div key={ctx.id} className="rounded-lg bg-muted/30 border border-border/40 p-2.5">
                        <div className="text-[10px] text-primary font-semibold uppercase tracking-wider mb-1.5 truncate">
                            {ctx.title}
                        </div>
                        <div className="space-y-0.5">
                            {ctxItems.map(item => (
                                <ReceiptItem key={`${item.complaintId}-${item.procedureId}`} item={item} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    </>
);
