import { useState } from "react";
import type { InvoiceItem, MedicalComplaint, Procedure } from "@/types";

/**
 * Generates a composite key from a context ID and procedure ID.
 *
 * WHY: A single procedure (e.g. "Ultrasound") can be selected under multiple
 * contexts (e.g. "Left Knee" AND "Right Shoulder") independently. Using a
 * flat key like `ctxId-procId` lets us store all selections in one Record
 * while still distinguishing the same procedure across different contexts.
 */
const makeKey = (ctxId: string, procId: string) => `${ctxId}-${procId}`;

/**
 * useProcedureLogger
 *
 * Manages all state and derived data for the ProcedureLogger component.
 *
 * WHY a custom hook: The component tree needs several pieces of derived state
 * (isSelected, itemsForContext, totalCost) that would otherwise be computed
 * inline throughout the JSX, making it hard to read and test. Centralising
 * everything here keeps the component files focused purely on rendering.
 *
 * SHAPE OF `items`:
 *   A flat Record keyed by `ctxId-procId` strings. Flat storage is simpler to
 *   update (single setState call per toggle) while the UI groups by context at
 *   render time — no need for a nested data structure.
 */
export function useProcedureLogger() {
    const [items, setItems] = useState<Record<string, InvoiceItem>>({});

    /**
     * Toggles a procedure on or off for a given context.
     */
    const toggleProcedure = (ctx: MedicalComplaint, proc: Procedure) => {
        const key = makeKey(ctx.id, proc.id);
        setItems(prev => {
            const next = { ...prev };
            if (next[key]) {
                delete next[key];
            } else {
                next[key] = {
                    procedureId: proc.id,
                    contextId: ctx.id,
                    name: proc.name,
                    contextName: ctx.title,
                    cost: proc.cost,
                };
            }
            return next;
        });
    };

    /**
     * Returns true if the given procedure is currently selected under the given context.
     * Exposed as a function so child components don't need to know about the key format.
     */
    const isSelected = (ctxId: string, procId: string) =>
        !!items[makeKey(ctxId, procId)];

    /**
     * Returns all selected items belonging to a specific context.
     * Used by the "receipt panel" to group line items under their context heading.
     */
    const itemsForContext = (ctxId: string) =>
        Object.values(items).filter(i => i.contextId === ctxId);

    /** Running total of all selected procedure costs, in rupees. */
    const totalCost = Object.values(items).reduce((sum, i) => sum + i.cost, 0);

    /** True when at least one procedure has been selected. Controls the submit button state. */
    const hasItems = Object.keys(items).length > 0;

    return { items, toggleProcedure, isSelected, itemsForContext, totalCost, hasItems };
}