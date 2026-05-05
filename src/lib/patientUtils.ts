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
