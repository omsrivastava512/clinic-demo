import { forwardRef } from "react";
import { cn } from "@/lib";
import { PlusIcon, SearchIcon } from "lucide-react";

interface NewComplaintInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick?: () => void;
}

// forwardRef so the parent can pass anchorRef to this element —
// the CatalogSearchPopover uses it to calculate its position.
export const NewComplaintInput = forwardRef<HTMLLabelElement, NewComplaintInputProps>(
  ({ value, onChange, onKeyDown, onAdd, onFocus, onBlur, onClick }, ref) => (
    <label
      ref={ref}
      htmlFor="new_complaint"
      className={cn(
        "flex items-center px-4 py-3 rounded-lg border-2 border-dashed cursor-text",
        "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/30",
        "hover:border-zinc-600 dark:hover:border-zinc-400",
        "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
        // When the popover is open the input is focused — highlight the border
        "focus-within:border-zinc-600 dark:focus-within:border-zinc-400"
      )}
    >
      {/* Use SearchIcon instead of PlusIcon to signal "search catalog" intent */}
      <SearchIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mr-4 shrink-0" />
      <input
        id="new_complaint"
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onClick={onClick}
        // onBlur fires before the popover's onMouseDown can capture the click,
        // so we intentionally do NOT close the popover here — the popover's own
        // click-outside detector handles that correctly.
        onBlur={onBlur}
        placeholder="Search or add new complaint..."
        className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 font-medium text-sm"
      />
      <button
        type="button"
        title="Add New Complaint"
        onClick={onAdd}
        disabled={!value.trim()}
        className={cn(
          "p-2 rounded bg-zinc-200 dark:bg-zinc-800",
          "hover:bg-zinc-300 dark:hover:bg-zinc-700",
          "text-zinc-600 dark:text-zinc-300 disabled:opacity-50"
        )}
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </label>
  )
);

NewComplaintInput.displayName = "NewComplaintInput";