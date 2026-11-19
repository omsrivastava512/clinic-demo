import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { calcMin12H, cn, compTime, min12HToTime } from "@/lib";
import type { LedgerEntry } from "@/types";

const VisitTimeline = ({ entries, filters, hasFilters }: { entries: LedgerEntry[]; filters: ReactNode; hasFilters: boolean }) => {
    const jumpTarget = useRef<HTMLElement | null>(null);
    const visitsByHour = new Map<number, LedgerEntry[]>();

    for (const entry of [...entries].sort((a, b) => compTime(b.time, a.time))) {
        const hour = Math.floor(calcMin12H(entry.time) / 60) * 60;
        const visits = visitsByHour.get(hour);
        if (visits) {
            visits.push(entry);
        } else {
            visitsByHour.set(hour, [entry]);
        }
    }

    const hourGroups = Array.from(visitsByHour, ([hour, visits]) => ({
        id: `timeline-hour-${hour}`,
        label: min12HToTime(hour).replace(":00", ""),
        visits,
        countLabel: `${visits.length} ${visits.length === 1 ? "visit" : "visits"}`,
    }));

    const finishJump = (open: boolean) => {
        if (open || !jumpTarget.current) return;
        const heading = jumpTarget.current;
        jumpTarget.current = null;
        heading.focus({ preventScroll: true });
        heading.scrollIntoView({
            block: "start",
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
    };

    return (
        <div>
            <div className="sticky top-0 z-20 mb-3 flex items-start gap-2 bg-zinc-100 py-2 dark:bg-zinc-950">
                <DropdownMenu modal={false} onOpenChangeComplete={finishJump}>
                    <DropdownMenuTrigger aria-label="Jump to hour" disabled={entries.length === 0} render={<Button variant="outline" className="h-10 shrink-0 px-2 sm:px-3" />}>
                        <span>Jump<span className="hidden sm:inline"> to hour</span></span>
                        <ChevronDown aria-hidden="true" className="text-zinc-500 dark:text-zinc-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-44">
                        {hourGroups.map(({ id, label, countLabel }) => (
                            <DropdownMenuItem key={id} className="min-h-9 justify-between px-2" onClick={() => {
                                jumpTarget.current = document.getElementById(id);
                            }}>
                                <span>{label}</span>
                                <span className="text-xs text-muted-foreground">{countLabel}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {filters}
            </div>
            {entries.length === 0 && <p className="text-sm text-zinc-600 dark:text-zinc-300">No visits match these filters.</p>}
            {hourGroups.map(({ id: hourId, label, visits, countLabel }) => (
                <section key={hourId} aria-labelledby={hourId} className="not-last:mb-6 sm:grid sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-4">
                    <h2 id={hourId} tabIndex={-1} className={cn(
                        "mb-2 scroll-mt-20 rounded-sm text-sm font-semibold text-stone-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-500 sm:mb-0 sm:mt-4 sm:self-start dark:text-zinc-300",
                        hasFilters && "max-md:scroll-mt-28"
                    )}>
                        {label}
                        <span className="block text-xs font-normal text-stone-600 dark:text-zinc-400">{countLabel}</span>
                    </h2>
                    <ul className="grid grid-cols-1 gap-2 border-l border-stone-300 pl-3 sm:grid-cols-2 sm:pl-4 dark:border-zinc-700">
                        {visits.map(({ id, time, patientName, treatment, status, patientId }) => (
                            <li key={id} className="rounded-lg border border-stone-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-1.5 flex items-center justify-between gap-2">
                                    <span className="text-xs font-medium text-stone-600 tabular-nums dark:text-zinc-300">{time}</span>
                                    <span className={cn(
                                        "rounded-full px-2 py-0.5 text-xs font-medium",
                                        status === "Paid"
                                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                                            : "bg-stone-100 text-stone-700 dark:bg-zinc-800 dark:text-zinc-200"
                                    )}>{status}</span>
                                </div>
                                <Link to={`/patient/${patientId}`} className="inline-flex items-center gap-1.5 rounded-sm font-semibold outline-none hover:underline focus-visible:ring-2 focus-visible:ring-stone-500">
                                    {patientName}
                                    <ArrowUpRight aria-hidden="true" className="size-3.5 text-stone-500 dark:text-zinc-300" />
                                </Link>
                                <p className="mt-0.5 text-sm text-stone-600 dark:text-zinc-300">{treatment}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
};

export default VisitTimeline;
