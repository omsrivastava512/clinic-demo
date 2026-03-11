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

    


    return (
        <>
            <div ref={listContainerRef}  className="flex-1 z-50 overflow-y-auto flex flex-col">
                {/* Dynamic Rows */}
                {MOCK_LEDGER_ENTRIES
                    .sort((a, b) => compTime(a.time, b.time))
                    .map((entry) => (
                        <TableRow entry={entry} />
                    ))
                }
                
                <PatientSearch />
            </div>
        </>
    )
}

export default TableBody
