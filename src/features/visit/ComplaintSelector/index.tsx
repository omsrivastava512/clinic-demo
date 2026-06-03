import { useState, useRef, useCallback, useEffect } from "react";
import type { MedicalComplaint, Patient } from "@/types";
import { PatientHeader } from "./components/PatientHeader";
import { SectionLabel } from "./components/primitives";
import { NewComplaintInput } from "./components/NewComplaintInput";
import { FooterActions } from "./components/FooterActions";
import { ComplaintItem } from "./components/ComplaintItem";
import { CatalogSearchPopover } from "./components/CatalogSearchPopover";
import { COMPLAINT_CATALOG } from "@/data/complaints_catalog";
import { formatBracketText } from "@/lib";
import { useComplaintSelection } from "./hook/useComplaintSelection";

interface ComplaintSelectorProps {
  patient: Patient;
  // These are the patient's existing ACTIVE complaints — the checklist.
  availableComplaints: MedicalComplaint[];
  onConfirm: (selectedIds: string[]) => void;
  onCancel: () => void;
}

export const ComplaintSelector: React.FC<ComplaintSelectorProps> = ({
  patient,
  availableComplaints,
  onConfirm,
  onCancel,
}) => {
  const { add, remove, allComplaints, reset, selectedIds, toggle } =
    useComplaintSelection(availableComplaints);

  // ── "Add new complaint" input state ────────────────────────────────────────
  const [newComplaintInput, setNewComplaintInput] = useState("");
  // Controls popover visibility; opened on focus, closed by click-outside/Escape.
  const [popoverOpen, setPopoverOpen] = useState(false);
  // Ref is forwarded to the NewComplaintInput label element — the popover uses
  // it to measure position and detect click-outside correctly.
  const inputRef = useRef<HTMLLabelElement>(null);

  // Ref to the scrollable checklist container to programmatically adjust scroll position.
  // Choosing container.scrollTo over element.scrollIntoView to avoid layout jitter and keep scrolling contained strictly within the panel.
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Tracks the previous count of complaints to identify when a new item is added.
  const prevCountRef = useRef(allComplaints.length);

  // Scroll to the bottom of the list when a new complaint item is appended.
  // We check if the current count is greater than the previous count to avoid scrolling on deletion or initial mount.
  // We use a small setTimeout delay to allow the browser to complete layout calculations and paint the new item,
  // ensuring listContainerRef.current.scrollHeight is up-to-date and the item is fully visible.
  useEffect(() => {
    if (allComplaints.length > prevCountRef.current) {
      if (listContainerRef.current) {
        const container = listContainerRef.current;
        const timer = setTimeout(() => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }, 50);
        return () => clearTimeout(timer);
      }
    }
    prevCountRef.current = allComplaints.length;
  }, [allComplaints.length]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleCancel = () => {
    reset();
    setNewComplaintInput("");
    setPopoverOpen(false);
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selectedIds));
  };

  // Typing a completely free-form complaint and pressing Enter/clicking +
  const handleAddFreeText = () => {
    const trimmed = newComplaintInput.trim();
    const formatted = formatBracketText(trimmed);
    if (!formatted) return;
    add(formatted);
    setNewComplaintInput("");
    // Close the suggestions popover once an item has been successfully added.
    // This satisfies the requirement to dismiss suggestions immediately upon addition.
    setPopoverOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFreeText();
    }
    if (e.key === "Escape") {
      setPopoverOpen(false);
    }
  };

  // Picking an item from the catalog popover — we treat it like a free-text add
  // but using the catalog item's title, then mark it auto-selected.
  const handleCatalogSelect = useCallback(
    (item: MedicalComplaint) => {
      add(item.title);
      // Clear the query so the popover returns to the default "all" view,
      // ready for a possible second addition without visual clutter.
      setNewComplaintInput("");
      // Close the suggestions popover when an item is selected from the suggestions catalog list.
      setPopoverOpen(false);
    },
    [add]
  );

  // Grey-out catalog entries whose titles are already in the active list.
  // We match by lowercased title since catalog IDs differ from complaint IDs
  // produced by useComplaintSelection. O(n*m) but both sets are tiny (<60 items).
  const existingTitlesLower = new Set(allComplaints.map((c) => c.title.toLowerCase()));
  const catalogExistingIds = new Set(
    COMPLAINT_CATALOG
      .filter((c) => existingTitlesLower.has(c.title.toLowerCase()))
      .map((c) => c.id)
  );

  return (
    <div className="w-full max-h-[90dvh] flex flex-col max-w-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 shadow-2xl transition-colors duration-300">
      <PatientHeader patient={patient} />

      {/* ── Active complaints checklist ─────────────────────────────────────── */}
      {/* This is the PRIMARY workflow: the doctor checks off what they are treating
          today from the patient's existing active complaints. */}
      <div className="mb-4 flex-1 min-h-0 flex flex-col">
        <SectionLabel text="Select Visit Complaints (Multiple Allowed)" />

        {/* Scrollable checklist — flex-1 so it fills available space */}
        <div
          ref={listContainerRef}
          className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-3 pb-3"
        >
          {allComplaints.map((complaint) => (
            <ComplaintItem
              key={complaint.id}
              complaint={complaint}
              isSelected={selectedIds.has(complaint.id)}
              onToggle={toggle}
              remove={remove}
            />
          ))}
        </div>

        {/* ── Add New Complaint — sits BELOW the scroll area, always visible ──
             Moved out of the scrollable div intentionally: it acts as a sticky
             gateway and should never scroll out of view. */}
        <div className="mt-3">
          <NewComplaintInput
            ref={inputRef}
            value={newComplaintInput}
            onChange={(val) => {
              setNewComplaintInput(val);
              // Re-open suggestions popover if the user types or modifies text
              setPopoverOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onAdd={handleAddFreeText}
            onFocus={() => setPopoverOpen(true)}
            onClick={() => {
              // Re-open suggestions popover on clicking the focused input text box itself,
              // bypassing the limitation where focus events do not re-trigger on already focused elements.
              setPopoverOpen(true);
            }}
            onBlur={() => {/* intentionally empty — popover handles close */ }}
          />
        </div>
      </div>

      <FooterActions
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        isConfirmDisabled={selectedIds.size === 0}
      />

      {/* ── Catalog search popover (portal) ─────────────────────────────────
           Rendered at document.body level to escape overflow:hidden / max-h
           constraints of any ancestor. */}
      <CatalogSearchPopover
        anchorRef={inputRef}
        query={newComplaintInput}
        isOpen={popoverOpen}
        onSelect={handleCatalogSelect}
        onClose={() => setPopoverOpen(false)}
        existingIds={catalogExistingIds}
      />
    </div>
  );
};

export default ComplaintSelector;