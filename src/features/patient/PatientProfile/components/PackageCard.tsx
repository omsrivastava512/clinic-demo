import type { PackageRecord } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface PackageCardProps {
  pkg: PackageRecord;
}

// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: AI_PROPOSAL_APPROVED]:
// Variant 4 — "Shadcn Card with Permanent Dot Grid". Combines clean Shadcn layout with tiny dot grid tracking, removing collapsible wrapper.

const STATUS_BADGE_VARIANT: Record<PackageRecord['status'], 'default' | 'secondary' | 'outline' | 'destructive'> = {
  Active: 'default',
  Completed: 'secondary',
  Expired: 'destructive',
};

// DECISION [ORIGIN: AI_AUTONOMOUS]: Added subtle left border for status visual anchor without heavy gradients.
const STATUS_BORDER: Record<PackageRecord['status'], string> = {
  Active: 'border-l-blue-500 dark:border-l-blue-500',
  Completed: 'border-l-zinc-300 dark:border-l-zinc-600',
  Expired: 'border-l-rose-500 dark:border-l-rose-600',
};

function parseSafeDate(dateStr: string): Date {
  // DECISION [TRIGGER: RUNTIME_BUG] [ORIGIN: AI_AUTONOMOUS]: Manually parse YYYY-MM-DD to construct local Date, preventing UTC midnight timezone shift bugs.
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(dateStr);
}

function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? parseSafeDate(dateInput) : dateInput;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getDayDate(startDateStr: string, dayIndex: number, excludeSundays: boolean): Date {
  const date = parseSafeDate(startDateStr);
  let daysAdded = 0;
  while (daysAdded < dayIndex) {
    date.setDate(date.getDate() + 1);
    if (excludeSundays && date.getDay() === 0) {
      continue; // Skip Sunday
    }
    daysAdded++;
  }
  return date;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const {
    packageName, linkedComplaintName,
    purchaseDate, expiryDate, durationDays,
    attendedDays, missedDays, status,
    excludeSundays, amountPaid, dayLog,
  } = pkg;

  const elapsedDays = attendedDays + missedDays;
  const remainingDays = Math.max(0, durationDays - elapsedDays);
  const isActive = status === 'Active';

  return (
    <Card className={`group relative transition-shadow hover:shadow-md border-l-4 ${STATUS_BORDER[status]} gap-2`}>
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="truncate text-base">{packageName}</CardTitle>
            <CardDescription className="truncate mt-1 flex items-center gap-1.5">
              {linkedComplaintName}
              {excludeSundays && (
                <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded-full">
                  Excl. Sundays
                </span>
              )}
            </CardDescription>
          </div>
          <Badge
            variant={STATUS_BADGE_VARIANT[status]}
            className={`shrink-0 ${status === 'Active' ? 'bg-blue-500 hover:bg-blue-600 text-white border-transparent dark:bg-blue-600 dark:hover:bg-blue-700' : ''
              }`}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Primary Info Row */}
        <div className="flex justify-between items-end gap-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-3xl font-bold tracking-tight ${isActive ? 'text-zinc-900 dark:text-zinc-50' : 'text-zinc-500'}`}>
                {isActive ? remainingDays : durationDays}
              </span>
              <span className={`text-sm font-medium ${isActive ? 'text-zinc-900 dark:text-zinc-50' : 'text-zinc-500'}`}>
                {isActive ? 'Days Left' : 'Days Total'}
              </span>
            </div>
            {/* DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
                Replaced single date string with explicit Start/Expires labels per user request in compact inline layout. */}
            <div className="flex items-center gap-3 mt-1.5">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">Start</p>
                <p className={`text-xs font-medium ${isActive ? 'text-zinc-900 dark:text-zinc-50' : 'text-zinc-500'}`}>{formatDate(purchaseDate)}</p>
              </div>
              <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">Expires</p>
                <p className={`text-xs font-medium ${isActive ? 'text-zinc-900 dark:text-zinc-50' : 'text-zinc-500'}`}>{formatDate(expiryDate)}</p>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">Amount Paid</p>
            <p className="font-semibold text-sm">₹{amountPaid.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* DECISION [ORIGIN: AI_AUTONOMOUS]: Replaced collapsible section with permanent dot grid attendance summary. */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              {elapsedDays} of {durationDays} Days Elapsed
            </span>
            <div className="flex gap-3 text-[10px] font-medium">
              {/* DECISION [TRIGGER: PRODUCT_SPEC] [ORIGIN: AI_AUTONOMOUS]:
                  Changed attended color from emerald to blue for red-green color blindness accessibility. */}
              <span className="text-blue-600 dark:text-blue-500">{attendedDays} Attended</span>
              {missedDays > 0 && (
                <span className="text-rose-600 dark:text-rose-500">{missedDays} Missed</span>
              )}
            </div>
          </div>

          {/* DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: AI_AUTONOMOUS]:
              Added sr-only text for screen readers and aria-hidden on dot grid for accessible attendance reading. */}
          <span className="sr-only">
            Attendance summary: {attendedDays} attended, {missedDays} missed out of {durationDays} total days.
          </span>
          <div className="flex flex-wrap gap-1.5" aria-hidden="true">
            {dayLog.map((dayStatus, idx) => {
              const actualDate = getDayDate(purchaseDate, idx, excludeSundays);
              const dateStr = formatDate(actualDate);

              return (
                <Popover key={`${(pkg as any).id}-day-${idx}`}>
                  <PopoverTrigger
                    className={`w-2 h-2 rounded-full transition-transform hover:scale-150 cursor-pointer p-0 border-0 shrink-0 ${dayStatus === 'attended' ? 'bg-blue-500' :
                      dayStatus === 'missed' ? 'bg-rose-500' :
                        'bg-zinc-200 dark:bg-zinc-800'
                      }`}
                  />
                  <PopoverContent side="top" align="center" className="w-auto px-2 py-1 text-xs font-medium bg-zinc-900 text-zinc-50 border-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
                    {dateStr} | {dayStatus.charAt(0).toUpperCase() + dayStatus.slice(1)}
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
