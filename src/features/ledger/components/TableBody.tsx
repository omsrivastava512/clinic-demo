import { MOCK_LEDGER_ENTRIES } from "@/data/mock_data"
import { compTime } from "@/lib"
import TableRow from "./TableRow"
import PatientSearch from "./PatientSearch"


const TableBody = () => {
    return (
        <div className="flex-1 z-50 overflow-y-auto flex flex-col">
            {/* Dynamic Rows */}
            {MOCK_LEDGER_ENTRIES
                .sort((a, b) => compTime(a.time, b.time))
                .map((entry) => (
                    <TableRow entry={entry} />
                ))
            }
            <PatientSearch />
        </div>
    )
}

export default TableBody
