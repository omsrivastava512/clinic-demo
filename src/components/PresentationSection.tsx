import { useState, type ReactNode } from "react";
import { cn } from "../lib";

// ==========================================
// 4. MAIN LAYOUT (CATALOG VIEW)
// ==========================================

type PSProps = {
    hidden?: boolean,
    title: string;
    number: string;
    description?: ReactNode;
    features?: string[];
    upcoming?: string[];
    children: ReactNode;
    tag?: string;
    className?: string;
}
export const PresentationSection = ({ hidden = false, title, number, description, features, upcoming, children, tag, className }: PSProps) => {
    const [ishidden, setIsHidden] = useState(hidden)
    return (
        <section className="mb-32 max-w-5xl mx-auto w-full last:mb-0" >
            <div className="mb-6 px-4 m:mb-12 ml-2 max-w-3xl">
                <div className="flex items-baseline gap-4 md:gap-6 mb-4">
                    <span className="text-4xl md:text-7xl font-serif text-zinc-400 dark:text-zinc-600 font-bold">{number}</span>
                    <button onClick={() => setIsHidden(h => !h)} className="flex items-center gap-4 text-left">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight dark:text-white">{title}</h2>
                        {ishidden && <span className="text-sm bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500">Hidden</span>}
                    </button>
                </div>
                {description && (
                    <p className="dark:text-zinc-400 text-zinc-600 text-sm md:text-base leading-relaxed border-l-2 border-zinc-500 pl-4 md:pl-6 ml-2 mb-4">
                        {description}
                    </p>
                )}
                {features && features.length > 0 && (
                    <div className="ml-2 pl-4 md:pl-6 mb-4">
                        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Key Features</h4>
                        <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                            {features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                    </div>
                )}
                {upcoming && upcoming.length > 0 && (
                    <div className="ml-2 pl-4 md:pl-6">
                        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Upcoming Refinements</h4>
                        <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                            {upcoming.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                    </div>
                )}
            </div>
            <div id={tag} className={cn("p-2 md:p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-2xl shadow-xl transition-colors duration-300", className)} hidden={ishidden} aria-hidden={hidden}>
                {children}
            </div>
        </section>
    )
};

export default PresentationSection