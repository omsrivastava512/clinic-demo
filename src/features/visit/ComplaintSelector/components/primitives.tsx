import { cn } from "@/lib";
import { CheckIcon } from "lucide-react";
import type { MedicalComplaint } from "@/types";

export const Checkbox: React.FC<{ isSelected: boolean }> = ({ isSelected }) => (
  <div
    className={cn(
      "w-5 h-5 flex items-center justify-center mr-4 rounded-md transition-all duration-150 shrink-0",
      isSelected
        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs"
        : "border border-zinc-300 dark:border-zinc-700 bg-transparent"
    )}
  >
    {isSelected && <CheckIcon className="w-3.5 h-3.5" />}
  </div>
);

export const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-3 font-semibold uppercase tracking-wider">
    {text}
  </p>
);

export const ComplaintMetadata: React.FC<{ complaint: MedicalComplaint; }> = ({
  complaint,
}) => {
  if (complaint.type === "EXISTING") {
    return (
      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
        {complaint.doctor} • Active Plan
      </div>
    );
  }
  if (complaint.type === "NEW") {
    return (
      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
        New Issue Added
      </div>
    );
  }
  return null;
};
