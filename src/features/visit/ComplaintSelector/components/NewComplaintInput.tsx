import { forwardRef } from "react";
import { cn } from "@/lib";
import { SearchIcon } from "lucide-react";

interface NewComplaintInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick?: () => void;

  // ARIA attributes lifted for accessibility (C3). We chose optional props with safe fallback values
  // to maintain backward compatibility in tests and prevent breaking other component consumers.
  inputId?: string;
  listboxId?: string;
  popoverOpen?: boolean;
  focusedIndex?: number;
}

// forwardRef so the parent can pass anchorRef to this element —
// the CatalogSearchPopover uses it to calculate its position.
export const NewComplaintInput = forwardRef<HTMLLabelElement, NewComplaintInputProps>(
  (
    {
      value,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      onClick,
      inputId = "new_complaint",
      listboxId,
      popoverOpen = false,
      focusedIndex = 0,
    },
    ref
  ) => (
    <label
      ref={ref}
      htmlFor={inputId}
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
        id={inputId}
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
        placeholder="Search complaints..."
        // C3 ARIA Attributes:
        // We bind role="combobox" and dynamic attributes via standard React props rather than imperative DOM mutation.
        // This ensures they stay in sync with the virtual DOM and are not overwritten during React reconciliation.
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={popoverOpen}
        aria-controls={popoverOpen && listboxId ? listboxId : undefined}
        aria-activedescendant={
          popoverOpen && listboxId && focusedIndex >= 0
            ? `${listboxId}-option-${focusedIndex}`
            : undefined
        }
        className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 font-medium text-sm"
      />
    </label>
  )
);

NewComplaintInput.displayName = "NewComplaintInput";