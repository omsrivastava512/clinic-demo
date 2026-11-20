import { useRef } from "react";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LedgerEntry } from "@/types";

type VisitFilterControlsProps = {
    visitQuery: string;
    status: LedgerEntry["status"] | "all";
    hasFilters: boolean;
    matchCount: number;
    totalCount: number;
    onChange(nextQuery: string, nextStatus: LedgerEntry["status"] | "all"): void;
};

const VisitFilterControls = ({ visitQuery, status, hasFilters, matchCount, totalCount, onChange }: VisitFilterControlsProps) => {
    const visitFilterRef = useRef<HTMLInputElement>(null);

    const handleClearFilters = () => {
        onChange("", "all");
        visitFilterRef.current?.focus();
    };

    const clearFiltersButton = hasFilters && (
        <Button
            type="button"
            variant="ghost"
            onClick={handleClearFilters}
        >
            Clear filters
        </Button>
    );

    return (
        <>
            <span role="status" className="sr-only text-sm text-zinc-600 sm:not-sr-only sm:mt-2.5 dark:text-zinc-300">
                {hasFilters && `${matchCount} of ${totalCount} visits`}
            </span>
            <div role="group" aria-label="Filter today's visits" className="ml-auto flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 sm:w-[21.5rem] sm:flex-none md:w-auto md:flex-nowrap">
                {hasFilters && <div className="hidden md:block">{clearFiltersButton}</div>}
                <Select value={status} onValueChange={value => value && onChange(visitQuery, value)}>
                    <SelectTrigger aria-label="Filter visits by status" className="w-28 shrink-0 bg-white pl-1.5 data-[size=default]:h-10 sm:w-36 sm:pl-2.5 dark:bg-zinc-900">
                        <SelectValue>{status === "all" ? "All statuses" : status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start">
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                    </SelectContent>
                </Select>
                <div className="relative min-w-0 flex-1 sm:w-48 sm:flex-none">
                    <ListFilter aria-hidden="true" className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-zinc-500 max-[360px]:left-1 max-[360px]:size-3 dark:text-zinc-400" />
                    <Input
                        ref={visitFilterRef}
                        type="search"
                        aria-label="Filter visits by patient name or complaint"
                        placeholder="Filter visits"
                        className="h-10 bg-white pr-2.5 pl-8 max-[360px]:pr-1 max-[360px]:pl-4.5 max-[360px]:placeholder:text-xs dark:bg-zinc-900"
                        value={visitQuery}
                        onChange={event => onChange(event.target.value, status)}
                    />
                </div>
                {hasFilters && <div className="basis-full md:hidden">{clearFiltersButton}</div>}
            </div>
        </>
    );
};

export default VisitFilterControls;
