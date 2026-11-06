import { AlertTriangleIcon, PlusIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import type { ClinicalNote } from "..";
import { cn, filterAlphabetsAndNormalizeSpaces, filterAlphaNumeric } from "@/lib";

const initialNote: ClinicalNote = {
    category: '',
    observation: '',
    isCritical: false,
};

export const CNBInput = ({ insertNote }: { insertNote(n: ClinicalNote): Promise<boolean> }) => {
    const [newNote, setNewNote] = useState(initialNote);

    const handleNewKey = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.currentTarget.value;
        setNewNote(n => ({ ...n, category: filterAlphabetsAndNormalizeSpaces(raw) }));
    };
    const handleNewValue = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.currentTarget.value;
        setNewNote(n => ({ ...n, observation: filterAlphaNumeric(raw) }));
    };

    const handleAddNote = async () => {
        if (!newNote.category.trim() || !newNote.observation.trim()) return;
        const success = await insertNote(newNote);
        if (success) setNewNote(initialNote);
    };

    return (
        <div className="flex gap-2.5 mb-6 items-end">
            <div className="w-1/2">
                <label className={labelStyles}>
                    Category
                </label>
                <input
                    type="text"
                    value={newNote.category}
                    onChange={handleNewKey}
                    placeholder="e.g. Diabetes, Allergy"
                    title="e.g. Diabetes, Allergy"
                    className={inputStyles}
                />
            </div>

            <div className="flex-1">
                <label className={labelStyles}>
                    Observation
                </label>
                <input
                    type="text"
                    value={newNote.observation}
                    onChange={handleNewValue}
                    placeholder="e.g. High, 75, Low"
                    title="e.g. High, 75, Low"
                    className={inputStyles}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                />
            </div>

            {/* Critical Toggle Button */}
            <button
                type="button"
                onClick={() => setNewNote(n => ({ ...n, isCritical: !n.isCritical }))}
                title="Mark as Critical Issue"
                className={cn(
                    "p-2.5 rounded-xl border mb-px transition-all cursor-pointer",
                    newNote.isCritical
                        ? 'bg-rose-500 border-rose-600 text-white shadow-xs'
                        : notCriticalStyles
                )}
            >
                <AlertTriangleIcon className="w-4 h-4" />
            </button>

            <button
                type="button"
                title="Add"
                onClick={handleAddNote}
                disabled={!newNote.category || !newNote.observation}
                className={cn(
                    "p-2.5 mb-px rounded-xl transition-all cursor-pointer",
                    "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs",
                    "hover:bg-zinc-800 dark:hover:bg-zinc-100",
                    "disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                )}
            >
                <PlusIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

const inputStyles = cn(
    "w-full bg-zinc-50 dark:bg-zinc-900/60",
    "border border-zinc-200 dark:border-zinc-800 rounded-xl",
    "px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white font-medium",
    "focus:border-zinc-400 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-900",
    "placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-colors"
);

const labelStyles = cn(
    "text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block"
);

const notCriticalStyles = cn(
    "bg-zinc-50 dark:bg-zinc-900",
    "border-zinc-200 dark:border-zinc-800",
    "text-zinc-400 dark:text-zinc-500",
    "hover:border-zinc-400 dark:hover:border-zinc-600"
);
