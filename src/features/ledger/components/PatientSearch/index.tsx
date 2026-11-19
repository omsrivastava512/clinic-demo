import { cleanSearchInput } from "@/lib";
import SearchInput from "./SearchInput"
import SearchSuggestions from "./SearchSuggestion"
import { MOCK_PATIENTS } from "@/data/mock_data";
import { useCallback, useEffect, useId, useRef, useState } from "react"
import type { Patient } from "@/types";
import { isEmptyInput, isMinInputLength } from "./utils";

const PatientSearch = ({ placement = "below", captureTyping = false }: { placement?: "above" | "below"; captureTyping?: boolean }) => {

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const listboxId = useId();
    const listboxOpen = showSuggestions && isMinInputLength(input);
    const activeOptionId = listboxOpen && focusedIndex >= 0 && focusedIndex <= filteredPatients.length
        ? `${listboxId}-${focusedIndex}`
        : undefined;

    // ────── Search Input Handling ───────────────────────────────────────
    const updateSearch = useCallback((raw: string) => {
        const val = cleanSearchInput(raw);
        setInput(val);
        setShowSuggestions(!isEmptyInput(val));
        setFocusedIndex(-1);
        setFilteredPatients(isMinInputLength(val) ? MOCK_PATIENTS.filter(p =>
            p.fullName.toLowerCase().includes(val.toLowerCase()) || p.phone.includes(val)
        ) : []);
    }, []);

    const dismissSuggestions = useCallback(() => {
        setShowSuggestions(false);
        setFocusedIndex(-1);
    }, []);

    useEffect(() => {
        if (!showSuggestions) return;

        const handleOutsidePointer = (event: PointerEvent) => {
            if (event.target instanceof Node && !searchRef.current?.contains(event.target)) {
                dismissSuggestions();
            }
        };
        document.addEventListener("pointerdown", handleOutsidePointer);
        return () => document.removeEventListener("pointerdown", handleOutsidePointer);
    }, [dismissSuggestions, showSuggestions]);

    useEffect(() => {
        if (!captureTyping) return;

        const handlePageTyping = (event: KeyboardEvent) => {
            const field = inputRef.current;
            const activeElement = document.activeElement;
            if (!field || event.defaultPrevented || event.isComposing || event.ctrlKey || event.metaKey ||
                event.altKey || !/^[a-z0-9]$/i.test(event.key)) return;
            if (activeElement instanceof HTMLElement && (activeElement.isContentEditable ||
                activeElement.closest('input, textarea, select, dialog, [role="textbox"], [role="combobox"], [role="listbox"], [role="menu"], [role="dialog"], [aria-expanded="true"]'))) return;

            event.preventDefault();
            field.focus();
            updateSearch(field.value + event.key);
        };
        document.addEventListener("keydown", handlePageTyping);
        return () => document.removeEventListener("keydown", handlePageTyping);
    }, [captureTyping, updateSearch]);

    // ────── Key Navigation ───────────────────────────────────────
    const handleKeyNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // filteredPatients is your list results
        // We add +1 to length to account for the "Add New" button at the bottom
        const totalItems = filteredPatients.length + 1;

        if (!showSuggestions && e.key === 'ArrowDown' && !isEmptyInput(input)) {
            e.preventDefault();
            setShowSuggestions(true);
            if (isMinInputLength(input)) setFocusedIndex(0);
            return;
        }

        if (!showSuggestions || !isMinInputLength(input)) return;

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

    // ────── onEnter - Selection  Handling ───────────────────────────────────────
    //   TODO: Add logic to detect if new patient added using Name or Phone Number
    const handleSelect = (i: number) => {

        if (i === -1) return;
        // -1 means focus is still on Search Input

        if(!isMinInputLength(input)) return; // trigger #2 not active yet        

        if (i < filteredPatients.length) {
            // It's a patient from the list
            const patient = filteredPatients[i];
            alert(`Selected Existing: ${patient.fullName}`);
        }
        else if (i === filteredPatients.length) {
            // It's the "Add New" button (last item)
            alert(`Triggering Add New Patient for: ${input}`);

        }
        setInput('');
        setShowSuggestions(false);

        // TODO: Find a suitable implementation of this (Created on 2025-12-24)
        // onPatientIdentified(i); // dummy call
    };





    return (
        <div
            ref={searchRef}
            className={placement === "above" ? "relative w-full" : "relative dark:bg-black p-1 w-full mt-auto"}
            onBlur={event => {
                if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) dismissSuggestions();
            }}
            onKeyDown={event => {
                if (event.key === 'Escape' && showSuggestions) {
                    event.preventDefault();
                    dismissSuggestions();
                    inputRef.current?.focus();
                }
            }}
        >
            {/* ACTIVE INPUT ROW */}
            <SearchInput
                input={input}
                inputRef={inputRef}
                listboxId={listboxOpen ? listboxId : undefined}
                activeOptionId={activeOptionId}
                isFocused={focusedIndex === -1}
                handleInputChange={event => updateSearch(event.currentTarget.value)}
                handleKeyNavigation={handleKeyNavigation}
                onInputClick={() => {
                    if (!isEmptyInput(input)) setShowSuggestions(true);
                }}
                placement={placement}
            />

            {/* A. The Floating Typeahead List (Drop-up) */}
            {showSuggestions && <SearchSuggestions filteredPatients={filteredPatients} input={input} handleSelect={handleSelect} focusedIndex={focusedIndex} placement={placement} listboxId={listboxId} />}

        </div>
    )
}

export default PatientSearch

