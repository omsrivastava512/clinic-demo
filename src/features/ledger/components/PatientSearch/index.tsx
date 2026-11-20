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
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const listboxId = useId();
    const listboxOpen = showSuggestions && isMinInputLength(searchQuery);
    const activeOptionId = listboxOpen && focusedIndex >= 0 && focusedIndex <= filteredPatients.length
        ? `${listboxId}-${focusedIndex}`
        : undefined;

    // ────── Search Input Handling ───────────────────────────────────────
    const updateSearch = useCallback((rawInput: string) => {
        const cleanedQuery = cleanSearchInput(rawInput);
        setSearchQuery(cleanedQuery);
        setShowSuggestions(!isEmptyInput(cleanedQuery));
        setFocusedIndex(-1); // -1 indicates logical focus remains on the Search Input
        setFilteredPatients(
            isMinInputLength(cleanedQuery)
                ? MOCK_PATIENTS.filter(
                      patient =>
                          patient.fullName.toLowerCase().includes(cleanedQuery.toLowerCase()) ||
                          patient.phone.includes(cleanedQuery)
                  )
                : []
        );
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

    // Global keydown capture: allows staff to immediately search by typing without clicking the field first
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
        // totalItems accounts for patient matches plus the "Register New Patient" option at the bottom
        const totalItems = filteredPatients.length + 1;

        if (!showSuggestions && e.key === 'ArrowDown' && !isEmptyInput(searchQuery)) {
            e.preventDefault();
            setShowSuggestions(true);
            if (isMinInputLength(searchQuery)) setFocusedIndex(0);
            return;
        }

        if (!showSuggestions || !isMinInputLength(searchQuery)) return;

        if (e.key === 'ArrowUp') {
            e.preventDefault(); // Prevent cursor movement in text box
            setFocusedIndex(prevIndex => (prevIndex < 0 ? 0 : prevIndex === 0 ? prevIndex : prevIndex - 1));
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex(prevIndex => (prevIndex < totalItems - 1 ? prevIndex + 1 : prevIndex));
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            handleSelect(focusedIndex);
        }
    };

    // ────── onEnter - Selection  Handling ───────────────────────────────────────
    const handleSelect = (selectedIndex: number) => {
        if (selectedIndex === -1) return; // Focus is still on the Search Input
        if (!isMinInputLength(searchQuery)) return;

        if (selectedIndex < filteredPatients.length) {
            // Patient selected from filtered directory matches
            const selectedPatient = filteredPatients[selectedIndex];
            alert(`Selected Existing: ${selectedPatient.fullName}`);
        }
        else if (selectedIndex === filteredPatients.length) {
            // "Add New" button selected (last option in listbox)
            alert(`Triggering Add New Patient for: ${searchQuery}`);
        }
        setSearchQuery('');
        setShowSuggestions(false);
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
                input={searchQuery}
                inputRef={inputRef}
                listboxId={listboxOpen ? listboxId : undefined}
                activeOptionId={activeOptionId}
                isFocused={focusedIndex === -1}
                handleInputChange={event => updateSearch(event.currentTarget.value)}
                handleKeyNavigation={handleKeyNavigation}
                onInputClick={() => {
                    if (!isEmptyInput(searchQuery)) setShowSuggestions(true);
                }}
                placement={placement}
            />

            {/* A. The Floating Typeahead List (Drop-up) */}
            {showSuggestions && <SearchSuggestions filteredPatients={filteredPatients} input={searchQuery} handleSelect={handleSelect} focusedIndex={focusedIndex} placement={placement} listboxId={listboxId} />}

        </div>
    )
}

export default PatientSearch

