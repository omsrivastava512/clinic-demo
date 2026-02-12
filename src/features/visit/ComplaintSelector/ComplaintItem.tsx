import { cn } from "@/lib";
import { ComplaintMetadata } from "./primitives";
import { Checkbox } from "./primitives";
import type { MedicalComplaint } from "@/types";


export interface ComplaintItemProps {
    complaint: MedicalComplaint;
    isSelected: boolean;
    onToggle: (id: string) => void;
}


export const ComplaintItem: React.FC<ComplaintItemProps> = ({
    complaint, isSelected, onToggle,
}) => (
    <div
        onClick={() => onToggle(complaint.id)}
        className={cn(
            "flex items-center p-4 rounded-lg border cursor-pointer transition-all group",
            isSelected
                ? "bg-zinc-100 border-zinc-900 dark:bg-zinc-900 dark:border-white"
                : "bg-white border-zinc-200 dark:bg-black dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
        )}
    >
        <Checkbox isSelected={isSelected} />
        <div className="flex-1">
            <div
                className={cn(
                    "font-medium",
                    isSelected
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
                )}
            >
                {complaint.title}
            </div>
            <ComplaintMetadata complaint={complaint} />
        </div>
    </div>
);
