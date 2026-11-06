import { cn } from "@/lib";
import { SearchIcon } from "lucide-react";

type SearchInputProps = {
    input: string;
    isFocused: boolean;
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    handleKeyNavigation(e: React.KeyboardEvent<HTMLInputElement>): void;
};

const SearchInput = ({ input, isFocused, handleInputChange, handleKeyNavigation }: SearchInputProps) => {
    return (
        <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className={cn(
                "mb-2 w-full rounded-2xl",
                "border border-zinc-200 dark:border-zinc-800",
                "grid grid-cols-12 gap-3 px-5 py-3.5 items-center",
                "bg-white dark:bg-zinc-900/80 shadow-xs",
                "focus-within:border-zinc-400 dark:focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-zinc-400/10",
                "transition-all duration-150"
            )}
        >
            <div className="hidden md:block md:col-span-2 text-zinc-900 dark:text-zinc-200 font-mono text-xs font-semibold">
                Now
            </div>
            <div className="col-span-12 md:col-span-10 relative flex items-center">
                <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
                <input
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyNavigation}
                    className="w-full bg-transparent border-none outline-none pl-7 pr-24 text-base md:text-lg font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    placeholder="Type Name or Mobile..."
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-1.5">
                    <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 rounded-md border border-zinc-200 dark:border-zinc-700/80">
                        {input.length === 0 ? "Start typing" : input.length < 3 ? "Keep typing" : isFocused ? "Press ↑↓" : "↵ ENTER"}
                    </span>
                </div>
            </div>
        </form>
    );
};

export default SearchInput;
