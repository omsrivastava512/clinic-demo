import type { Patient } from "@/types";
import { DropdownContainer, DropdownHeader } from "./primitives";
import PatientList from "./PatientResult";
import AddNewPatientButton from "./AddNewPatientButton";
import { isEmptyInput, isMinInputLength } from "../utils";


interface SearchSuggestionsProps {
    filteredPatients: Patient[];
    handleSelect(i: number): void;
    input: string;
    focusedIndex: number
    placement: "above" | "below"
}

const SearchSuggestions = ({ filteredPatients, handleSelect, input, focusedIndex, placement }: SearchSuggestionsProps) => {
    if (isEmptyInput(input)) return null;
    return (
        <DropdownContainer placement={placement}>
            <DropdownHeader count={filteredPatients.length} />
            <PatientList
                filteredPatients={filteredPatients}
                input={input}
                focusedIndex={focusedIndex}
                handleSelect={handleSelect}
            />
            {isMinInputLength(input) &&
                < AddNewPatientButton
                    onSelect={() => handleSelect(filteredPatients.length)}
                    isSelected={filteredPatients.length === focusedIndex}
                    input={input}
                />
            }
        </DropdownContainer>
    )
}

export default SearchSuggestions
