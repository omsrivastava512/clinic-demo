import { cn } from "@/lib";
import { ComplaintMetadata } from "./primitives";
import { Checkbox } from "./primitives";
import type { MedicalComplaint } from "@/types";
import { XIcon } from "lucide-react";

export interface ComplaintItemProps {
    complaint: MedicalComplaint;
    isSelected: boolean;
    onToggle: (id: string) => void;
    remove(i: string): void;
}

export const ComplaintItem: React.FC<ComplaintItemProps> = ({
    complaint, isSelected, onToggle, remove
}) => (
    <div
        onClick={() => onToggle(complaint.id)}
        className={cn(
            "flex items-center px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-150 group",
            isSelected
                ? "bg-zinc-100 border-zinc-900 dark:bg-zinc-900 dark:border-white shadow-xs"
                : "bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
        )}
    >
        <Checkbox isSelected={isSelected} />
        <div className="flex-1">
            <div
                className={cn(
                    "font-semibold text-sm transition-colors",
                    isSelected
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white"
                )}
            >
                {complaint.title}
            </div>
            <ComplaintMetadata complaint={complaint} />
        </div>
        {complaint.type === "NEW" && (
            <button
                type="button"
                title="Delete"
                onClick={(e) => {
                    e.stopPropagation();
                    remove(complaint.id);
                }}
                className="hidden group-hover:block p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
                <XIcon className="w-4 h-4" />
            </button>
        )}
    </div>
);

export default ComplaintItem;
