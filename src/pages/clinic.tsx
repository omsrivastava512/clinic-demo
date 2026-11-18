import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_LEDGER_ENTRIES } from "@/data/mock_data";
import LedgerHeader from "@/features/ledger/components/LedgerHeader";
import PatientSearch from "@/features/ledger/components/PatientSearch";
import TableBody from "@/features/ledger/components/TableBody";
import TableHeader from "@/features/ledger/components/TableHeader";
import VisitTimeline from "@/features/ledger/components/VisitTimeline";
import { cn } from "@/lib";
import type { LedgerEntry } from "@/types";

const viewTabClassName = "px-3 dark:data-active:border-transparent dark:data-active:bg-zinc-700 group-data-[variant=default]/tabs-list:data-active:shadow-none";

const Clinic = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [visitQuery, setVisitQuery] = useState("");
    const [status, setStatus] = useState<LedgerEntry["status"] | "all">("all");
    const view = searchParams.get("view") === "table" ? "table" : "timeline";
    const query = visitQuery.trim().toLowerCase();
    const entries = MOCK_LEDGER_ENTRIES.filter(visit =>
        (visit.patientName.toLowerCase().includes(query) || visit.treatment.toLowerCase().includes(query)) &&
        (status === "all" || visit.status === status)
    );
    const hasFilters = query !== "" || status !== "all";

    const changeView = (value: string | number | null) => {
        const params = new URLSearchParams(searchParams);
        if (value === "table") {
            params.set("view", "table");
        } else {
            params.delete("view");
        }
        setSearchParams(params, { replace: true });
    };

    const filters = (
        <>
            <span role="status" className="sr-only text-sm text-zinc-600 sm:not-sr-only dark:text-zinc-300">
                {hasFilters && `${entries.length} of ${MOCK_LEDGER_ENTRIES.length} visits`}
            </span>
            <div role="group" aria-label="Filter today's visits" className="ml-auto flex min-w-0 flex-1 items-center gap-2 sm:flex-none">
                <Select value={status} onValueChange={value => value && setStatus(value)}>
                    <SelectTrigger aria-label="Filter visits by status" className="w-28 shrink-0 bg-white pl-1.5 data-[size=default]:h-10 sm:w-36 sm:pl-2.5 dark:bg-zinc-900">
                        <SelectValue>{status === "all" ? "All statuses" : status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start">
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    type="search"
                    aria-label="Filter visits by patient name or complaint"
                    placeholder="Filter visits"
                    className="h-10 flex-1 bg-white px-1.5 max-[360px]:placeholder:text-xs sm:w-48 sm:flex-none sm:px-2.5 dark:bg-zinc-900"
                    value={visitQuery}
                    onChange={event => setVisitQuery(event.target.value)}
                />
            </div>
        </>
    );

    return (
        <main className="min-h-dvh bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
            <Tabs value={view} onValueChange={changeView} className={cn(
                "min-h-dvh gap-0",
                view === "table" && "h-dvh min-h-[32rem]"
            )}>
                <header className="mx-auto w-full max-w-6xl px-4 pt-5 sm:px-8 sm:pt-8">
                    <nav aria-label="Clinic navigation" className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 pr-14 sm:mb-6">
                        <Link to="/" className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-zinc-600 outline-none hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-zinc-500 dark:text-zinc-300 dark:hover:text-white">
                            <ArrowLeft aria-hidden="true" className="size-4" />
                            Back to catalogue
                        </Link>
                    </nav>
                    <LedgerHeader workspace />
                    <div className="relative z-10 mt-4 mb-3 flex flex-col items-end gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
                        <TabsList aria-label="Ledger view" className="shrink-0 border border-zinc-200 bg-zinc-200/60 group-data-horizontal/tabs:h-[46px] dark:border-zinc-700 dark:bg-zinc-800">
                            <TabsTrigger value="timeline" className={viewTabClassName}>Timeline</TabsTrigger>
                            <TabsTrigger value="table" className={viewTabClassName}>Table</TabsTrigger>
                        </TabsList>
                        <div className="w-full sm:min-w-0 sm:max-w-lg sm:flex-1">
                            <PatientSearch placement="above" />
                        </div>
                    </div>
                </header>
                <TabsContent value="table" keepMounted className="mx-auto flex min-h-0 w-full max-w-6xl flex-col px-4 pb-4 sm:px-8 sm:pb-6">
                    <div className="mb-3 flex shrink-0 items-center gap-2 py-2">
                        {view === "table" && filters}
                    </div>
                    <div className="isolate flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                        <TableHeader className="text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200" />
                        {entries.length > 0
                            ? <TableBody showSearch={false} entries={entries} />
                            : <p className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">No visits match these filters.</p>}
                    </div>
                </TabsContent>
                <TabsContent value="timeline" keepMounted className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-8 sm:pb-6">
                    <VisitTimeline entries={entries} filters={view === "timeline" && filters} />
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Clinic;
