import { PHYSIO_PROCEDURES } from "@/data/mock_data";
import { ProcedureCard, SearchMoreProcedures, StickySectionHeader } from "./primitives";
import type { MedicalComplaint } from "@/types";
import type { IsProcedureSelected, ProcedureToggler } from "../types";


// ─── ComplaintSection ────────────────────────────────────────────────────────────
// Renders one "zone" of procedure selection scoped to a single MedicalComplaint.
// Each complaint gets its own sticky header and a 2-column grid of ProcedureCards.
export interface ComplaintSectionProps {
    ctx: MedicalComplaint;
    /** Zero-based position in the selectedComplaints array — used for the index badge and stagger delay. */
    index: number;
    isSelected: IsProcedureSelected
    onToggle: ProcedureToggler
}

/**
 * Each section fades in with a small stagger so the UI feels responsive
 * when complaints are first rendered, rather than everything appearing at once.
 */
export const ANIMATION_STEP_MS = 100;
export const ComplaintSection: React.FC<ComplaintSectionProps> = ({ ctx, index, isSelected, onToggle }) => (
    <div className="animate-fadeIn" style={{ animationDelay: `${index * ANIMATION_STEP_MS}ms` }}>

        {/* Sticky complaint header — stays visible while scrolling through its procedure grid */}
        <StickySectionHeader index={index} title={ctx.title} />

        {/* Procedure grid — left-indented and bordered to visually "belong" to the header above */}
        <ProcedureGrid isSelected={isSelected} ctxId={ctx.id} onToggle={onToggle} />
    </div>
);

type ProcedureGridProps = {
    isSelected: IsProcedureSelected;
    onToggle: ProcedureToggler
    ctxId: MedicalComplaint['id']
}
const ProcedureGrid = ({ isSelected, ctxId, onToggle }: ProcedureGridProps) => (
    <>
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Common Procedures</h3>
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4 border-l-2 border-zinc-300 dark:border-zinc-800">

            {PHYSIO_PROCEDURES.slice(0).map(proc => (
                <ProcedureCard
                    key={proc.id}
                    proc={proc}
                    selected={isSelected(ctxId, proc.id)}
                    // Bind both ctxId and proc here so ProcedureCard only needs a zero-arg onToggle
                    onToggle={() => onToggle(ctxId, proc)} />
            ))}

            <SearchMoreProcedures />
        </div>
    </>
)
