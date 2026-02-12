import { useState, useMemo } from "react";
import type { MedicalComplaint } from "@/types";

export function useComplaintSelection(available: MedicalComplaint[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
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

  return {
    allComplaints,
    selectedIds,
    toggle,
    add,
    reset,
  };
}
