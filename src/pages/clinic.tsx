import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_LEDGER_ENTRIES } from "@/data/mock_data";
import LedgerHeader from "@/features/ledger/components/LedgerHeader";
import PatientSearch from "@/features/ledger/components/PatientSearch";
import TableBody from "@/features/ledger/components/TableBody";
import TableHeader from "@/features/ledger/components/TableHeader";
import VisitFilterControls from "@/features/ledger/components/VisitFilterControls";
import VisitTimeline from "@/features/ledger/components/VisitTimeline";
import { cn } from "@/lib";
import type { LedgerEntry } from "@/types";

const viewTabClassName = "px-3 dark:data-active:border-transparent dark:data-active:bg-zinc-700 group-data-[variant=default]/tabs-list:data-active:shadow-none";

const Clinic = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { state } = useLocation();

    // Preserve applied visit query & status filter when navigating between views or returning from patient profile
    const savedFilters: { visitQuery?: string; status?: LedgerEntry["status"] | "all" } =
        state?.visitFilters ?? {};
    const [visitQuery, setVisitQuery] = useState(savedFilters.visitQuery ?? "");
    const [status, setStatus] = useState<LedgerEntry["status"] | "all">(savedFilters.status ?? "all");
    const view = searchParams.get("view") === "table" ? "table" : "timeline";

    const normalizedVisitQuery = visitQuery.trim().toLowerCase();
    const filteredVisits = MOCK_LEDGER_ENTRIES.filter(visit =>
        (visit.patientName.toLowerCase().includes(normalizedVisitQuery) || visit.treatment.toLowerCase().includes(normalizedVisitQuery)) &&
        (status === "all" || visit.status === status)
    );
    const hasFilters = normalizedVisitQuery !== "" || status !== "all";

    const changeView = (selectedView: string | number | null) => {
        const params = new URLSearchParams(searchParams);
        if (selectedView === "table") {
            params.set("view", "table");
        } else {
            params.delete("view");
        }
        setSearchParams(params, { replace: true, state: { ...state, visitFilters: { visitQuery, status } } });
    };

    const updateVisitFilters = (nextVisitQuery: string, nextStatus: LedgerEntry["status"] | "all") => {
        setVisitQuery(nextVisitQuery);
        setStatus(nextStatus);
        setSearchParams(searchParams, { replace: true, state: { ...state, visitFilters: { visitQuery: nextVisitQuery, status: nextStatus } } });
    };

    return (
        <main data-clinic-workspace className="min-h-dvh bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
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
                    <div className="relative z-30 mt-4 mb-3 flex flex-col items-end gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
                        <TabsList aria-label="Ledger view" className="shrink-0 border border-zinc-200 bg-zinc-200/60 group-data-horizontal/tabs:h-[46px] dark:border-zinc-700 dark:bg-zinc-800">
                            <TabsTrigger value="timeline" className={viewTabClassName}>Timeline</TabsTrigger>
                            <TabsTrigger value="table" className={viewTabClassName}>Table</TabsTrigger>
                        </TabsList>
                        <div className="w-full sm:min-w-0 sm:max-w-lg sm:flex-1">
                            <PatientSearch placement="above" captureTyping />
                        </div>
                    </div>
                </header>
                <TabsContent value="table" keepMounted className="mx-auto flex min-h-0 w-full max-w-6xl flex-col px-4 pb-4 sm:px-8 sm:pb-6">
                    <div className="mb-3 flex shrink-0 items-start gap-2 py-2">
                        {view === "table" && (
                            <VisitFilterControls
                                visitQuery={visitQuery}
                                status={status}
                                hasFilters={hasFilters}
                                matchCount={filteredVisits.length}
                                totalCount={MOCK_LEDGER_ENTRIES.length}
                                onChange={updateVisitFilters}
                            />
                        )}
                    </div>
                    <div className="isolate flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                        <TableHeader className="text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200" />
                        {filteredVisits.length > 0
                            ? <TableBody showSearch={false} entries={filteredVisits} />
                            : <p className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">No visits match these filters.</p>}
                    </div>
                </TabsContent>
                <TabsContent value="timeline" keepMounted className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-8 sm:pb-6">
                    <VisitTimeline entries={filteredVisits} hasFilters={hasFilters}>
                        {view === "timeline" && (
                            <VisitFilterControls
                                visitQuery={visitQuery}
                                status={status}
                                hasFilters={hasFilters}
                                matchCount={filteredVisits.length}
                                totalCount={MOCK_LEDGER_ENTRIES.length}
                                onChange={updateVisitFilters}
                            />
                        )}
                    </VisitTimeline>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Clinic;
