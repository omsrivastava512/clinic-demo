import { useState } from "react";
import type { MedicalComplaint, Patient } from "@/types";
import { CheckIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib";

/**
 * COMPONENT 2: CONTEXT SELECTOR
 * Handles the "Which problem?" logic.
 */
interface ComplaintSelectorProps {
    patient: Patient;
    availableComplaints: MedicalComplaint[];
    onConfirm: (selectedIds: string[]) => void;
    onCancel: () => void;
}

export const ComplaintSelector: React.FC<ComplaintSelectorProps> = ({ patient, availableComplaints, onConfirm, onCancel }) => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleCancel = () =>{
        setSelected([])
        onCancel()
    }
    // Local state to manage newly created contexts
    const [customComplaints, setCustomComplaints] = useState<MedicalComplaint[]>([]);

    // State for the inline input
    const [newComplaintInput, setNewComplaintInput] = useState('');

    const toggleComplaint = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handleAddNewComplaint = () => {
        if (!newComplaintInput.trim()) return;

        const newCtx: MedicalComplaint = {
            id: `NEW_${Date.now()}`,
            title: newComplaintInput,
            isActive: true,
            type: 'NEW'
        };

        setCustomComplaints(prev => [...prev, newCtx]);
        setSelected(prev => [...prev, newCtx.id]); // Auto-select the new one
        setNewComplaintInput(''); // Reset input
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddNewComplaint();
        }
    };

    // Combine props contexts with locally created ones
    const allComplaints = [...availableComplaints, ...customComplaints];

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800  rounded-xl p-8 shadow-2xl transition-colors duration-300">

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{patient.name}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium mt-1">Returning Patient • Last visit: 14 days ago</p>
                </div>
                <div className="text-right text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="text-xs font-mono text-zinc-500 block">MRN-9921</span>
                    <span className="text-xs font-mono text-zinc-500 block">DOB: 12/04/1985</span>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wide">Select Visit Complaint (Multiple Selection Allowed)</p>

                <div className="space-y-3">
                    {/* List Existing & Added Complaints */}
                    {allComplaints.map(ctx => {
                        const isSelected = selected.includes(ctx.id);
                        return (
                            <div
                                key={ctx.id}
                                onClick={() => toggleComplaint(ctx.id)}
                                className={cn(
                                    "flex items-center", // layout + alignment
                                    "p-4 rounded-lg border", // spacing + shape + base border
                                    "cursor-pointer transition-all group", // interaction + animation + group context
                                    isSelected
                                        ? cn(
                                            "bg-zinc-100 border-zinc-900", // selected background + border
                                            "dark:bg-zinc-900 dark:border-white" // selected (dark mode)
                                        )
                                        : cn(
                                            "bg-white border-zinc-200", // unselected background + border
                                            "dark:bg-black dark:border-zinc-800", // unselected (dark mode)
                                            "hover:border-zinc-400 dark:hover:border-zinc-600" // unselected hover
                                        )
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-5 h-5", // size
                                        "flex items-center justify-center", // layout + alignment
                                        "mr-4 rounded", // spacing, shape
                                        isSelected
                                            ? cn(
                                                "bg-zinc-900 text-white", // selected background + text
                                                "dark:bg-white dark:text-black" // selected (dark mode)
                                            )
                                            : cn(
                                                "border border-zinc-300", // unselected border
                                                "dark:border-zinc-600" // unselected (dark mode)
                                            )
                                    )}

                                >
                                    {isSelected && <CheckIcon className="w-3 h-3" />}
                                </div>
                                <div className="flex-1">
                                    <div
                                        className={cn(
                                            "font-medium",
                                            isSelected
                                                ? "text-zinc-900 dark:text-white"
                                                : cn(
                                                    "text-zinc-600 dark:text-zinc-400",
                                                    "group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
                                                )
                                        )}
                                    >
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
                    {/* // TODO: sanitize and capitalize text (Created on 2026-01-07) */}
                    <label
                        htmlFor="new_complaint"
                        className={cn(
                            "flex items-center p-4 rounded-lg border-2 border-dashed",
                            "border-zinc-300 dark:border-zinc-700",
                            "bg-zinc-50 dark:bg-zinc-900/30 cursor-text",
                            "hover:border-zinc-600 dark:hover:border-zinc-400",
                            "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                            "focus-within:border-zinc-600 dark:focus-within:border-zinc-400",
                        )}
                    >
                        <PlusIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mr-4" />
                        <input
                            id="new_complaint"
                            type="text"
                            value={newComplaintInput}
                            onChange={(e) => setNewComplaintInput(e.currentTarget.value)}
                            onKeyDown={handleInputKeyDown}
                            placeholder="Report new issue (e.g. Knee Pain)..."
                            className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 font-medium"
                        />
                        <button type='button' title="Add New Patient"
                            onClick={handleAddNewComplaint}
                            disabled={!newComplaintInput.trim()}
                            className={cn(
                                "p-2 rounded", // spacing + shape
                                "bg-zinc-200 dark:bg-zinc-800", // background
                                "hover:bg-zinc-300 dark:hover:bg-zinc-700", // hover background
                                "text-zinc-600 dark:text-zinc-300", // text color
                                "disabled:opacity-50", // disabled state
                            )}
                        >
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </label>

                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-900">
                <button onClick={handleCancel}
                    className={cn(
                        "px-4 py-2", // spacing
                        "text-zinc-500 dark:text-zinc-400", // base text color
                        "hover:text-zinc-900 dark:hover:text-white", // hover text color
                    )}
                >
                    Cancel
                </button>
                <button
                    onClick={() => onConfirm(selected)}
                    disabled={selected.length === 0}
                    className={cn(
                        "px-6 py-2", // spacing
                        "bg-zinc-900 dark:bg-white", // background
                        "text-white dark:text-black", // text color
                        "font-bold rounded ", // typography and shape
                        "hover:bg-zinc-700 dark:hover:bg-zinc-200", // hover background
                        "disabled:opacity-50 " // disabled state
                    )}
                >
                    Continue to Procedures →
                </button>
            </div>
        </div>
    );
};

export default ComplaintSelector