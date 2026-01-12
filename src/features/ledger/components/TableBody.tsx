import { MOCK_LEDGER_ENTRIES } from "@/data/mock_data"
import { compTime } from "@/lib"
import TableRow from "./TableRow"
import PatientSearch from "./PatientSearch"
import { useRef, useEffect } from "react"


const TableBody = () => {
    const endRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [MOCK_LEDGER_ENTRIES]);

    return (
        <div className="flex-1 z-50 overflow-y-auto flex flex-col">
            {/* Dynamic Rows */}
            {MOCK_LEDGER_ENTRIES
                .sort((a, b) => compTime(a.time, b.time))
                .map((entry) => (
                    <TableRow entry={entry} />
                ))
            }
            <div ref={endRef}></div>
            <PatientSearch />
        </div>
    )
}

export default TableBody
