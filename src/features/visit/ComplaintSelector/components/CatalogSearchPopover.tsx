import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib";
import { COMPLAINT_CATALOG, CATALOG_REGIONS, type CatalogRegion } from "@/data/complaints_catalog";
import type { MedicalComplaint } from "@/types";

interface CatalogSearchPopoverProps {
  /** The input element to anchor the popover under. */
  anchorRef: React.RefObject<HTMLElement | null>;
  /** Current text in the search input — used to filter catalog entries. */
  query: string;
  /** Whether the popover should be visible. */
  isOpen: boolean;
  /** Called when the user picks an item from the catalog.
   *  The parent will turn this into a real active complaint. */
  onSelect: (complaint: MedicalComplaint) => void;
  /** Called when we decide the popover should close (click-outside, Escape). */
  onClose: () => void;
  /** IDs that are already active on the patient — we grey these out. */
  existingIds: Set<string>;
}

export const CatalogSearchPopover: React.FC<CatalogSearchPopoverProps> = ({
  anchorRef,
  query,
  isOpen,
  onSelect,
  onClose,
  existingIds,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<CatalogRegion>("All");

  // ── Position popover directly below the anchor ──────────────────────────────
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const updateCoords = useCallback(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setCoords({
      // position:fixed is viewport-relative — getBoundingClientRect() is already
      // in viewport coords, so we must NOT add scrollY/scrollX here.
      top: rect.bottom + 6, // 6px gap below the input
      left: rect.left,
      width: rect.width,
    });
  }, [anchorRef]);

  // Recalculate on open and on scroll/resize so the popover tracks the input.
  useEffect(() => {
    if (!isOpen) return;
    updateCoords();
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords, true);
    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [isOpen, updateCoords]);

  // ── Click-outside detection ──────────────────────────────────────────────────
  // We listen on mousedown (not click) so we can intercept before focus changes.
  // We intentionally keep the popover open when the user clicks inside it OR
  // on the anchor input itself (the parent controls `isOpen` via focus).
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const insidePopover = popoverRef.current?.contains(target);
      const insideAnchor = anchorRef.current?.contains(target);
      if (!insidePopover && !insideAnchor) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, anchorRef, onClose]);

  // ── Reset region filter when the user clears the query ───────────────────
  useEffect(() => {
    if (!query) setSelectedRegion("All");
  }, [query]);

  // ── Filter logic ────────────────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    return COMPLAINT_CATALOG.filter((c) => {
      const matchesRegion = selectedRegion === "All" || c.region === selectedRegion;
      const matchesQuery = !query || c.title.toLowerCase().includes(query.toLowerCase());
      return matchesRegion && matchesQuery;
    });
  }, [query, selectedRegion]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={popoverRef}
      // Positioned fixed so it escapes any overflow:hidden parents.
      // z-50 puts it above modals/drawers at z-40.
      style={{
        position: "fixed",
        top: coords.top,
        left: coords.left,
        width: coords.width,
        zIndex: 50,
      }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl overflow-hidden"
    >
      {/* ── Region chips ─────────────────────────────────────────────────── */}
      {/* Scrollable horizontal strip — no scrollbar visible (hide-scrollbar util) */}
      <div className="flex gap-1.5 overflow-x-auto px-3 pt-3 pb-2 hide-scrollbar">
        {CATALOG_REGIONS.map((region) => (
          <button
            key={region}
            type="button"
            // Prevent the mousedown from bubbling up and triggering onClose
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setSelectedRegion(region)}
            className={cn(
              "shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-all",
              selectedRegion === region
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent"
                : "bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500"
            )}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Thin divider between chips and list */}
      <div className="h-px bg-zinc-100 dark:bg-zinc-800 mx-3" />

      {/* ── Filtered results list ────────────────────────────────────────── */}
      {/* ~2.5 cards tall; each row is ~44px, so ~2.5 * 44 ≈ 110px.
          max-h-28 ≈ 112px — close enough without a magic number. */}
      <div className="max-h-28 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <p className="px-4 py-3 text-xs text-zinc-400 dark:text-zinc-500">
            No matches — type a custom complaint and press Enter
          </p>
        ) : (
          filteredItems.map((item) => {
            const alreadyAdded = existingIds.has(item.id);
            return (
              <button
                key={item.id}
                type="button"
                // Prevent blur on the search input from firing before onClick
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => !alreadyAdded && onSelect(item)}
                disabled={alreadyAdded}
                className={cn(
                  "w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors",
                  alreadyAdded
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                )}
              >
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100 leading-tight">
                  {item.title}
                </span>
                {item.region && (
                  <span className="ml-2 shrink-0 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wide">
                    {item.region}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>,
    document.body
  );
};
