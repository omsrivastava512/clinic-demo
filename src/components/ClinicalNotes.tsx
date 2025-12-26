import { useState } from 'preact/hooks';
import { PlusIcon, XIcon, Trash2Icon, TagIcon, SaveIcon, AlertTriangleIcon } from 'lucide-react';

// Updated data structure to support the critical flag
export interface NoteData {
  value: string;
  isCritical: boolean;
}

interface ClinicalNotesBuilderProps {
  onSave: (notes: Record<string, NoteData>) => void;
  onClose: () => void;
  initialNotes?: Record<string, NoteData>;
}

export const ClinicalNotesBuilder: React.FC<ClinicalNotesBuilderProps> = ({ onSave, onClose, initialNotes = {} }) => {
  const [notes, setNotes] = useState<Record<string, NoteData>>(initialNotes);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isNewCritical, setIsNewCritical] = useState(false);

  const handleAddNote = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    setNotes(prev => ({
      ...prev,
      [newKey]: { value: newValue, isCritical: isNewCritical }
    }));
    setNewKey('');
    setNewValue('');
    setIsNewCritical(false);
  };

  const removeNote = (key: string) => {
    const next = { ...notes };
    delete next[key];
    setNotes(next);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 transition-colors">

        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 flex justify-between items-center transition-colors">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <TagIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
            Clinical Notes
          </h3>
          <button type="button" title="Close" onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 bg-white dark:bg-black transition-colors">

          {/* Input Area with Labels */}
          <div className="flex gap-2 mb-6 items-end">
            <div className="">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1.5 block">
                Category
              </label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey((e.target as HTMLInputElement).value)}
                placeholder="e.g. Diabetes, Weight, Thyroid, Allergy"
                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
              />
            </div>

            <div className="flex-1">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1.5 block">
                Observation
              </label>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue((e.target as HTMLInputElement).value)}
                placeholder="e.g. High, 75, Low"
                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
              />
            </div>

            {/* Critical Toggle Button */}
            <button
              onClick={() => setIsNewCritical(!isNewCritical)}
              title="Mark as Critical Issue"
              className={`p-2 rounded-lg border transition-all mb-px ${isNewCritical
                ? 'bg-red-500 border-red-600 text-white shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 hover:border-zinc-400 dark:hover:border-zinc-600'
                }`}
            >
              <AlertTriangleIcon className="w-4 h-4" />
            </button>

            <button
              type="button" title="Add"
              onClick={handleAddNote}
              disabled={!newKey || !newValue}
              className="p-2 mb-px bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          {/* List Area */}
          <div className="space-y-2 max-h-[200px] overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
            {Object.entries(notes).length === 0 && (
              <div className="text-center text-zinc-400 dark:text-zinc-600 text-xs italic py-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                No additional details added yet.
              </div>
            )}
            {Object.entries(notes).map(([key, data]) => (
              <div
                key={key}
                className={`flex items-center justify-between p-3 rounded-lg border group transition-colors ${data.isCritical
                  ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                  : 'bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800'
                  }`}
              >
                <div className="flex items-center gap-2 text-sm">
                  {data.isCritical && (
                    <AlertTriangleIcon className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0" />
                  )}
                  <span className={`font-bold ${data.isCritical ? 'text-red-700 dark:text-red-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
                    {key}:
                  </span>
                  <span className={`text-zinc-900 dark:text-white ${data.isCritical ? 'font-medium' : ''}`}>
                    {data.value}
                  </span>
                </div>
                <button onClick={() => removeNote(key)} title="delete" type="button"
                  className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash2Icon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <button
            type="button"
            onClick={() => onSave(notes)}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
          >
            <SaveIcon className="w-4 h-4" />
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalNotesBuilder;