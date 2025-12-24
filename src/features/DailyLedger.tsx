import { useEffect, useState } from "preact/hooks";
import type { LedgerEntry, Patient } from "@/types";
import { MOCK_LEDGER_ENTRIES, MOCK_PATIENTS } from "../data/mock_data";
import { compTime } from "../utils/time12h";
import { Search } from "lucide-react";
import SearchSuggestions from "../components/SearchSuggestion";


const cleanSearchInput = (input: string): string => {

    if (!input) return ""; // Handle Empty Strings

    // 1. Normalize whitespace first
    const normalized = input.replace(/\s+/g, ' ').trimStart();

    // 2. Find first meaningful character
    const firstChar = normalized[0];
    if (!firstChar) return "";

    // if the string starts with a Letter
    if (/[a-zA-Z]/.test(firstChar)) {
        // Regex: Replace anything that is NOT (^) a letter or space
        return normalized.replace(/[^a-zA-Z ]/g, "");
    }
    // if the string starts with a Number
    if (/[0-9]/.test(firstChar)) {
        // Regex: Replace anything that is NOT (^) a number and slice it till 10 digits
        return normalized.replace(/[^0-9]/g, "").slice(0, 10);
    }

    return "";
}

/**
 * COMPONENT 1: THE LEDGER
 * The "Excel-like" input row for rapid entry.
 */
interface LedgerProps {
    onPatientIdentified: (patient: number) => void;
}

const DailyLedger: React.FC<LedgerProps> = ({ onPatientIdentified }) => {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    console.log("REND");



    useEffect(() => {
        if (!showSuggestions) {
            // setFilteredPatients([])
            setSelectedIndex(-1)
        } else if (filteredPatients.length === 0) {
            setSelectedIndex(0)
        }
    }, [showSuggestions, filteredPatients])


    // Handle Input Changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = (e.target as HTMLInputElement).value
        const val = cleanSearchInput(raw)
        console.log(val);
        
        setInput(val);

        // Trigger Logic: Only show if at least 3 characters (starts at 3 chars)
        if (val.length >= 3) {
            const results = MOCK_PATIENTS.filter(p =>
                p.name.toLowerCase().includes(val.toLowerCase()) ||
                p.phone.includes(val)
            );
            setFilteredPatients(results);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
            setFilteredPatients([]) // force a rerender so the input element doesn't lose track of sanitized state value (React skipped updates because state was getting the same sanitized value even when the input was littered)
        }
    };



    const getStatusBadgeStyle = (status: LedgerEntry['status']) => {
        switch (status) {
            case 'Paid':
                return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-500';
            case 'In Therapy':
                return 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400';
            case 'Waiting':
                return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500';
            default:
                return 'bg-zinc-100 text-zinc-500';
        }
    };

    const handleKeyNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // filteredPatients is your list results
        // We add +1 to length to account for the "Add New" button at the bottom
        const totalItems = filteredPatients.length + 1;

        if (!showSuggestions) return;

        if (e.key === 'ArrowUp') {
            e.preventDefault(); // Stop cursor from moving in text box
            setSelectedIndex(prev => (prev < 0 ? 0 : prev == 0 ? prev : prev - 1));
            // Logic: If at top (0), stay at 0, or loop to bottom
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < totalItems - 1 ? prev + 1 : prev));
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            handleSelect(selectedIndex)
        }
    };

    /**
     * Suggestion: Add logic to detect if new patient added using Name or Phone Number
     * @param i Index of the selected patient/option
     * @returns 
     **/
    const handleSelect = (i: number) => {
        if (filteredPatients.length > 0 && i === -1) return; // Or trigger search

        if (i < filteredPatients.length && i !== -1) {
            // It's a patient from the list
            const patient = filteredPatients[i];
            alert(`Selected Existing: ${patient.name}`);
        } else {
            // It's the "Add New" button (last item)
            alert(`Triggering Add New Patient for: ${input}`);
        }
        setInput('');
        setShowSuggestions(false);

        // TODO: Find a suitable implementation of this (Created on 2025-12-24)
        onPatientIdentified(i); // dummy call

    };

    return (
        <div id="daily_ledger" className="w-full relative bg-white overflow-hidden dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col h-[500px] transition-colors duration-300">
            {/* Header */}
            <div className="flex justify-between items-end p-6 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
                <div>
                    <div className="flex-col md:flex-row gap-2 items-center">
                        <p className="text-zinc-900 dark:text-white font-medium">Daily Register</p>
                        <p className="text-zinc-500 text-xs">Friday, 24 Nov</p>
                    </div>
                    <p className="text-zinc-500 text-sm">Dr. Sharma's Clinic</p>
                </div>
                {/* OPD Count */}
                <div className="text-right">
                    <div className="text-2xl font-mono text-zinc-900 dark:text-white">42</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">OPD Count</div>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                <div className="col-span-2">Time</div>
                <div className="col-span-6 md:col-span-4">Patient Name</div>
                <div className="hidden md:block md:col-span-4">Treatment</div>
                <div className="col-span-4 md:col-span-2 text-right">Status</div>
            </div>

            {/* Rows */}
            <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Dynamic Rows */}
                {MOCK_LEDGER_ENTRIES.sort((a, b) => compTime(a.time, b.time)).map((entry) => (
                    <div key={entry.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                        <div className="col-span-2 text-zinc-500 font-mono text-xs">{entry.time}</div>
                        <div className="col-span-6 md:col-span-4">
                            <div className=" text-zinc-700 dark:text-zinc-300 font-medium">{entry.patientName}</div>
                            <div className="md:hidden text-xs text-zinc-400 mt-0.5">{entry.treatment}</div>
                        </div>
                        <div className="hidden md:block md:col-span-4 text-zinc-600 dark:text-zinc-400 text-sm">{entry.treatment}</div>
                        <div className="col-span-4 md:col-span-2 text-right">
                            <span className={`text-xs px-1 sm:px-2 py-1 rounded ${getStatusBadgeStyle(entry.status)}`}>
                                {entry.status}
                            </span>
                        </div>
                    </div>
                ))}
                <div className="sticky bottom-0 left-0 right-0 dark:bg-black  p-1 w-full  mt-auto">
                    {/* A. The Floating Typeahead List (Drop-up) */}
                    {showSuggestions && <SearchSuggestions filteredPatients={filteredPatients} input={input} handleSelect={handleSelect} selectedIndex={selectedIndex} />}

                    {/* ACTIVE INPUT ROW */}
                    <div className="mb-1 w-full rounded border border-black/25 dark:border-white/25 grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 items-center shadow-lg shadow-gray-500/70 dark:shadow-none">
                        <div className="hidden md:block md:col-span-2 text-zinc-900 dark:text-white font-mono text-xs">Now</div>
                        <div className="col-span-10 relative">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                            <input
                                autoFocus
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyNavigation}
                                className="w-full bg-transparent border-none outline-none md:text-xl font-medium text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 pl-8"
                                placeholder="Type Name or Mobile..."
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
                                <span className="hidden sm:inline-block text-[10px] bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">{selectedIndex === -1 ? "Start typing" : "↵ ENTER"}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DailyLedger;

