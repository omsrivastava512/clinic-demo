import { MOCK_LEDGER_ENTRIES } from "@/data/mock_data"
import { cn, compTime } from "@/lib"
import TableRow from "./TableRow"
import PatientSearch from "./PatientSearch"
import { useRef, useEffect } from "react"


const TableBody = () => {
    const listContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (listContainerRef.current) {
            // This scrolls the container to its absolute bottom — always lands on last entry
            listContainerRef.current.scrollTop = listContainerRef.current.scrollHeight;

            listContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, []); //DEBT: add re-run whenever entries change

    const END_OF_LIST_HEIGHT = 49;
    const snapBackTimer = useRef<number | undefined>(undefined);

    const handleScroll = () => {
        const el = listContainerRef.current;
        if (!el) return;

        // How far has the user scrolled into the "End of list" zone?
        const normalBottom = el.scrollHeight - el.clientHeight - END_OF_LIST_HEIGHT;
        const overscrollAmount = el.scrollTop - normalBottom;

        if (overscrollAmount > 0) {
            // User is revealing the "End of list" div — start the snap-back timer
            clearTimeout(snapBackTimer.current);
            snapBackTimer.current = setTimeout(() => {
                el.scrollTo({
                    top: normalBottom,
                    behavior: 'smooth' 
                });
            }, 200); // let them read "End of list" for 200ms before snapping back
        }
    };


    return (
        <>
            <div ref={listContainerRef} onScroll={handleScroll} className="flex-1 z-50 overflow-y-auto flex flex-col">
                {/* Dynamic Rows */}
                {MOCK_LEDGER_ENTRIES
                    .sort((a, b) => compTime(a.time, b.time))
                    .map((entry) => (
                        <TableRow entry={entry} />
                    ))
                }
                <div className={cn(
                    "px-4 py-3 text-center",    // space
                    "border-b border-zinc-100 dark:border-zinc-900",    // border
                    "bg-zinc-300/50 dark:bg-zinc-700/50",    // bg
                    "text-zinc-700/50 dark:text-zinc-300/50"    // text
                )}>
                    End of the list
                </div>

                <PatientSearch />
            </div>
        </>
    )
}

export default TableBody
