import {cn} from "@/utils";
import { TagIcon, XIcon } from "lucide-react";

// TODO: Add help icon and tooltip for example notes (Created on 2026-01-23)

export const CNBHeader = ({ onClose }: { onClose(): void }) => (
  <div className={
    cn(
      "px-6 py-4",
      "border-b border-zinc-200 dark:border-zinc-900",  // border
      "bg-zinc-50 dark:bg-zinc-950",    // bg
      "flex justify-between items-center "  // flex
    )}>
    <h3 className={cn(
      "text-lg font-bold text-zinc-900 dark:text-white",  // font
      "flex items-center gap-2"   // flex
    )}>
      <TagIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
      Clinical Notes
    </h3>
    <button type="button" title="Close" onClick={onClose}
      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
    >
      <XIcon className="w-5 h-5" />
    </button>
  </div>
)
