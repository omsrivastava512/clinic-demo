import { MOCK_LEDGER_ENTRIES } from "@/data/mock_data"
import { cn, compTime } from "@/lib"
import TableRow from "./TableRow"
import PatientSearch from "./PatientSearch"
import { useRef, useEffect } from "react"


const TableBody = () => {
    const listContainerRef = useRef<HTMLDivElement>(null);
    const END_OF_LIST_HEIGHT = 49; // Height of the "End of the list" marker used for scroll snap calculations
    const snapBackTimer = useRef<number | undefined>(undefined);

    // Mount handler: scrolls the list to the absolute bottom (scrollHeight) to trigger the initial
    // overscroll snapback intro, and brings the ledger viewport into the screen frame.
    useEffect(() => {
        if (listContainerRef.current) {
            listContainerRef.current.scrollTop = listContainerRef.current.scrollHeight;
            listContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, []);

    // Dynamic scroll tracking: when new entries are added, smoothly auto-scrolls the container to
    // the bottom, provided the user is already looking at the bottom (within a 150px threshold).
    const entriesLength = MOCK_LEDGER_ENTRIES.length;
    useEffect(() => {
        const el = listContainerRef.current;
        if (!el) return;

        const normalBottom = el.scrollHeight - el.clientHeight - END_OF_LIST_HEIGHT;
        const THRESHOLD = 150; // px threshold from bottom boundary
        const distanceToBottom = normalBottom - el.scrollTop;
        const isNearBottom = distanceToBottom < THRESHOLD;

        if (isNearBottom) {
            el.scrollTo({
                top: normalBottom,
                behavior: "smooth"
            });
        }
    }, [entriesLength]);

    // Overscroll check: if user scrolls past normalBottom to reveal the bottom marker,
    // schedules a smooth scroll transition to hide it behind the search bar after 200ms.
    const handleScroll = () => {
        const el = listContainerRef.current;
        if (!el) return;

        const normalBottom = el.scrollHeight - el.clientHeight - END_OF_LIST_HEIGHT;
        const overscrollAmount = el.scrollTop - normalBottom;

        if (overscrollAmount > 0) {
            clearTimeout(snapBackTimer.current);
            snapBackTimer.current = setTimeout(() => {
                el.scrollTo({
                    top: normalBottom,
                    behavior: 'smooth'
                });
            }, 200);
        }
    };

    return (
        <>
            <div
                ref={listContainerRef}
                onScroll={handleScroll}
                className="flex-1 z-50 overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {/* Visual marker and line divider representing the start of chronological records */}
                <Divider text="Start of the list" />

                {/* Ledger timeline list mapped chronologically (oldest at the top, newest at the bottom) */}
                {MOCK_LEDGER_ENTRIES
                    .sort((a, b) => compTime(a.time, b.time))
                    .map((entry) => (
                        <TableRow key={entry.id} entry={entry} />
                    ))
                }

                {/* Symmetrical timeline bottom divider; remains hidden behind the search bar by default */}
                <Divider text="End of the list" containerClassName="border-b border-zinc-100 dark:border-zinc-900" textClassName="text-zinc-700/50 dark:text-zinc-300/50" />

                {/* Sticky quick search and rapid-entry row docked at the bottom */}
                <PatientSearch />
            </div>
        </>
    )
}

export default TableBody

type DividerProps = {
    text: string;
    containerClassName?: string;
    textClassName?: string;
    lineClassName?: string;
}

const Divider = ({ text, containerClassName, textClassName, lineClassName }: DividerProps) => {
    return (
        <div className={cn(
            "flex items-center justify-center gap-3 px-6 py-4", containerClassName
        )}>
            <div className={cn(
                "h-[1px] flex-1 bg-zinc-200/80 dark:bg-zinc-800/50", lineClassName
            )} />
            <span className={cn(
                "text-xs font-medium uppercase tracking-wider text-zinc-400/80 dark:text-zinc-600", textClassName
            )}>
                {text}
            </span>
            <div className={cn(
                "h-[1px] flex-1 bg-zinc-200/80 dark:bg-zinc-800/50", lineClassName
            )} />
        </div>
    )
}