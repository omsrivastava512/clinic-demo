import type { ComponentChild as ReactNode } from "preact";

/** Wrapper Components */
export const DropdownContainer = ({ children }: { children: ReactNode; }) => (
    <div className="absolute z-100 bottom-full left-0 right-0 mx-4 mb-2 bg-zinc-200 dark:bg-zinc-900 border outline-1 outline-zinc-200 dark:outline-zinc-700 rounded-lg shadow-2xl max-h-[300px] flex flex-col ">
        {children}
    </div>
);


export const DropdownHeader = ({ count }: { count: number }) => (
    <div className="px-4 py-2 w-full  bg-gray-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
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
