import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import type { MedicalComplaint, Patient } from "@/types";
import { PatientHeader } from "./components/PatientHeader";
import { SectionLabel } from "./components/primitives";
import { NewComplaintInput } from "./components/NewComplaintInput";
import { FooterActions } from "./components/FooterActions";
import { ComplaintItem } from "./components/ComplaintItem";
import { CatalogSearchPopover } from "./components/CatalogSearchPopover";
import { COMPLAINT_CATALOG, CATALOG_REGIONS, type CatalogRegion } from "@/data/complaints_catalog";
import { useComplaintSelection } from "./hook/useComplaintSelection";

// C3: Dynamic ARIA control IDs. We declare them as constants to link the combobox input
// with its option listbox elements correctly for accessibility.
const INPUT_ID = "new_complaint_input";
const LISTBOX_ID = "new_complaint_listbox";

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

  // C3: State for tracking currently focused item in the search results popover.
  // Lifted from the popover component to handle arrow keys cleanly via React event handling.
  const [focusedIndex, setFocusedIndex] = useState(0);

  // C3: State to keep track of the currently filtered catalog items array.
  // Received from CatalogSearchPopover to clamp keyboard focus limits and handle selection.
  const [filteredCatalogItems, setFilteredCatalogItems] = useState<MedicalComplaint[]>([]);

  // C3: State for the selected region filter chip. Lifted up to index.tsx to allow
  // unified keyboard navigation (ctrl + ArrowLeft/Right) inside the input's handleKeyDown.
  const [selectedRegion, setSelectedRegion] = useState<CatalogRegion>("All");

  // Ref to the scrollable checklist container to programmatically adjust scroll position.
  // Choosing container.scrollTo over element.scrollIntoView to avoid layout jitter and keep scrolling contained strictly within the panel.
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Tracks the previous count of complaints to identify when a new item is added.
  const complaintsCountRef = useRef(allComplaints.length);

  // Scroll to the bottom of the list when a new complaint item is appended.
  // We check if the current count is greater than the previous count to avoid scrolling on deletion or initial mount.
  // We use a small setTimeout delay to allow the browser to complete layout calculations and paint the new item,
  // ensuring listContainerRef.current.scrollHeight is up-to-date and the item is fully visible.
  useEffect(() => {
    const prevCount = complaintsCountRef.current;
    complaintsCountRef.current = allComplaints.length;

    if (allComplaints.length > prevCount && listContainerRef.current) {
      const container = listContainerRef.current;
      const timer = setTimeout(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [allComplaints.length]);

  // C3: Reset focused index to the first element (0) by default whenever the search results change.
  // This satisfies the requirement to have default focus on the first search result.
  useEffect(() => {
    setFocusedIndex(0);
  }, [filteredCatalogItems]);

  // C3: Reset focused index to the first element when the popover closes.
  useEffect(() => {
    if (!popoverOpen) {
      setFocusedIndex(0);
    }
  }, [popoverOpen]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleCancel = () => {
    reset();
    setNewComplaintInput("");
    setPopoverOpen(false);
    onCancel();
    // C3: Reset keyboard focus index on cancel
    setFocusedIndex(0);
    setSelectedRegion("All"); // Reset region chip filter on cancel
  };

  // Stable onClose callback to prevent the child component's click-outside event listener 
  // from repeatedly tearing down and rebuilding on every render.
  const handlePopoverClose = useCallback(() => setPopoverOpen(false), []);

  const handleConfirm = () => {
    onConfirm(Array.from(selectedIds));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // C3: Key navigation listener for search results.
    // ArrowDown, ArrowUp, Enter, and Ctrl+ArrowRight/Left keys are intercepted when the popover is open.
    if (popoverOpen) {
      // ctrl + ArrowRight/Left triggers region chip change
      if (e.ctrlKey && e.key === "ArrowRight") {
        e.preventDefault();
        const currentIndex = CATALOG_REGIONS.indexOf(selectedRegion);
        const nextIndex = (currentIndex + 1) % CATALOG_REGIONS.length;
        setSelectedRegion(CATALOG_REGIONS[nextIndex]);
        return;
      }
      if (e.ctrlKey && e.key === "ArrowLeft") {
        e.preventDefault();
        const currentIndex = CATALOG_REGIONS.indexOf(selectedRegion);
        const nextIndex = (currentIndex - 1 + CATALOG_REGIONS.length) % CATALOG_REGIONS.length;
        setSelectedRegion(CATALOG_REGIONS[nextIndex]);
        return;
      }

      if (filteredCatalogItems.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          // Clamp focus to the last element of the list
          setFocusedIndex((prev) => Math.min(prev + 1, filteredCatalogItems.length - 1));
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          // Clamp focus to the first element of the list
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          return;
        }
        if (e.key === "Enter") {
          // Intercept enter press to select highlighted catalog suggestion item
          if (focusedIndex >= 0 && focusedIndex < filteredCatalogItems.length) {
            const item = filteredCatalogItems[focusedIndex];
            const alreadyAdded = catalogExistingIds.has(item.id);
            if (!alreadyAdded) {
              e.preventDefault();
              handleCatalogSelect(item);
              return;
            } else {
              // Block adding disabled suggestion as custom text
              e.preventDefault();
              return;
            }
          }
        }
      }
    }

    if (e.key === "Escape") {
      setPopoverOpen(false);
      setSelectedRegion("All"); // Reset region chip to All on escape
    }
  };

  // Picking an item from the catalog popover — we treat it like a free-text add
  // but using the catalog item's title, then mark it auto-selected.
  // TODO: Future optimization (Option 2): If catalog search results performance degrades,
  // we can wrap this in a useCallback (requires wrapping the custom hook's `add` in useCallback first)
  // and wrap CatalogSearchPopover in React.memo to prevent unnecessary re-renders.
  const handleCatalogSelect = (item: MedicalComplaint) => {
    add(item.title);
    // Clear the query so the popover returns to the default "all" view,
    // ready for a possible second addition without visual clutter.
    setNewComplaintInput("");
    // We intentionally keep the popover open on item selection to support multiple selections in a row.
    // This is a trade-off where the user has to close the popover explicitly (e.g. click outside, Escape, Cancel),
    // but it speeds up multi-selection workflows significantly.
    // C3: Reset keyboard focus index on selection
    setFocusedIndex(0);
  }

  // Grey-out catalog entries whose titles are already in the active list.
  // We match by lowercased title since catalog IDs differ from complaint IDs
  // produced by useComplaintSelection. O(n*m) but both sets are tiny (<60 items).
  // TODO: [Backend Integration] When a backend API is added, store the catalog ID on the
  // active complaint schema. This will allow matching by stable ID instead of title strings.
  const catalogExistingIds = useMemo(() => {
    const existingTitlesLower = new Set(allComplaints.map((c) => c.title.toLowerCase()))
    return new Set(
      COMPLAINT_CATALOG
        .filter((c) => existingTitlesLower.has(c.title.toLowerCase()))
        .map((c) => c.id)
    )
  }, [allComplaints]);

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
            onFocus={() => setPopoverOpen(true)}
            onClick={() => {
              // Re-open suggestions popover on clicking the focused input text box itself,
              // bypassing the limitation where focus events do not re-trigger on already focused elements.
              setPopoverOpen(true);
            }}
            onBlur={() => {/* intentionally empty — popover handles close */ }}
            // C3: Pass down ARIA properties to bind them directly on the input element
            inputId={INPUT_ID}
            listboxId={LISTBOX_ID}
            popoverOpen={popoverOpen}
            focusedIndex={focusedIndex}
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
        onClose={handlePopoverClose}
        existingIds={catalogExistingIds}
        // C3: Pass down state and callback props to keep popover in sync with lifted navigation state
        focusedIndex={focusedIndex}
        listboxId={LISTBOX_ID}
        onFilteredItemsChange={setFilteredCatalogItems}
        // C3: Pass down lifted region state and setter callback
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />
    </div>
  );
};

export default ComplaintSelector;