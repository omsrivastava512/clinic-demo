import { useState } from "preact/hooks";
import type { MedicalContext, Patient } from "@/types";
import { CheckIcon, PlusIcon } from "lucide-react";

/**
 * COMPONENT 2: CONTEXT SELECTOR
 * Handles the "Which problem?" logic.
 */
interface ContextSelectorProps {
    patient: Patient;
    availableContexts: MedicalContext[];
    onConfirm: (selectedIds: string[]) => void;
    onCancel: () => void;
}

const ContextSelector: React.FC<ContextSelectorProps> = ({ patient, availableContexts, onConfirm, onCancel }) => {
    const [selected, setSelected] = useState<string[]>([]);

    // Local state to manage newly created contexts
    const [customContexts, setCustomContexts] = useState<MedicalContext[]>([]);

    // State for the inline input
    const [newContextInput, setNewContextInput] = useState('');

    const toggleContext = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handleAddNewContext = () => {
        if (!newContextInput.trim()) return;

        const newCtx: MedicalContext = {
            id: `NEW_${Date.now()}`,
            title: newContextInput,
            isActive: true,
            type: 'NEW'
        };

        setCustomContexts(prev => [...prev, newCtx]);
        setSelected(prev => [...prev, newCtx.id]); // Auto-select the new one
        setNewContextInput(''); // Reset input
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddNewContext();
        }
    };

    // Combine props contexts with locally created ones
    const allContexts = [...availableContexts, ...customContexts];

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800  rounded-xl p-8 shadow-2xl transition-colors duration-300">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{patient.name}</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">MRN: {patient.mrn} • +91 {patient.phone}</p>
                </div>
                <div className="text-right text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    DETECTED PATIENT
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-4">Select Treatment Complaint</h3>
                <div className="space-y-3">
                    {/* List Existing & Added Contexts */}
                    {allContexts.map(ctx => {
                        const isSelected = selected.includes(ctx.id);
                        return (
                            <div
                                key={ctx.id}
                                onClick={() => toggleContext(ctx.id)}
                                className={`
                  flex items-center p-4 rounded-lg border cursor-pointer transition-all group
                  ${isSelected
                                        ? 'bg-zinc-100 border-zinc-900 dark:bg-zinc-900 dark:border-white'
                                        : 'bg-white border-zinc-200 dark:bg-black dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'}
                `}
                            >
                                <div className={`w-5 h-5 rounded flex items-center justify-center mr-4 transition-colors 
                  ${isSelected
                                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
                                        : 'border border-zinc-300 dark:border-zinc-600'}`}>
                                    {isSelected && <CheckIcon className="w-3 h-3" />}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-medium ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'}`}>
                                        {ctx.title}
                                    </div>
                                    {ctx.type === 'EXISTING' && (
                                        <div className="text-xs text-zinc-500 dark:text-zinc-600">{ctx.doctor} • Active Plan</div>
                                    )}
                                    {ctx.type === 'NEW' && (
                                        <div className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">New Issue Added</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* The "Report New Issue" Input Row */}
                    <div className="flex items-center p-4 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/30">
                        <PlusIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mr-4" />
                        <input
                            type="text"
                            value={newContextInput}
                            onChange={(e) => setNewContextInput((e.target as HTMLInputElement).value)}
                            onKeyDown={handleInputKeyDown}
                            placeholder="Report new issue (e.g. Knee Pain)..."
                            className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 font-medium"
                        />
                        <button type='button' title="Add New Patient"
                            onClick={handleAddNewContext}
                            disabled={!newContextInput.trim()}
                            className="p-2 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-900">
                <button onClick={onCancel} className="px-4 py-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Cancel</button>
                <button
                    onClick={() => onConfirm(selected)}
                    disabled={selected.length === 0}
                    className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue to Procedures →
                </button>
            </div>
        </div>
    );
};

export default ContextSelector