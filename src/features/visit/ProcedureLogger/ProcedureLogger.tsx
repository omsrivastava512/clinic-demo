import { useState } from "react";
import type { InvoiceItem, MedicalContext, Procedure } from "@/types";
import { PHYSIO_PROCEDURES } from "@/data/mock_data";
import { CheckIcon } from "lucide-react";

/**
 * COMPONENT 3: PROCEDURE LOGGER (The Many-to-Many Solver)
 * Renders a procedure grid for EACH selected context.
 */
interface ProcedureLoggerProps {
    selectedContexts: MedicalContext[]; // Only the ones selected in Step 2
    onComplete: (items: InvoiceItem[]) => void;
}

const ProcedureLogger: React.FC<ProcedureLoggerProps> = ({ selectedContexts, onComplete }) => {
    // Store items flatly, but UI groups them. 
    // State structure: { 'CTX_01-PROC_01': { ...item } } for easy toggle
    const [items, setItems] = useState<Record<string, InvoiceItem>>({});

    const toggleProcedure = (ctx: MedicalContext, proc: Procedure) => {
        const key = `${ctx.id}-${proc.id}`;

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
                    cost: proc.cost
                };
            }
            return next;
        });
    };

    const totalCost = Object.values(items).reduce((sum, item) => sum + item.cost, 0);

    return (
        <div className="w-full md:flex overflow-y-scroll md:flex-row gap-6 h-150 transition-colors duration-300">

            {/* LEFT: Scrollable Procedure Selection Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-8 h-full ">

                {/* Iterate over EACH context to create a scoped selection zone */}
                {selectedContexts.map((ctx, index) => (
                    <div key={ctx.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>

                        {/* Context Header */}
                        <div className="flex items-center gap-3 mb-4 sticky top-0 bg-zinc-50/95 dark:bg-black/95 backdrop-blur py-2 z-10 border-b border-zinc-200 dark:border-zinc-900">
                            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700">
                                {index + 1}
                            </div>
                            <div>
                                <h3 className="text-zinc-900 dark:text-white font-bold">{ctx.title}</h3>
                                <p className="text-xs text-zinc-500">Select procedures for this specific area</p>
                            </div>
                        </div>

                        {/* Grid for THIS Context */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4 border-l-2 border-zinc-300 dark:border-zinc-800">
                            {PHYSIO_PROCEDURES.map(proc => {
                                const isSelected = !!items[`${ctx.id}-${proc.id}`];
                                return (
                                    <button
                                        key={proc.id}
                                        onClick={() => toggleProcedure(ctx, proc)}
                                        className={`
                      text-left p-3 rounded-md border transition-all flex justify-between items-start
                      ${isSelected
                                                ? 'bg-zinc-100 border-zinc-900 text-zinc-900 dark:bg-zinc-900 dark:border-white dark:text-white shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                                : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:bg-zinc-900/50'}
                    `}
                                    >
                                        <div>
                                            <div className="font-medium text-sm">{proc.name}</div>
                                            <div className="text-[10px] font-mono mt-1 opacity-60">₹{proc.cost}</div>
                                        </div>
                                        {isSelected && <CheckIcon className="w-4 h-4 text-zinc-900 dark:text-white" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: Live Basket / Summary */}
            <div className="w-full md:w-80 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col ">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Current Session Bill</h4>

                <div className="flex-1 overflow-y-auto space-y-3">
                    {Object.keys(items).length === 0 && (
                        <div className="text-center text-zinc-500 dark:text-zinc-600 text-sm py-10">No procedures selected yet.</div>
                    )}

                    {/* Group items visually by context in the receipt too */}
                    {selectedContexts.map(ctx => {
                        const ctxItems = Object.values(items).filter(i => i.contextId === ctx.id);
                        if (ctxItems.length === 0) return null;
                        return (
                            <div key={ctx.id} className="mb-4">
                                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase mb-1 truncate">{ctx.title}</div>
                                {ctxItems.map(item => (
                                    <div key={`${item.contextId}-${item.procedureId}`} className="flex justify-between text-sm py-1 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                                        <span className="text-zinc-700 dark:text-zinc-300 truncate pr-2">{item.name}</span>
                                        <span className="font-mono text-zinc-500">₹{item.cost}</span>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-zinc-500 dark:text-zinc-400">Total</span>
                        <span className="text-2xl font-bold text-zinc-900 dark:text-white font-mono">₹{totalCost}</span>
                    </div>
                    <button
                        onClick={() => onComplete(Object.values(items))}
                        disabled={Object.keys(items).length === 0}
                        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-3 rounded hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                    >
                        Create Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProcedureLogger