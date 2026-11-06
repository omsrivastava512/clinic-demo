import { useState, type ReactNode } from "react";
import { cn } from "../lib";

// ==========================================
// MAIN LAYOUT (CATALOG VIEW)
// ==========================================

type PSProps = {
    hidden?: boolean;
    title: string;
    number: string;
    description?: ReactNode;
    features?: string[];
    upcoming?: string[];
    children: ReactNode;
    tag?: string;
    className?: string;
};

export const PresentationSection = ({
    hidden = false,
    title,
    number,
    description,
    features,
    upcoming,
    children,
    tag,
    className
}: PSProps) => {
    const [ishidden, setIsHidden] = useState(hidden);

    return (
        <section className="mb-24 max-w-5xl mx-auto w-full last:mb-0">
            <div className="mb-8 px-2 max-w-3xl">
                <div className="flex items-baseline gap-4 md:gap-6 mb-3">
                    <span className="text-5xl md:text-7xl font-serif text-zinc-300 dark:text-zinc-700 font-bold select-none tracking-tight">
                        {number}
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsHidden(h => !h)}
                        className="flex items-center gap-3 text-left group cursor-pointer"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
                            {title}
                        </h2>
                        {ishidden && (
                            <span className="text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                                Hidden
                            </span>
                        )}
                    </button>
                </div>

                {description && (
                    <div className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed border-l-2 border-zinc-400 dark:border-zinc-700 pl-4 md:pl-6 ml-2 mb-5">
                        {description}
                    </div>
                )}

                {features && features.length > 0 && (
                    <div className="ml-2 pl-4 md:pl-6 mb-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                            Key Features
                        </h4>
                        <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                            {features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {upcoming && upcoming.length > 0 && (
                    <div className="ml-2 pl-4 md:pl-6">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                            Upcoming Refinements
                        </h4>
                        <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                            {upcoming.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div
                id={tag}
                className={cn(
                    "p-4 sm:p-6 md:p-8 bg-white dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800/80 rounded-2xl shadow-xl dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_48px_-12px_rgba(0,0,0,0.9)] transition-all",
                    className
                )}
                hidden={ishidden}
                aria-hidden={ishidden}
            >
                {children}
            </div>
        </section>
    );
};

export default PresentationSection;
