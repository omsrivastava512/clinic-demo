import { cn } from "@/lib";
import { TagIcon, XIcon } from "lucide-react";

export const CNBHeader = ({ onClose }: { onClose(): void }) => (
  <div className={cn(
    "px-6 py-4",
    "border-b border-zinc-200 dark:border-zinc-800",
    "bg-zinc-50 dark:bg-zinc-950",
    "flex justify-between items-center"
  )}>
    <h3 className={cn(
      "text-base font-bold text-zinc-900 dark:text-white tracking-tight",
      "flex items-center gap-2.5"
    )}>
      <TagIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
      Clinical Notes
    </h3>
    <button
      type="button"
      title="Close"
      onClick={onClose}
      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
    >
      <XIcon className="w-4 h-4" />
    </button>
  </div>
);
