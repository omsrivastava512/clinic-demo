import { cn } from "@/lib";

export const CNBFooter = ({ handleSave }: { handleSave(): void }) => (
  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
    <button
      type="button"
      onClick={handleSave}
      className={cn(
        "px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer",
        "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900",
        "hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs active:scale-[0.985]"
      )}
    >
      Save Notes
    </button>
  </div>
);
