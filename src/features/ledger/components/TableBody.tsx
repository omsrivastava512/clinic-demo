import { MOCK_LEDGER_ENTRIES } from "@/data/mock_data"
import { cn, compTime } from "@/lib"
import TableRow from "./TableRow"
import PatientSearch from "./PatientSearch"
import { useRef, useEffect } from "react"


const TableBody = () => {
    const listContainerRef = useRef<HTMLDivElement>(null);
    const END_OF_LIST_HEIGHT = 49; // Height of the bottom marker for snap-back boundary checks
    const snapBackTimer = useRef<number | undefined>(undefined);

    // Mount handler: sets initial scroll to the absolute bottom (0 in flex-col-reverse)
    // to trigger the overscroll snapback and auto-hide the bottom marker on initial load.
    // Viewport-level scrollIntoView is completely avoided to prevent window jumping.
    useEffect(() => {
        if (listContainerRef.current) {
            listContainerRef.current.scrollTop = 0;
        }
    }, []);

    // Dynamic scroll tracking: when new entries are added, smoothly auto-scrolls the container to
    // the resting bottom (scrollTop = -49px) to keep the bottom marker hidden.
    const entriesLength = MOCK_LEDGER_ENTRIES.length;
    useEffect(() => {
        const el = listContainerRef.current;
        if (!el) return;

        const restingBottom = -END_OF_LIST_HEIGHT;
        const THRESHOLD = 150; // px threshold from bottom boundary
        const distanceToBottom = el.scrollTop - restingBottom;
        const isNearBottom = distanceToBottom > -THRESHOLD;

        if (isNearBottom) {
            el.scrollTo({
                top: restingBottom,
                behavior: "smooth"
            });
        }
    }, [entriesLength]);

    // Overscroll check: if user scrolls past restingBottom (towards 0), schedules
    // a smooth scroll snapback to hide the bottom marker behind the search bar after 200ms.
    const handleScroll = () => {
        const el = listContainerRef.current;
        if (!el) return;

        const restingBottom = -END_OF_LIST_HEIGHT;
        const overscrollAmount = el.scrollTop - restingBottom;

        if (overscrollAmount > 0) {
            clearTimeout(snapBackTimer.current);
            snapBackTimer.current = setTimeout(() => {
                el.scrollTo({
                    top: restingBottom,
                    behavior: 'smooth'
                });
            }, 200);
        }
    };

    return (
        <>
            <div className="flex-1 z-50 flex flex-col min-h-0">
                <div
                    ref={listContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto flex flex-col-reverse [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {/* End of list divider placed first in col-reverse DOM (renders at the visual bottom) */}
                    <Divider 
                        text="End of the list" 
                        containerClassName="border-b border-zinc-100 dark:border-zinc-900" 
                        textClassName="text-zinc-700/50 dark:text-zinc-300/50" 
                    />

                    {/* Mapped entries in reverse order: col-reverse visualizes chronological oldest-to-newest top-to-bottom */}
                    {MOCK_LEDGER_ENTRIES
                        .sort((a, b) => compTime(b.time, a.time))
                        .map((entry) => (
                            <TableRow key={entry.id} entry={entry} />
                        ))
                    }

                    {/* Start of list divider placed last in col-reverse DOM (renders at the visual top) */}
                    <Divider text="Start of the list" />
                </div>

                {/* Sticky search input docked cleanly outside the scrollable area */}
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