import {cn} from "@/utils"
import { SearchIcon } from "lucide-react"

type SearchInputProps = {
    input: string,
    isFocused: boolean,
    handleInputChange(e: React.KeyboardEvent<HTMLInputElement>): void,
    handleKeyNavigation(e: React.KeyboardEvent<HTMLInputElement>): void,
}

const SearchInput = ({ input, isFocused, handleInputChange, handleKeyNavigation }: SearchInputProps) => {
    return (
        <form role="search" className={cn(
            "mb-1 w-full rounded ", // box
            "outline outline-zinc-600/50 dark:outline-zinc-400/50", // outline
            "grid grid-cols-12 gap-4 px-6 py-4 items-center", // grid
            "bg-zinc-50 dark:bg-zinc-900/50",  // bg
            " shadow-lg shadow-gray-600/50"  // shadow
        )}>
            <div className={cn(
                "hidden md:block md:col-span-2",    // grid
                "text-zinc-900 dark:text-white", // color
                "font-mono text-xs"  // font
            )}>
                Now
            </div>
            <div className="col-span-10 relative">
                <SearchIcon className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2",  // postion
                    "w-4 h-4 text-zinc-400 dark:text-zinc-500"  // style
                )} />
                <input
                    autoFocus
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyNavigation}
                    className={cn(
                        "w-full bg-transparent border-none outline-none pl-8",  // box
                        "md:text-xl font-medium text-zinc-900 dark:text-white",  // font
                        "placeholder-zinc-400 dark:placeholder-zinc-600"  // placeholder
                    )}
                    placeholder="Type Name or Mobile..."
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
                    <span className={cn(
                        "hidden lg:inline-block",  // display
                        "text-xs text-zinc-500 dark:text-zinc-400",  // font
                        "px-1.5 py-0.5  bg-white dark:bg-zinc-800",  // bg + padding
                        "rounded border border-zinc-200 dark:border-zinc-700"  // border
                    )}>
                        {input.length < 3 ? "Start typing" : isFocused ? "Press ↑↓" : "↵ ENTER"}
                    </span>
                </div>
            </div>
        </form>
    )
}

export default SearchInput