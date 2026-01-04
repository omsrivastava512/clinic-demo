import {cn} from "@/utils";
import { SaveIcon } from "lucide-react";

export const CNBFooter = ({ handleSave }: { handleSave(): void }) => (
  <button
    type="button"
    onClick={handleSave}
    className={cn(
      "w-full py-3 bg-emerald-600",
      "hover:bg-emerald-700 dark:hover:bg-emerald-500",   // hover
      "text-white font-bold rounded-lg",    // font
      "flex items-center justify-center gap-2",   // flex
      "transition-all shadow-md active:scale-[0.98]"  // misc
    )}
  >
    <SaveIcon className="w-4 h-4" />
    Save Details
  </button>
)

