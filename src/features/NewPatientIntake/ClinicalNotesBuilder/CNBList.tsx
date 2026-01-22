import { AlertTriangleIcon, Trash2Icon } from "lucide-react"
import type { ClinicalNote } from "."
import { cn } from "@/utils"


type CNBListProps = {
    notes: ClinicalNote[],
    removeNote(k: string): void
}
export const CNBList = ({ notes, removeNote }: CNBListProps) => {
    return (
        <div
            className={cn(
                "space-y-2", // vertical rhythm
                "max-h-[200px] overflow-y-auto", // scroll container
                "mb-6", // external spacing
                "scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800" // scrollbar styling
            )}
        >
            {(notes).length === 0 && (
                <div
                    className={cn(
                        "text-center text-xs italic", // typography
                        "text-zinc-400 dark:text-zinc-600", // text color
                        "py-4", // internal spacing
                        "border border-dashed rounded-lg", // container chrome
                        "border-zinc-200 dark:border-zinc-800" // border color
                    )}
                >
                    No additional details added yet.
                </div>
            )}
            {(notes).map(({ category, isCritical, observation }) => (
                <div
                    key={category}
                    className={cn(
                        "flex items-center justify-between p-3 rounded-lg border",// layout & spacing
                        "group transition-colors",// interaction
                        // state: critical vs normal
                        isCritical
                            ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50" // critical emphasis
                            : "bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800" // neutral state
                    )}

                >
                    <div className="flex items-center gap-2 text-sm">
                        {isCritical && (
                            <AlertTriangleIcon className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0" />
                        )}
                        <span className={`font-bold ${isCritical ? 'text-red-700 dark:text-red-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
                            {category}:
                        </span>
                        <span className={`text-zinc-900 dark:text-white ${isCritical ? 'font-medium' : ''}`}>
                            {observation}
                        </span>
                    </div>
                    <button onClick={() => removeNote(category)} title="delete" type="button"
                        className={cn(
                            "text-zinc-400", // base color
                            "hover:text-red-600 dark:hover:text-red-400", // hover intent
                            "active:text-red-600 dark:active:text-red-400", // hover intent
                            "transition-colors", // color animation
                            "opacity-100 lg:opacity-0 lg:group-hover:opacity-100" // responsive visibility
                        )}
                    >
                        <Trash2Icon className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>)
}

