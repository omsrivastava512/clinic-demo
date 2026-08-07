import { cn } from '@/lib/utils';
import { shouldChargeService, calculateServiceCharge } from '@/lib/patientUtils';

interface ServiceTagProps {
  serviceName: string;
  serviceCategory: 'STANDARD' | 'PREMIUM';
  standalonePrice: number;
  visitType: 'CONSULTATION' | 'MACHINE_ONLY';
}

export function ServiceTag({ serviceName, serviceCategory, standalonePrice, visitType }: ServiceTagProps) {
  // Ref: ADR-PP-28 — isCharged and chargedAmount derived at render time.
  const isCharged = shouldChargeService(serviceCategory, visitType);
  const chargedAmount = calculateServiceCharge(standalonePrice, serviceCategory, visitType);

  return (
    <span
      title={isCharged ? `₹${chargedAmount}` : 'Included in consult'}
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border',
        serviceCategory === 'PREMIUM'
          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900/50'
          : 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
      )}
    >
      {serviceName}
      {isCharged && <span className="ml-1 opacity-60">₹{chargedAmount}</span>}
    </span>
  );
}
