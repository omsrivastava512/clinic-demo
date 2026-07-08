import { useSearchParams } from 'react-router-dom';

// Centralized, typed URL state management for patient profile
// Replaces inline useSearchParams calls spread across 3 components

type TabValue = 'overview' | 'visits' | 'purchases' | 'billings';
type VisitType = 'CONSULTATION' | 'MACHINE_ONLY' | '';

// Type guard functions for runtime validation of URL parameters
// Prevents unsafe type assertions and provides fallback for invalid values
function isValidTab(value: string | null): value is TabValue {
  return value === 'overview' || value === 'visits' || value === 'purchases' || value === 'billings';
}

function isValidVisitType(value: string | null): value is VisitType {
  return value === 'CONSULTATION' || value === 'MACHINE_ONLY' || value === '';
}

export function usePatientProfileUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Getters ─────────────────────────────────────────────────────────────────

  // Using type guards instead of unsafe type assertions
  // Falls back to default values if URL contains invalid data
  const rawTab = searchParams.get('tab');
  const tab: TabValue = isValidTab(rawTab) ? rawTab : 'overview';

  const rawType = searchParams.get('type');
  const visitType: VisitType = isValidVisitType(rawType) ? rawType : '';

  const complaintId = searchParams.get('complaint') ?? '';

  // ── Setters ─────────────────────────────────────────────────────────────────

  function setTab(value: TabValue) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', value);
      // Removed auto-clear logic — preserving user's filter state is less destructive
      // Users can explicitly call clearVisitFilters() if they want to reset
      return next;
    }, { replace: true });
  }

  function setVisitType(value: VisitType) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set('type', value);
      else next.delete('type');
      return next;
    }, { replace: true });
  }

  function setComplaintId(value: string) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set('complaint', value);
      else next.delete('complaint');
      return next;
    }, { replace: true });
  }

  function clearVisitFilters() {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.delete('type');
      next.delete('complaint');
      return next;
    }, { replace: true });
  }

  // Navigate to visits tab with optional filters
  function goToVisits(options?: { complaintId?: string; visitType?: VisitType }) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', 'visits');
      if (options?.complaintId) next.set('complaint', options.complaintId);
      else next.delete('complaint');
      if (options?.visitType) next.set('type', options.visitType);
      else next.delete('type');
      return next;
    }, { replace: true });
  }

  return {
    // State
    tab,
    visitType,
    complaintId,
    // Actions
    setTab,
    setVisitType,
    setComplaintId,
    clearVisitFilters,
    goToVisits,
  };
}
