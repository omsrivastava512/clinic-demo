import { AlertTriangleIcon, PlusIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import type { ClinicalNote } from ".";
import { cn, filterAlphabetsAndNormalizeSpaces, filterAlphaNumeric } from "@/lib";


const initialNote:ClinicalNote = {
    category: '',
    observation: '',
    isCritical: false,
}

export const CNBInput = ({ insertNote }: { insertNote(n: ClinicalNote): Promise<boolean> }) => {
    const [newNote, setNewNote] = useState(initialNote);

    const handleNewKey = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.currentTarget.value;
        setNewNote(n => ({ ...n, category: filterAlphabetsAndNormalizeSpaces(raw) }))
    }
    const handleNewValue = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.currentTarget.value;
        setNewNote(n => ({ ...n, observation: filterAlphaNumeric(raw) }))
    }


    const handleAddNote = async () => {
        if (!newNote.category.trim() || !newNote.observation.trim()) return;

        const success = await insertNote(newNote)

        if (success) setNewNote(initialNote)
    };

    return (
        <div className="flex gap-2 mb-6 items-end">
            <div className="">
                <label className={labelStyles}>
                    Category
                </label>
                <input
                    type="text"
                    value={newNote.category}
                    onChange={handleNewKey}
                    placeholder="e.g. Diabetes, Weight, Thyroid, Allergy"
                    title="e.g. Diabetes, Weight, Thyroid, Allergy"
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
                onClick={() => setNewNote(n => ({ ...n, isCritical: !n.isCritical }))}
                title="Mark as Critical Issue"
                className={cn("p-2 rounded-lg border mb-px",
                    newNote.isCritical
                        ? 'bg-red-500 border-red-600 text-white shadow-sm'
                        : notCriticalStyles
                )}
            >
                <AlertTriangleIcon className="w-4 h-4" />
            </button>

            <button
                type="button" title="Add"
                onClick={handleAddNote}
                disabled={!newNote.category || !newNote.observation}
                className={cn(
                    "p-2 mb-px bg-zinc-900 dark:bg-white",
                    "text-white dark:text-black rounded-lg",
                    "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
                    "active:bg-zinc-700 dark:active:bg-zinc-300"
                )}
            >
                <PlusIcon className="w-4 h-4" />
            </button>
        </div>
    )
}



const inputStyles = cn(
    "w-full bg-zinc-50 dark:bg-zinc-900/50",    // bg
    "border border-zinc-200 dark:border-zinc-800 rounded-lg",   // border
    "px-3 py-2 text-sm text-zinc-900 dark:text-white",    // pad, text
    "focus:border-zinc-400 dark:focus:border-zinc-600",   // focus:border
    "focus:bg-white dark:focus:bg-zinc-900",    // focus:bg
    "placeholder-zinc-400 dark:placeholder-zinc-600"  // placeholder
)

const labelStyles = cn(
    "text-xs font-bold",
    "text-zinc-500 dark:text-zinc-400",
    "uppercase tracking-widest mb-1.5 block"
)

const notCriticalStyles = cn(
    "bg-zinc-50 dark:bg-zinc-900",    // bg
    "border-zinc-200 dark:border-zinc-800",   // border
    "text-zinc-400 dark:text-zinc-500",   // text
    "hover:border-zinc-400 dark:hover:border-zinc-600"  // hover
)


