import { cn } from "@/lib";

export const getReferralButtonClass = (isActive: boolean) => cn(
    "px-4 py-2.5 rounded-xl border transition-all duration-150 cursor-pointer active:scale-[0.98]",
    "text-xs font-semibold flex-1 text-center",
    isActive
        ? cn(
            "bg-zinc-900 dark:bg-white",
            "border-zinc-900 dark:border-white",
            "text-white dark:text-black shadow-xs"
        )
        : cn(
            "bg-white dark:bg-zinc-900/50",
            "border-zinc-200 dark:border-zinc-800",
            "dark:text-zinc-400 text-zinc-600",
            "hover:bg-zinc-50 dark:hover:bg-zinc-900",
            "hover:border-zinc-300 dark:hover:border-zinc-700"
        )
);

export const defaultInputClasses = cn(
    "w-full bg-white dark:bg-zinc-900/60",
    "border border-zinc-200 dark:border-zinc-800",
    "text-zinc-900 dark:text-white text-base font-medium",
    "px-4 py-3 rounded-xl outline-none",
    "focus:border-zinc-400 dark:focus:border-zinc-500",
    "focus:ring-2 focus:ring-zinc-400/10",
    "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
    "transition-all duration-150"
);

export const intakeLayoutClasses = cn(
    "max-h-[90dvh]",
    "w-full max-w-xl mx-auto my-4",
    "bg-white dark:bg-zinc-950",
    "border border-zinc-200 dark:border-zinc-800 rounded-2xl",
    "shadow-2xl dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_48px_-12px_rgba(0,0,0,0.9)]",
    "overflow-hidden flex flex-col"
);

export const getToggleButtonClass = (isActive: boolean) => cn(
    "flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
    isActive
        ? cn(
            "bg-white dark:bg-zinc-800",
            "text-zinc-900 dark:text-white",
            "shadow-xs border border-zinc-200/80 dark:border-transparent"
        )
        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
);
