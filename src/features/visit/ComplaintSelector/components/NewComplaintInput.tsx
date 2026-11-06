import { forwardRef } from "react";
import { cn } from "@/lib";
import { Search } from "lucide-react";

interface NewComplaintInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick?: () => void;

  inputId?: string;
  listboxId?: string;
  popoverOpen?: boolean;
  focusedIndex?: number;
}

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
        "flex items-center px-3.5 py-2.5 rounded-xl border border-dashed cursor-text transition-colors duration-150",
        "border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/50",
        popoverOpen && "border-primary/60 bg-muted/40 ring-1 ring-primary/30"
      )}
    >
      <Search className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onClick={onClick}
        onBlur={onBlur}
        placeholder="Add or search complaint catalog (e.g. Cervical Spondylosis, Frozen Shoulder)..."
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={popoverOpen}
        aria-controls={popoverOpen && listboxId ? listboxId : undefined}
        aria-activedescendant={
          popoverOpen && listboxId && focusedIndex >= 0
            ? `${listboxId}-option-${focusedIndex}`
            : undefined
        }
        className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/60 text-xs font-medium"
      />
    </label>
  )
);

NewComplaintInput.displayName = "NewComplaintInput";
