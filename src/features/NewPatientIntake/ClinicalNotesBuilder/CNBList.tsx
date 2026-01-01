import { AlertTriangleIcon, Trash2Icon } from "lucide-react"
import type { ClinicalNotes } from "."


type CNBListProps = {
    notes: ClinicalNotes,
    removeNote(k: string): void
}
export const CNBList = ({ notes, removeNote }: CNBListProps) => {
    return (
        <div className="space-y-2 max-h-[200px] overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
            {Object.entries(notes).length === 0 && (
                <div className="text-center text-zinc-400 dark:text-zinc-600 text-xs italic py-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                    No additional details added yet.
                </div>
            )}
            {Object.entries(notes).map(([key, data]) => (
                <div
                    key={key}
                    className={`flex items-center justify-between p-3 rounded-lg border group transition-colors ${data.isCritical
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                        : 'bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800'
                        }`}
                >
                    <div className="flex items-center gap-2 text-sm">
                        {data.isCritical && (
                            <AlertTriangleIcon className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0" />
                        )}
                        <span className={`font-bold ${data.isCritical ? 'text-red-700 dark:text-red-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
                            {key}:
                        </span>
                        <span className={`text-zinc-900 dark:text-white ${data.isCritical ? 'font-medium' : ''}`}>
                            {data.value}
                        </span>
                    </div>
                    <button onClick={() => removeNote(key)} title="delete" type="button"
                        className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                        <Trash2Icon className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>)
}

