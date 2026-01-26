import { useState, useEffect, useCallback } from 'react';
import { cn, deepCapitalizeWords } from '@/lib';
import { CNBHeader } from './CNBHeader';
import { CNBList } from './CNBList';
import { CNBInput } from './CNBInput';
import { CNBFooter } from './CNBFooter';
import useConfirm from '@/components/useConfirm';
import isEqual from 'lodash.isequal';


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
  const [ConfirmReplaceDialog, confirmReplace] = useConfirm("destructive", "Warning!", "Category Already Exists! Do you wish to replace it?", "Replace")

  const handleClose = useCallback(() => {
    if (!isEqual(initialNotes, notes)) {
      const confirmed = window.confirm('You have unsaved changes. Discard them?');
      if (!confirmed) return;
    }
    setNotes(initialNotes);
    onClose();
  }, [onClose, initialNotes, notes])


  // Close modal when press Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        console.log("Esc");
        handleClose();
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleClose])

  const insertNote = async (note: ClinicalNote) => {
    // DEBT: Type Assertion is vulnerable so add a runtime validation eventually
    const capitalizedNote = deepCapitalizeWords(note) as ClinicalNote

    // Update Existing Note
    if (notes.map(n => n.category.toLowerCase()).includes(capitalizedNote.category.toLowerCase())) {

      const conf = await confirmReplace()
      if (conf) setNotes(prev => prev.map(
        n => n.category.toLowerCase() === capitalizedNote.category.toLowerCase() ? capitalizedNote : n
      ))
      return conf;
    }
    // Insert New Note
    else setNotes(prev => ([
      ...prev,
      capitalizedNote
    ]));
    return true;
  };

  const removeNote = (key: string) => {
    setNotes(n => n.filter(n => n.category.toLowerCase() !== key.toLowerCase()));
  };

  return (
    <div className={blurWallStyle}>
      <ConfirmReplaceDialog />

      <div className={cnbStyle}>
        {/* Header */}
        <CNBHeader onClose={handleClose} />

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
  "fixed inset-0 z-20 p-4",  // position
  "flex items-center justify-center",   // flex
  "bg-black/50 backdrop-blur-sm",   // blur
)

const cnbStyle = cn(
  "w-full max-w-md overflow-hidden",  // box
  "bg-white dark:bg-black border shadow-2xl ",  // bg
  "border-zinc-200 dark:border-zinc-800 rounded-xl",  // border
)
