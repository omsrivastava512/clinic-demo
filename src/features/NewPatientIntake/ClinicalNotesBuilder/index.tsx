import { useState, useEffect } from 'preact/hooks';
import { cn } from '@/utils';
import { CNBHeader } from './CNBHeader';
import { CNBList } from './CNBList';
import { CNBInput } from './CNBInput';
import { CNBFooter } from './CNBFooter';

// Updated data structure to support the critical flag
export interface ClinicalNote {
  category: string;
  observation: string;
  isCritical: boolean;
}

const sortNotes = (n: ClinicalNote[]): ClinicalNote[] => n.sort((n1, n2) => +n2.isCritical - +n1.isCritical)

interface ClinicalNotesBuilderProps {
  onSave: (notes: ClinicalNote[]) => void;
  onClose: () => void;
  initialNotes?: ClinicalNote[];
}

export const ClinicalNotesBuilder = ({ onSave, onClose, initialNotes = [] }: ClinicalNotesBuilderProps) => {
  const [notes, setNotes] = useState<ClinicalNote[]>(initialNotes);

  // Close modal when press Escape
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') onClose();
    })
  }, [onClose])

  const insertNote = (note: ClinicalNote) => {
    // Update Existing Note
    if (notes.map(n => n.category).includes(note.category)) {
      const conf = confirm("⚠️WARNING: Category already exists! Do you wish to REPLACE it?")
      if (conf) setNotes(prev => prev.map(
        n => n.category === note.category ? note : n
      ))
      return;
    }
    // Insert New Note
    else setNotes(prev => ([
      ...prev,
      note
    ]));
  };

  const removeNote = (key: string) => {
    setNotes(n => n.filter(n => n.category !== key));
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
          <CNBList notes={sortNotes(notes)} removeNote={removeNote} />

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