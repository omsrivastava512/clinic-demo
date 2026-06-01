import type { LucideIcon } from "lucide-react"
import { TrendingUp, ArrowUp, ArrowDown, Minus } from "lucide-react"
import type { TimelineEvent, VitalSign } from "@/types/index"

/**
 * Returns 2-character uppercase initials from a full name.
 * - Multi-word names: first letter of first word + first letter of last word.
 * - Single-word names: first 2 characters of that word.
 * - Empty string: returns "??" as a safe fallback.
 */
export function getInitials(fullName: string): string {
  const trimmed = fullName.trim()
  if (!trimmed) return "??"

  const words = trimmed.split(/\s+/)
  if (words.length === 1) {
    // Single word — use first 2 chars (pad with the same char if only 1 char long)
    const word = words[0]
    if (word.length === 1) return (word[0] + word[0]).toUpperCase()
    return (word[0] + word[1]).toUpperCase()
  }

  // Multi-word — first letter of first word + first letter of last word
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

/**
 * Formats an ISO 8601 timestamp string into a human-readable date.
 * Returns "Invalid date" for empty, null-ish, or unparseable input.
 *
 * Example output: "Jan 15, 2024"
 */
export function formatTimestamp(isoString: string): string {
  if (!isoString || typeof isoString !== "string") return "Invalid date"

  const date = new Date(isoString)
  if (isNaN(date.getTime())) return "Invalid date"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Calculates age in whole years from a date-of-birth string.
 * Returns 0 for future dates or invalid input.
 *
 * @param dateOfBirth - Date string in YYYY-MM-DD format (or any parseable date string)
 */
export function calculateAge(dateOfBirth: string): number {
  if (!dateOfBirth || typeof dateOfBirth !== "string") return 0

  const dob = new Date(dateOfBirth)
  if (isNaN(dob.getTime())) return 0

  const today = new Date()
  if (dob > today) return 0

  let age = today.getFullYear() - dob.getFullYear()

  // Adjust if the birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1
  }

  return age
}

/**
 * Filters a timeline array to only include events matching the given category.
 * Does not mutate the original array and preserves event order.
 *
 * @param timeline - Array of TimelineEvent objects
 * @param category - The category to filter by
 * @returns A new array containing only events with the matching category
 */
export function filterTimelineByCategory(
  timeline: TimelineEvent[],
  category: TimelineEvent["category"]
): TimelineEvent[] {
  const filtered: TimelineEvent[] = []

  for (let i = 0; i < timeline.length; i++) {
    if (timeline[i].category === category) {
      filtered.push(timeline[i])
    }
  }

  return filtered
}

/**
 * Returns a status object (color, icon, label) based on a VitalSign's trend.
 *
 * - NORMAL → emerald/green, TrendingUp icon, "Normal"
 * - HIGH   → red, ArrowUp icon, "High"
 * - LOW    → amber, ArrowDown icon, "Low"
 * - default → zinc/grey, Minus icon, "Unknown"
 */
export function calculateVitalStatus(vital: VitalSign): {
  color: string
  icon: LucideIcon
  label: string
} {
  switch (vital.trend) {
    case "NORMAL":
      return {
        color: "text-emerald-600 dark:text-emerald-500",
        icon: TrendingUp,
        label: "Normal",
      }
    case "HIGH":
      return {
        color: "text-red-600 dark:text-red-500",
        icon: ArrowUp,
        label: "High",
      }
    case "LOW":
      return {
        color: "text-amber-600 dark:text-amber-500",
        icon: ArrowDown,
        label: "Low",
      }
    default:
      return {
        color: "text-zinc-500",
        icon: Minus,
        label: "Unknown",
      }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Billing Utilities ─────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
//
// ⚠️ EXPERIMENTAL: No consumers yet. Added to document business logic from
// requirements, but billing UI hasn't been built. May need adjustment when
// actually implemented. See @experimental tags on each function.
//
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Pure function to calculate if a service should be charged.
 * 
 * @experimental This function has no consumers yet. It was added to document
 * billing business logic from requirements, but the billing UI hasn't been built.
 * When building the billing UI, validate these rules against actual requirements
 * before using — they may need adjustment.
 * 
 * Billing logic (from requirements):
 * - PREMIUM services are always charged (e.g., cupping, ISTM)
 * - STANDARD services are free in CONSULTATION visits, charged in MACHINE_ONLY
 * 
 * @param serviceCategory - 'STANDARD' or 'PREMIUM'
 * @param visitType - 'CONSULTATION' or 'MACHINE_ONLY'
 * @returns true if the service should be charged
 */
export function shouldChargeService(
  serviceCategory: 'STANDARD' | 'PREMIUM',
  visitType: 'CONSULTATION' | 'MACHINE_ONLY'
): boolean {
  if (serviceCategory === 'PREMIUM') return true;
  return visitType === 'MACHINE_ONLY';
}

/**
 * Pure function to calculate the charged amount for a service.
 * 
 * @experimental This function has no consumers yet. It was added to document
 * billing business logic from requirements, but the billing UI hasn't been built.
 * When building the billing UI, validate these rules against actual requirements
 * before using — they may need adjustment.
 * 
 * @param standalonePrice - The service's standalone price
 * @param serviceCategory - 'STANDARD' or 'PREMIUM'
 * @param visitType - 'CONSULTATION' or 'MACHINE_ONLY'
 * @returns The amount to charge (0 if not charged)
 */
export function calculateServiceCharge(
  standalonePrice: number,
  serviceCategory: 'STANDARD' | 'PREMIUM',
  visitType: 'CONSULTATION' | 'MACHINE_ONLY'
): number {
  return shouldChargeService(serviceCategory, visitType) ? standalonePrice : 0;
}

/**
 * Pure function to calculate consultation fee based on type.
 * 
 * @experimental This function has no consumers yet. It was added to document
 * billing business logic from requirements, but the billing UI hasn't been built.
 * When building the billing UI, validate these rules against actual requirements
 * before using — they may need adjustment.
 * 
 * @param visitType - 'CONSULTATION' or 'MACHINE_ONLY'
 * @param consultationType - 'FIRST' or 'SUBSEQUENT' (only for CONSULTATION)
 * @returns The consultation fee (0 for MACHINE_ONLY)
 */
export function calculateConsultationFee(
  visitType: 'CONSULTATION' | 'MACHINE_ONLY',
  consultationType?: 'FIRST' | 'SUBSEQUENT'
): number {
  if (visitType === 'MACHINE_ONLY') return 0;
  // Assumed pricing: FIRST = 300, SUBSEQUENT = 200
  return consultationType === 'FIRST' ? 300 : 200;
}
