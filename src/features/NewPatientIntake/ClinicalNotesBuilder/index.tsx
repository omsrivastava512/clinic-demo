import { useState } from 'preact/hooks';
import { cn } from '@/utils';
import { CNBHeader } from './CNBHeader';
import { CNBList } from './CNBList';
import { CNBInput } from './CNBInput';
import { CNBFooter } from './CNBFooter';

// Updated data structure to support the critical flag
export interface NoteData {
  value: string;
  isCritical: boolean;
}

export type ClinicalNotes = Record<string, NoteData>

interface ClinicalNotesBuilderProps {
  onSave: (notes: Record<string, NoteData>) => void;
  onClose: () => void;
  initialNotes?: Record<string, NoteData>;
}

export const ClinicalNotesBuilder: React.FC<ClinicalNotesBuilderProps> = ({ onSave, onClose, initialNotes = {} }) => {
  const [notes, setNotes] = useState<ClinicalNotes>(initialNotes);

  const insertNote = (key: string, data: NoteData) => {
    if (Object.keys(notes).includes(key)) {
      const conf = confirm("⚠️WARNING: Category already exists! Do you wish to REPLACE it?")
      if (!conf) return;
    }

    setNotes(prev => (
      {
        ...prev,
        [key]: data
      }
    ));
  };

  const removeNote = (key: string) => {
    const next = { ...notes };
    delete next[key];
    setNotes(next);
  };

  return (
    <div className={blurWallStyle}>
      <div className={cnbStyle}>
        {/* Header */}
        <CNBHeader onClose={onClose} />

        <div className="p-6 bg-white dark:bg-black">
          {/* Input Area with Labels */}
          <CNBInput insertNote={insertNote} />

          {/* List Area */}
          <CNBList notes={notes} removeNote={removeNote} />

          {/* Footer */}
          <CNBFooter handleSave={() => onSave(notes)} />

        </div>
      </div>
    </div>
  );
};

export default ClinicalNotesBuilder;



const blurWallStyle = cn(
  "fixed inset-0 z-60 p-4",  // position
  "flex items-center justify-center",   // flex
  "bg-black/50 backdrop-blur-sm",   // blur
)

const cnbStyle = cn(
  "w-full max-w-md overflow-hidden",  // box
  "bg-white dark:bg-black border shadow-2xl ",  // bg
  "border-zinc-200 dark:border-zinc-800 rounded-xl",  // border
)