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

// ── Color token map (Quiet, tinted clinical palette with 1px hairlines) ─────────
const VARIANT_CLASSES: Record<StatusBadgeVariant, string> = {
  // Alerts
  'allergy':      'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25',
  'fall-risk':    'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25',
  'dnr':          'bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500/25',
  'other':        'bg-muted text-muted-foreground border-border',
  // Status
  'active':       'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25',
  'completed':    'bg-muted/80 text-muted-foreground border-border/80',
  'expired':      'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25',
  // Visit type
  'consult':      'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/25',
  'machine-only': 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/25',
  // Payment
  'paid':         'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25',
  'pending':      'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25',
  'overdue':      'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25',
};

// ── Component ─────────────────────────────────────────────────────────────────
interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <Badge className={cn('border text-[11px] font-medium px-2 py-0.5 rounded-full', VARIANT_CLASSES[variant], className)}>
      {children}
    </Badge>
  );
}
