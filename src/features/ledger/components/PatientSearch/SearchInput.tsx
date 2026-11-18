import { cn } from "@/lib"
import { SearchIcon } from "lucide-react"

type SearchInputProps = {
    input: string,
    isFocused: boolean,
    placement: "above" | "below",
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void,
    handleKeyNavigation(e: React.KeyboardEvent<HTMLInputElement>): void,
}

const SearchInput = ({ input, isFocused, placement, handleInputChange, handleKeyNavigation }: SearchInputProps) => {
    const inToolbar = placement === "above";
    return (
        <form role="search"
            onSubmit={e=>e.preventDefault()}
            className={inToolbar ? "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900" : cn(
                "mb-1 w-full rounded ", // box
                "outline outline-zinc-600/50 dark:outline-zinc-400/50", // outline
                "grid grid-cols-12 gap-4 px-6 py-4 items-center", // grid
                "bg-zinc-50 dark:bg-zinc-900/50",  // bg
                " shadow-lg shadow-gray-600/50"  // shadow
            )}>
            {!inToolbar && <div className={cn(
                "hidden md:block md:col-span-2",    // grid
                "text-zinc-900 dark:text-white", // color
                "font-mono text-xs"  // font
            )}>
                Now
            </div>}
            <div className="col-span-10 relative">
                <SearchIcon className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2",  // postion
                    inToolbar ? "size-4 text-zinc-600 dark:text-zinc-300" : "w-4 h-4 text-zinc-400 dark:text-zinc-500"
                )} />
                <input
                    // TODO: Uncomment when moving to production
                    // autoFocus
                    value={input}
                    aria-label={inToolbar ? "Search patients by name or mobile" : undefined}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyNavigation}
                    className={cn(
                        "w-full bg-transparent border-none outline-none pl-8",  // box
                        "md:text-xl font-medium text-zinc-900 dark:text-white",  // font
                        "placeholder-zinc-400 dark:placeholder-zinc-600",
                        inToolbar && "md:text-base placeholder:text-zinc-600 dark:placeholder:text-zinc-300"
                    )}
                    placeholder={inToolbar ? "Search by name or mobile" : "Type Name or Mobile..."}
                />
                {!inToolbar && <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
                    <span className={cn(
                        "hidden lg:inline-block",  // display
                        "text-xs text-zinc-500 dark:text-zinc-400",  // font
                        "px-1.5 py-0.5  bg-white dark:bg-zinc-800",  // bg + padding
                        "rounded border border-zinc-200 dark:border-zinc-700"  // border
                    )}>
                        {input.length === 0 ? "Start typing" : input.length < 3 ? "Keep typing" : isFocused ? "Press ↑↓" : "↵ ENTER"}
                    </span>
                </div>}
            </div>
        </form>
    )
}

export default SearchInput
