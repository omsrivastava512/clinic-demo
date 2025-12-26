import { SearchIcon } from "lucide-react"

type SearchInputProps = {
    input: string,
    isFocused: boolean,
    handleInputChange(e: React.KeyboardEvent<HTMLInputElement>): void,
    handleKeyNavigation(e: React.KeyboardEvent<HTMLInputElement>): void,
}

const SearchInput = ({ input, isFocused, handleInputChange, handleKeyNavigation }: SearchInputProps) => {
    return (
        <form role="search" className="mb-1 w-full rounded border border-black/25 dark:border-white/25 grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 items-center shadow-lg shadow-gray-500/70 dark:shadow-none">
            <div className="hidden md:block md:col-span-2 text-zinc-900 dark:text-white font-mono text-xs">Now</div>
            <div className="col-span-10 relative">
                <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <input
                    autoFocus
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyNavigation}
                    className="w-full bg-transparent border-none outline-none md:text-xl font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 pl-8"
                    placeholder="Type Name or Mobile..."
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
                    <span className="hidden lg:inline-block text-[10px] bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">{input.length < 3 ? "Start typing" : isFocused ? "Press ↑↓" : "↵ ENTER"}</span>
                </div>
            </div>
        </form>
    )
}

export default SearchInput