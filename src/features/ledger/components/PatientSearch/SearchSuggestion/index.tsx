import type { Patient } from "@/types";
import { DropdownContainer, DropdownHeader } from "./primitives";
import PatientList from "./PatientResult";
import AddNewPatientButton from "./AddNewPatientButton";
import { isEmptyInput, isMinInputLength } from "../utils";


interface SearchSuggestionsProps {
    filteredPatients: Patient[];
    handleSelect(selectedIndex: number): void;
    input: string;
    focusedIndex: number
    placement: "above" | "below"
    listboxId: string
}

const SearchSuggestions = ({ filteredPatients, handleSelect, input, focusedIndex, placement, listboxId }: SearchSuggestionsProps) => {
    if (isEmptyInput(input)) return null;
    const canSearch = isMinInputLength(input);
    return (
        <DropdownContainer placement={placement}>
            <DropdownHeader matchCount={filteredPatients.length} />
            {filteredPatients.length === 0 && (
                <div role="status" className="px-3 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                    {canSearch ? "No matching patients." : "Enter at least 3 characters to search."}
                </div>
            )}
            {canSearch && (
                <div id={listboxId} role="listbox" aria-label="Patient suggestions" className="flex min-h-0 flex-col">
                    {filteredPatients.length > 0 && (
                        <PatientList
                            filteredPatients={filteredPatients}
                            focusedIndex={focusedIndex}
                            handleSelect={handleSelect}
                            listboxId={listboxId}
                        />
                    )}
                    <AddNewPatientButton
                        id={`${listboxId}-${filteredPatients.length}`}
                        onSelect={() => handleSelect(filteredPatients.length)}
                        isSelected={filteredPatients.length === focusedIndex}
                        input={input}
                    />
                </div>
            )}
        </DropdownContainer>
    )
}

export default SearchSuggestions
