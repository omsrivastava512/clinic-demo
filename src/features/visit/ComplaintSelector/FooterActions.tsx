import { cn } from "@/lib";

interface FooterActionsProps {
  onCancel: () => void;
  onConfirm: () => void;
  isConfirmDisabled: boolean;
}

export const FooterActions: React.FC<FooterActionsProps> = ({
  onCancel,
  onConfirm,
  isConfirmDisabled,
}) => (
  <div className="flex justify-end gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-900">
    <button
      onClick={onCancel}
      className="px-4 py-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
    >
      Cancel
    </button>
    <button
      onClick={onConfirm}
      disabled={isConfirmDisabled}
      className={cn(
        "px-6 py-2 font-bold rounded",
        "bg-zinc-900 dark:bg-white text-white dark:text-black",
        "hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50"
      )}
    >
      Continue to Procedures →
    </button>
  </div>
);