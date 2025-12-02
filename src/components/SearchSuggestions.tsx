import { ArrowUpRight, Plus,  Smartphone, User } from "lucide-react";
import type { Patient } from "@/types";


interface SearchSuggestionsProps {
    filteredPatients: Patient[];
    handleSelect(i: number): void;
    input: string;
    selectedIndex: number
}

const SearchSuggestions = ({ filteredPatients, handleSelect, input, selectedIndex }: SearchSuggestionsProps) => (
    <div id="suggestions" className="absolute bottom-full left-0 right-0 mx-4 mb-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden max-h-[300px] flex flex-col z-50">

        {/* Header of Dropdown */}
        <div className="px-4 py-2 bg-zinc-950 border-b border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Search Results ({filteredPatients.length})
        </div>

        {/* Scrollable Results */}
        <div className="overflow-y-auto max-h-[200px]">
            {filteredPatients.map((p, i) => (
                <button
                    key={p.id}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left px-4 py-3 border-b border-zinc-800 hover:bg-zinc-800 hover:text-white group flex justify-between items-center transition-colors ${i === selectedIndex ? 'bg-zinc-800 text-white' : ''}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-800 text-zinc-500 group-hover:border-zinc-600">
                            <User className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-medium text-zinc-300 group-hover:text-white text-sm">
                                {p.name}
                            </div>
                            <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
                                <span>{p.mrn}</span>
                                <span>•</span>
                                <Smartphone className="w-3 h-3" /> {p.phone}
                            </div>
                        </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            ))}

            {filteredPatients.length === 0 && (
                <div className="px-4 py-6 text-center text-zinc-500 text-sm italic">
                    No existing patients found for "{input}"
                </div>
            )}
        </div>

        {/* Footer of Dropdown: Always "Add New" */}
        <button
            onClick={() => handleSelect(filteredPatients.length)}
            className={`w-full ${filteredPatients.length === selectedIndex ? 'bg-zinc-800 text-white' : ' bg-zinc-950'} text-left px-4 py-3 hover:bg-zinc-900 border-t border-zinc-700 text-white flex items-center gap-3 transition-colors `}
        >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                <Plus className="w-4 h-4" />
            </div>
            <div>
                <div className="font-bold text-sm">Register New Patient: "{input}"</div>
                <div className="text-[10px] text-zinc-500">Create new MRN and start intake</div>
            </div>
        </button>
    </div>
)

export default SearchSuggestions