import { useState, useMemo } from "react";
import type { MedicalComplaint } from "@/types";

export function useComplaintSelection(available: MedicalComplaint[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set()); // O(1) lookup againts O(n) in array
  const [customComplaints, setCustomComplaints] = useState<MedicalComplaint[]>([]);

  const allComplaints = useMemo(
    () => [...available, ...customComplaints],
    [available, customComplaints]
  );

  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const add = (title: string) => {
    const newItem: MedicalComplaint = {
      id: crypto.randomUUID(),
      title,
      isActive: true,
      type: "NEW",
    };

    setCustomComplaints(prev => [...prev, newItem]);
    setSelectedIds(prev => (new Set(prev)).add(newItem.id));
  };

  const reset = () => {
    setSelectedIds(new Set());
    setCustomComplaints([]);
  };

  const remove = (id: string) => {
    // Avoid variable shadowing: using distinct names for the state array (prev) and the mapped elements (item)
    // to prevent lexical scope collision and satisfy the TS compiler/linter.
    setCustomComplaints(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return {
    allComplaints,
    selectedIds,
    toggle,
    add,
    remove,
    reset,
  };
}
