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
  <div className="flex h-fit bg-transparent justify-end gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
    <button
      type="button"
      onClick={onCancel}
      className="px-4 py-2.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
    >
      Cancel
    </button>
    <button
      type="button"
      onClick={onConfirm}
      disabled={isConfirmDisabled}
      className={cn(
        "px-6 py-2.5 font-bold text-xs rounded-xl shadow-xs transition-all active:scale-[0.985] cursor-pointer",
        "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900",
        "hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
      )}
    >
      Continue to Procedures →
    </button>
  </div>
);

export default FooterActions;
