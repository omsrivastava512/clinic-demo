import { cn } from "@/lib";
import { CheckIcon } from "lucide-react";
import type { MedicalComplaint } from "@/types";


export const Checkbox: React.FC<{ isSelected: boolean }> = ({ isSelected }) => (
  <div
    className={cn(
      "w-5 h-5 flex items-center justify-center mr-4 rounded",
      isSelected
        ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
        : "border border-zinc-300 dark:border-zinc-600"
    )}
  >
    {isSelected && <CheckIcon className="w-3 h-3" />}
  </div>
);

export const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wide">
    {text}
  </p>
);


export const ComplaintMetadata: React.FC<{ complaint: MedicalComplaint; }> = ({
  complaint,
}) => {
  if (complaint.type === "EXISTING") {
    return (
      <div className="text-xs text-zinc-500 dark:text-zinc-600">
        {complaint.doctor} • Active Plan
      </div>
    );
  }
  if (complaint.type === "NEW") {
    return (
      <div className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">
        New Issue Added
      </div>
    );
  }
  return null;
};
