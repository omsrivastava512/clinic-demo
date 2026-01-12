import { cleanSearchInput } from "@/lib";
import SearchInput from "./SearchInput"
import SearchSuggestions from "./SearchSuggestion"
import { MOCK_PATIENTS } from "@/data/mock_data";
import {  useState } from "react"
import type { Patient } from "@/types";

const PatientSearch = () => {

    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    // Handle Input Changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.currentTarget.value
        const val = cleanSearchInput(raw)

        setInput(val);

        // Trigger Logic: Only show if at least 3 characters (starts at 3 chars)
        if (val.length >= 3) {
            const results = MOCK_PATIENTS.filter(p =>
                p.name.toLowerCase().includes(val.toLowerCase()) ||
                p.phone.includes(val)
            );
            setFilteredPatients(results);
            setShowSuggestions(true);
            if (results.length === 0 && focusedIndex !== 0) {
                setFocusedIndex(0);
            }
        } else {
            setShowSuggestions(false);
            setFocusedIndex(-1)
            setFilteredPatients([]) // force a rerender so the input element doesn't lose track of sanitized state value (React skipped updates because state was getting the same sanitized value even when the input was littered)
        }
    };


    const handleKeyNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // filteredPatients is your list results
        // We add +1 to length to account for the "Add New" button at the bottom
        const totalItems = filteredPatients.length + 1;

        if (!showSuggestions) return;

        if (e.key === 'ArrowUp') {
            e.preventDefault(); // Stop cursor from moving in text box
            setFocusedIndex(prev => (prev < 0 ? 0 : prev == 0 ? prev : prev - 1));
            // Logic: If at top (0), stay at 0, or loop to bottom
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex(prev => (prev < totalItems - 1 ? prev + 1 : prev));
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            handleSelect(focusedIndex)
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
        // onPatientIdentified(i); // dummy call
    };


    return (
        <div className="sticky bottom-0 left-0  right-0 dark:bg-black  p-1 w-full  mt-auto">
            {/* ACTIVE INPUT ROW */}
            <SearchInput input={input} isFocused={focusedIndex === -1} handleInputChange={handleInputChange} handleKeyNavigation={handleKeyNavigation} />

            {/* A. The Floating Typeahead List (Drop-up) */}
            {showSuggestions && <SearchSuggestions filteredPatients={filteredPatients} input={input} handleSelect={handleSelect} focusedIndex={focusedIndex} />}

        </div>
    )
}

export default PatientSearch

