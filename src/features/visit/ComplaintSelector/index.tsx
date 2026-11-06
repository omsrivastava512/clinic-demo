import { useState, useRef, useCallback, useEffect, useId } from "react";
import type { MedicalComplaint, Patient } from "@/types";
import { PatientHeader } from "./components/PatientHeader";
import { SectionLabel } from "./components/primitives";
import { NewComplaintInput } from "./components/NewComplaintInput";
import { FooterActions } from "./components/FooterActions";
import { ComplaintItem } from "./components/ComplaintItem";
import { CatalogSearchPopover } from "./components/CatalogSearchPopover";
import { COMPLAINT_CATALOG, CATALOG_REGIONS, type CatalogRegion } from "@/data/complaints_catalog";
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

  // Generate dynamic, unique IDs to link the search input with its popover listbox
  // for accessibility. This guarantees DOM ID uniqueness even if multiple selectors are on the page.
  const uniqueId = useId();
  const inputId = `${uniqueId}-input`;
  const listboxId = `${uniqueId}-listbox`;

  // ── "Add new complaint" input state ────────────────────────────────────────
  const [newComplaintInput, setNewComplaintInput] = useState("");
  // Controls popover visibility; opened on focus, closed by click-outside/Escape.
  const [popoverOpen, setPopoverOpen] = useState(false);
  // Ref is forwarded to the NewComplaintInput label element — the popover uses
  // it to measure position and detect click-outside correctly.
  const inputRef = useRef<HTMLLabelElement>(null);

  // State for tracking currently focused item in the search results popover.
  // Lifted from the popover component to handle arrow keys cleanly via React event handling.
  const [focusedIndex, setFocusedIndex] = useState(0);

  // State to keep track of the currently filtered catalog items array.
  // Received from CatalogSearchPopover to clamp keyboard focus limits and handle selection.
  const [filteredCatalogItems, setFilteredCatalogItems] = useState<MedicalComplaint[]>([]);

  // State for the selected region filter chip. Lifted up to index.tsx to allow
  // unified keyboard navigation (ctrl + ArrowLeft/Right) inside the input's handleKeyDown.
  const [selectedRegion, setSelectedRegion] = useState<CatalogRegion>("All");

  // Ref to the scrollable checklist container to programmatically adjust scroll position.
  // Choosing container.scrollTo over element.scrollIntoView to avoid layout jitter and keep scrolling contained strictly within the panel.
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Derive state: reset focus index if filtered results change while popover is open.
  // This prevents staleness where focusedIndex points to the wrong item after list content changes.
  // Doing this during render avoids the react-hooks/set-state-in-effect warning.
  const [prevFilteredCatalogItems, setPrevFilteredCatalogItems] = useState(filteredCatalogItems);
  if (filteredCatalogItems !== prevFilteredCatalogItems) {
    setPrevFilteredCatalogItems(filteredCatalogItems);
    if (popoverOpen) {
      setFocusedIndex(0);
    }
  }

  // Tracks the previous count of complaints to identify when a new item is added for scrolling.
  const complaintsScrollRef = useRef(allComplaints.length);

  // Scroll to the bottom of the list when a new complaint item is appended.
  // We check if the current count is greater than the previous count to avoid scrolling on deletion or initial mount.
  // We use a small setTimeout delay to allow the browser to complete layout calculations and paint the new item,
  // ensuring listContainerRef.current.scrollHeight is up-to-date and the item is fully visible.
  useEffect(() => {
    const prevCount = complaintsScrollRef.current;
    complaintsScrollRef.current = allComplaints.length;
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

  // Note: Resetting of focusedIndex is now handled inline inside event handlers (onChange, onRegionChange, handleKeyDown, onClose)
  // and in the filteredCatalogItems derived state above to avoid cascading renders while maintaining full coverage.

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleCancel = () => {
    reset();
    setNewComplaintInput("");
    setPopoverOpen(false);
    onCancel();
    // Reset keyboard focus index on cancel
    setFocusedIndex(0);
    setSelectedRegion("All"); // Reset region chip filter on cancel
  };

  // Stable onClose callback to prevent the child component's click-outside event listener 
  // from repeatedly tearing down and rebuilding on every render.
  const handlePopoverClose = useCallback(() => {
    setPopoverOpen(false);
    setFocusedIndex(0);
  }, []);

  const handleConfirm = () => {
    onConfirm(Array.from(selectedIds));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Key navigation listener for search results.
    // ArrowDown, ArrowUp, Enter, and Ctrl+ArrowRight/Left keys are intercepted when the popover is open.
    if (popoverOpen) {
      // ctrl + ArrowRight/Left triggers region chip change
      if (e.ctrlKey && e.key === "ArrowRight") {
        e.preventDefault();
        const currentIndex = CATALOG_REGIONS.indexOf(selectedRegion);
        const nextIndex = (currentIndex + 1) % CATALOG_REGIONS.length;
        setSelectedRegion(CATALOG_REGIONS[nextIndex]);
        setFocusedIndex(0);
        return;
      }
      if (e.ctrlKey && e.key === "ArrowLeft") {
        e.preventDefault();
        const currentIndex = CATALOG_REGIONS.indexOf(selectedRegion);
        const nextIndex = (currentIndex - 1 + CATALOG_REGIONS.length) % CATALOG_REGIONS.length;
        setSelectedRegion(CATALOG_REGIONS[nextIndex]);
        setFocusedIndex(0);
        return;
      }

      if (filteredCatalogItems.length > 0) {
        const safeIndex = Math.max(0, Math.min(focusedIndex, filteredCatalogItems.length - 1));

        if (e.key === "ArrowDown") {
          e.preventDefault();
          // Clamp focus to the last element of the list
          setFocusedIndex(Math.min(safeIndex + 1, filteredCatalogItems.length - 1));
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          // Clamp focus to the first element of the list
          setFocusedIndex(Math.max(safeIndex - 1, 0));
          return;
        }
        if (e.key === "Enter") {
          // Intercept enter press to select highlighted catalog suggestion item
          const item = filteredCatalogItems[safeIndex];
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

    if (e.key === "Escape") {
      setPopoverOpen(false);
      setSelectedRegion("All"); // Reset region chip to All on escape
      setFocusedIndex(0);
    }
  };

  // Picking an item from the catalog popover — we treat it like a free-text add
  // but using the catalog item's title, then mark it auto-selected.
  const handleCatalogSelect = (item: MedicalComplaint) => {
    add(item.title);
    setNewComplaintInput("");
    setFocusedIndex(0);
  };

  // Grey-out catalog entries whose titles are already in the active list.
  const existingTitlesLower = new Set(allComplaints.map((c) => c.title.toLowerCase()));
  const catalogExistingIds = new Set(
    COMPLAINT_CATALOG
      .filter((c) => existingTitlesLower.has(c.title.toLowerCase()))
      .map((c) => c.id)
  );

  // Compute a structurally safe index that can never be out of bounds, 
  // regardless of how or why the list length changes.
  const safeFocusedIndex = Math.max(0, Math.min(focusedIndex, Math.max(0, filteredCatalogItems.length - 1)));

  return (
    <div className="w-full max-h-[90dvh] flex flex-col max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl transition-colors duration-150">
      <PatientHeader patient={patient} />

      {/* ── Active complaints checklist ─────────────────────────────────────── */}
      <div className="mb-4 flex-1 min-h-0 flex flex-col">
        <SectionLabel text="Select Visit Complaints (Multiple Allowed)" />

        {/* Scrollable checklist — flex-1 so it fills available space */}
        <div
          ref={listContainerRef}
          className="flex-1 min-h-0 space-y-2.5 overflow-y-auto pr-2 pb-2"
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

        {/* ── Add New Complaint — sits BELOW the scroll area, always visible ── */}
        <div className="mt-4">
          <NewComplaintInput
            ref={inputRef}
            value={newComplaintInput}
            onChange={(val) => {
              setNewComplaintInput(val);
              setPopoverOpen(true);
              setFocusedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setPopoverOpen(true)}
            onClick={() => {
              setPopoverOpen(true);
            }}
            onBlur={() => {}}
            inputId={inputId}
            listboxId={listboxId}
            popoverOpen={popoverOpen}
            focusedIndex={safeFocusedIndex}
          />
        </div>
      </div>

      <FooterActions
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        isConfirmDisabled={selectedIds.size === 0}
      />

      <CatalogSearchPopover
        anchorRef={inputRef}
        query={newComplaintInput}
        isOpen={popoverOpen}
        onSelect={handleCatalogSelect}
        onClose={handlePopoverClose}
        existingIds={catalogExistingIds}
        focusedIndex={safeFocusedIndex}
        listboxId={listboxId}
        onFilteredItemsChange={setFilteredCatalogItems}
        selectedRegion={selectedRegion}
        onRegionChange={(region) => {
          setSelectedRegion(region);
          setFocusedIndex(0);
        }}
      />
    </div>
  );
};

export default ComplaintSelector;
