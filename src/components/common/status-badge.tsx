import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ── Semantic variant names ────────────────────────────────────────────────────
export type StatusBadgeVariant =
  // Alert types
  | 'allergy'
  | 'fall-risk'
  | 'dnr'
  | 'other'
  // Course / package status
  | 'active'
  | 'completed'
  | 'expired'
  // Visit type
  | 'consult'
  | 'machine-only'
  // Payment status
  | 'paid'
  | 'pending'
  | 'overdue';

// ── Color token map ───────────────────────────────────────────────────────────
const VARIANT_CLASSES: Record<StatusBadgeVariant, string> = {
  // Alerts
  'allergy':      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-900/50',
  'fall-risk':    'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-900/50',
  'dnr':          'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-900/50',
  'other':        'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700',
  // Status
  'active':       'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-900/50',
  'completed':    'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
  'expired':      'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-900/50',
  // Visit type
  'consult':      'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:border-violet-900/50',
  'machine-only': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-900/50',
  // Payment
  'paid':         'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-900/50',
  'pending':      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-900/50',
  'overdue':      'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-900/50',
};

// ── Component ─────────────────────────────────────────────────────────────────
interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <Badge className={cn('border', VARIANT_CLASSES[variant], className)}>
      {children}
    </Badge>
  );
}
