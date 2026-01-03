import {cn} from "@/utils";
import type { ComponentChild as ReactNode } from "preact";

/** Wrapper Components */
export const DropdownContainer = ({ children }: { children: ReactNode; }) => (
    <div className={cn(
        "absolute bottom-full left-0 right-0 mx-4 mb-2",  // position
        "bg-zinc-200 dark:bg-zinc-900",  // bg
        "outline outline-zinc-600 dark:outline-zinc-400 rounded-lg",  // outline
        "max-h-[300px] flex flex-col", // flex
        "shadow-lg shadow-gray-700/50 dark:shadow-gray-400/50"  // shadow
    )}>
        {children}
    </div>
);


export const DropdownHeader = ({ count }: { count: number }) => (
    <div className={cn(
        "px-4 py-2 w-full",  // box
        "bg-gray-100 dark:bg-zinc-950",  // bg
        "border-b border-zinc-200 dark:border-zinc-800",  // border
        "text-[10px] font-bold text-zinc-500 uppercase tracking-widest"  // text
    )}>
        Search Results ({count})
    </div>
);



type ListItemButtonProps = {
    children: ReactNode;
    isSelected: boolean;
    onSelect(): void;
    variant: "normal" | "add";
};
export const ListItemButton = ({ children, isSelected, onSelect, variant, }: ListItemButtonProps) => {
    const clss = {
        base: 'w-full text-left px-4 py-3 hover:bg-zinc-300 dark:hover:bg-zinc-700 border-zinc-100 dark:border-zinc-800 flex items-center transition-colors cursor-pointer',
        selected: '!bg-zinc-300 dark:!bg-zinc-700 !text-black dark:!text-white',
        normal: "border-b hover:text-black dark:hover:text-white justify-between",
        add: "border-t text-black dark:text-white gap-3 bg-gray-50 dark:bg-zinc-950"
    };

    return (
        <button
            onClick={onSelect}
            // use group-data-[selected=true]:_class_here_ to generate styles in children
            className={`${clss.base} ${clss[variant]} ${isSelected && clss.selected} group`}
        >
            {children}
        </button>
    );
};
