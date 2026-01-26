import type { ReactNode } from "react";

// ==========================================
// 4. MAIN LAYOUT (CATALOG VIEW)
// ==========================================
export const PresentationSection = ({hidden=false, title, number, description, children }: {hidden?:boolean, title: string; number: string; description: string; children: ReactNode; }) => (
    <section className="mb-32 max-w-5xl mx-auto w-full last:mb-0" >
        <div className="mb-6 px-4 md:mb-12 ml-2 max-w-3xl">
            <div className="flex items-baseline gap-4 md:gap-6 mb-4">
                <span className="text-4xl md:text-7xl font-serif text-zinc-400 dark:text-zinc-600 font-bold">{number}</span>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tight dark:text-white">{title}</h2>
                <pre>{hidden&&"hidden"}</pre>
            </div>
            <p className="dark:text-zinc-400 text-zinc-600 text-sm md:text-base leading-relaxed border-l-2 border-zinc-500 pl-4 md:pl-6 ml-2">
                {description}
            </p>
        </div>
        <div className="p-2 md:p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-2xl shadow-xl transition-colors duration-300" hidden={hidden} aria-hidden={hidden}>
            {children}
        </div>
    </section>
);
