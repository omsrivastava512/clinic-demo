import { cn } from "@/lib";
import type { ReactNode } from "react";

/** Wrapper Components */
export const DropdownContainer = ({ children }: { children: ReactNode; }) => (
    <div className={cn(
        "absolute bottom-full left-0 right-0 mx-3 mb-2",
        "bg-popover text-popover-foreground",
        "border border-border rounded-xl",
        "max-h-80 flex flex-col overflow-hidden",
        "shadow-xl dark:shadow-2xl z-40 backdrop-blur-md"
    )}>
        {children}
    </div>
);

export const DropdownHeader = ({ count }: { count: number }) => (
    <div className={cn(
        "px-4 py-2 w-full",
        "bg-muted/40",
        "border-b border-border/80",
        "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
    )}>
        Patient Matches ({count})
    </div>
);

type ListItemButtonProps = {
    children: ReactNode;
    isSelected: boolean;
    onSelect(): void;
    variant: "normal" | "add";
};

export const ListItemButton = ({ children, isSelected, onSelect, variant }: ListItemButtonProps) => {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "w-full text-left px-4 py-2.5 flex items-center transition-colors duration-150 cursor-pointer outline-none select-none",
                variant === "normal" && "border-b border-border/40 justify-between",
                variant === "add" && "border-t border-border/80 bg-muted/20 gap-3",
                isSelected
                    ? "bg-muted text-foreground"
                    : "hover:bg-muted/60 text-foreground/90"
            )}
        >
            {children}
        </button>
    );
};
