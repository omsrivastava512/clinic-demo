import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LedgerHeader from "@/features/ledger/components/LedgerHeader";
import PatientSearch from "@/features/ledger/components/PatientSearch";
import TableBody from "@/features/ledger/components/TableBody";
import TableHeader from "@/features/ledger/components/TableHeader";
import VisitTimeline from "@/features/ledger/components/VisitTimeline";
import { cn } from "@/lib";

const Clinic = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get("view") === "timeline" ? "timeline" : "table";
    const isTimeline = view === "timeline";

    const changeView = (value: string | number | null) => {
        const params = new URLSearchParams(searchParams);
        if (value === "timeline") {
            params.set("view", "timeline");
        } else {
            params.delete("view");
        }
        setSearchParams(params, { replace: true });
    };

    return (
        <main className={cn("min-h-dvh text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50", isTimeline ? "bg-stone-100" : "bg-zinc-100")}>
            <Tabs value={view} onValueChange={changeView} className={cn(
                "min-h-dvh gap-0",
                !isTimeline && "mx-auto h-dvh min-h-[32rem] max-w-6xl px-4 pt-5 pb-4 sm:px-8 sm:pt-8 sm:pb-6"
            )}>
                <header className={cn(isTimeline && "border-b border-stone-300 bg-stone-50 dark:border-zinc-800 dark:bg-zinc-900")}>
                    <div className={cn(isTimeline && "mx-auto max-w-6xl px-4 pt-3 pb-6 sm:px-8 sm:pb-8")}>
                        <nav aria-label="Clinic navigation" className={cn(
                            "flex flex-wrap items-center gap-x-4 gap-y-2 pr-14",
                            isTimeline ? "mb-2 min-h-11 sm:mb-4" : "mb-4 sm:mb-6"
                        )}>
                            <Link to="/" className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-zinc-600 outline-none hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-zinc-500 dark:text-zinc-300 dark:hover:text-white">
                                <ArrowLeft aria-hidden="true" className="size-4" />
                                Back to catalogue
                            </Link>
                            <TabsList aria-label="Ledger view" className="border border-zinc-200 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-800">
                                <TabsTrigger value="table" className="px-3">Table</TabsTrigger>
                                <TabsTrigger value="timeline" className="px-3">Timeline</TabsTrigger>
                            </TabsList>
                        </nav>
                        <LedgerHeader workspace={view} />
                        <div className={cn("relative z-10 w-full", isTimeline ? "mt-5 max-w-md" : "mt-4 mb-3 sm:max-w-lg")}>
                            <PatientSearch placement="above" />
                        </div>
                    </div>
                </header>
                <TabsContent value="table" keepMounted className="isolate flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                    <TableHeader className="text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200" />
                    <TableBody showSearch={false} />
                </TabsContent>
                <TabsContent value="timeline" keepMounted className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
                    <VisitTimeline />
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Clinic;
