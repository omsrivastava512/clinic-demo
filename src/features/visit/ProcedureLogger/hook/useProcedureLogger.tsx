import { useCallback, useMemo, useState } from "react";
import type {  MedicalComplaint, Procedure } from "@/types";
import type { ProcedureToggler, IsProcedureSelected, ItemRecord } from "../types";

/**
 * Generates a composite key from a complaint ID and procedure ID.
 *
 * WHY: A single procedure (e.g. "Ultrasound") can be selected under multiple
 * complaints (e.g. "Left Knee" AND "Right Shoulder") independently. Using a
 * flat key like `ctxId-procId` lets us store all selections in one Record
 * while still distinguishing the same procedure across different complaints.
 */
const makeKey = (ctxId: string, procId: string) => `${ctxId}::${procId}`;

/**
 * useProcedureLogger
 *
 * Manages all state and derived data for the ProcedureLogger component.
 *
 * WHY a custom hook: The component tree needs several pieces of derived state
 * (isProcedureSelected, itemsForContext, totalCost) that would otherwise be computed
 * inline throughout the JSX, making it hard to read and test. Centralising
 * everything here keeps the component files focused purely on rendering.
 */
export function useProcedureLogger(selectedComplaints: MedicalComplaint[]) {
    const [items, setItems] = useState<ItemRecord>({});

    /**
     * Toggles a procedure on or off for a given complaint.
     * 
     * DEBT: (45:"Complaint Not Found") Gotta make it more robust so unknown complaints don't get billed
     */
    const toggleProcedure:ProcedureToggler = useCallback((ctxId: string, proc: Procedure) => {
        const key = makeKey(ctxId, proc.id);
        setItems(prev => {
            const next = { ...prev };
            if (next[key]) {
                delete next[key];
            } else {
                next[key] = {
                    procedureId: proc.id,
                    complaintId: ctxId,
                    name: proc.name,
                    complaintName: selectedComplaints.find(c => c.id === ctxId)?.title ?? "Complaint Not Found",
                    cost: proc.cost,
                };
            }
            return next;
        });
    },[selectedComplaints]);


    const clearAll = ()=>{
        setItems({})
    }

    /**
     * Returns true if the given procedure is currently selected under the given complaint.
     * Exposed as a function so child components don't need to know about the key format.
     */
    const isProcedureSelected: IsProcedureSelected =useCallback ((ctxId: string, procId: string) =>
        !!items[makeKey(ctxId, procId)],[items]);

    /**
     * Returns all selected items belonging to a specific complaint.
     * Used by the "receipt panel" to group line items under their complaint heading.
     */
    const getItemsForComplaint = (ctxId: string) =>
        Object.values(items).filter(i => i.complaintId === ctxId);

    /** Running total of all selected procedure costs, in rupees. */
    const totalCost = useMemo(() =>
        Object.values(items).reduce((s, it) => s + it.cost, 0), [items]);

    /** True when at least one procedure has been selected. Controls the submit button state. */
    const hasItems = Object.keys(items).length > 0;

    return { items, clearAll, toggleProcedure, isProcedureSelected, getItemsForComplaint, totalCost, hasItems };
}

