import { cn } from '@/lib/utils';

interface ServiceTagProps {
  serviceName: string;
  isCharged: boolean;
  chargedAmount: number;
  serviceCategory: 'STANDARD' | 'PREMIUM';
}

export function ServiceTag({ serviceName, isCharged, chargedAmount, serviceCategory }: ServiceTagProps) {
  return (
    <span
      title={isCharged ? `₹${chargedAmount}` : 'Included in consult'}
      className={cn(
        'inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium border tabular-nums',
        serviceCategory === 'PREMIUM'
          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
          : 'bg-muted text-muted-foreground border-border'
      )}
    >
      {serviceName}
      {isCharged && <span className="ml-1 opacity-70 font-mono">₹{chargedAmount}</span>}
    </span>
  );
}
