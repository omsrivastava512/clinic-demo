import {cn} from "@/lib";
import type { ReactNode } from "react";

/** Wrapper Components */
export const DropdownContainer = ({ children, placement }: { children: ReactNode; placement: "above" | "below"; }) => (
    <div className={cn(
        "absolute inset-x-0 flex max-h-75 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40",
        placement === "above" ? "top-full mt-2" : "bottom-full mx-4 mb-2",
    )}>
        {children}
    </div>
);


export const DropdownHeader = ({ count }: { count: number }) => (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-800/60">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">Patient directory</span>
        {count > 0 && (
            <span role="status" className="text-xs text-zinc-600 tabular-nums dark:text-zinc-400">
                {count} {count === 1 ? "match" : "matches"}
            </span>
        )}
    </div>
);



type ListItemButtonProps = {
    children: ReactNode;
    id: string;
    isSelected: boolean;
    onSelect(): void;
    variant: "normal" | "add";
};
export const ListItemButton = ({ children, id, isSelected, onSelect, variant, }: ListItemButtonProps) => {
    return (
        <button
            id={id}
            type="button"
            role="option"
            aria-selected={isSelected}
            tabIndex={-1}
            onMouseDown={event => event.preventDefault()}
            onClick={onSelect}
            data-selected={isSelected}
            className={cn(
                "flex min-h-12 w-full cursor-pointer items-center gap-3 px-3 py-2 text-left text-zinc-950 transition-colors focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-inset focus-visible:outline-none dark:text-zinc-50",
                variant === "normal" && "justify-between not-last:border-b not-last:border-zinc-100 dark:not-last:border-zinc-800",
                variant === "add" && "shrink-0 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/60",
                isSelected
                    ? "bg-zinc-100 ring-1 ring-zinc-400 ring-inset dark:bg-zinc-800 dark:ring-zinc-500"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800",
                variant === "add" && !isSelected && "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
        >
            {children}
        </button>
    );
};
