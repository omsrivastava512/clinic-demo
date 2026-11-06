import { AlertTriangle, Trash2 } from "lucide-react";
import type { ClinicalNote } from "..";
import { cn } from "@/lib";

type CNBListProps = {
    notes: ClinicalNote[];
    removeNote(k: string): void;
};

export const CNBList = ({ notes, removeNote }: CNBListProps) => {
    return (
        <div
            className={cn(
                "space-y-2",
                "max-h-52 overflow-y-auto",
                "mb-5 pr-1",
                "no-scrollbar"
            )}
        >
            {notes.length === 0 && (
                <div
                    className={cn(
                        "text-center text-xs",
                        "text-muted-foreground",
                        "py-5 rounded-lg border border-dashed border-border/80 bg-muted/20"
                    )}
                >
                    No clinical observations or notes recorded yet.
                </div>
            )}
            {notes.map(({ category, isCritical, observation }) => (
                <div
                    key={category}
                    className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg border text-xs",
                        "group transition-colors",
                        isCritical
                            ? "bg-destructive/10 border-destructive/25 text-foreground"
                            : "bg-muted/40 border-border/80 text-foreground"
                    )}
                >
                    <div className="flex items-center gap-2 min-w-0">
                        {isCritical && (
                            <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />
                        )}
                        <span className={cn(
                            "font-semibold truncate",
                            isCritical ? "text-destructive" : "text-foreground"
                        )}>
                            {category}:
                        </span>
                        <span className="text-muted-foreground truncate">
                            {observation}
                        </span>
                    </div>
                    <button
                        onClick={() => removeNote(category)}
                        title="Delete note"
                        type="button"
                        className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors cursor-pointer shrink-0 ml-2"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
        </div>
    );
};
