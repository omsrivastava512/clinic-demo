import { NavLink, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextExpander from './TextExpander';

export const DemoAppHeader = ({ formattedDate }: { formattedDate: string; }) => (
    <header className="text-center max-w-4xl mx-auto mb-14 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3 font-sans">
            Clinic App Catalogue
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Modular React + TS components for Indian Physiotherapy Clinics.
        </p>

        <TextExpander collapseLabel="" className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-center py-2 text-sm">
            This is not the final clinic application. It is a component catalogue and interaction prototype for a clinic management system. The goal is to validate each UI module individually before those components are integrated into a full backend-connected product. Check out the roadmap to understand the full scope of the project.
        </TextExpander>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mt-3 font-mono">
            <span>Last Updated: {formattedDate}</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <a
                className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-white transition-colors"
                href="https://github.com/omsrivastava512/clinic-demo/commits/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Track Progress ↗
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <a
                className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-white transition-colors"
                href="#procedure"
                rel="noopener"
            >
                Jump to working component ↓
            </a>
        </div>

        <nav className="mt-8 flex justify-center">
            <TabsLine />
        </nav>
    </header>
);

function TabsLine() {
    const location = useLocation();

    return (
        <div className="inline-flex items-center p-1.5 rounded-full bg-zinc-200/60 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/90 backdrop-blur-md shadow-xs">
            <Tabs defaultValue="visit" value={location.pathname}>
                <TabsList variant="default" className="bg-transparent p-0 gap-1 h-auto">
                    <NavLink to="/">
                        <TabsTrigger
                            value="/"
                            className="rounded-full px-5 py-2 text-xs font-medium cursor-pointer transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-white data-[state=active]:shadow-xs"
                        >
                            Visit Workflow
                        </TabsTrigger>
                    </NavLink>
                    <NavLink to="/dashboard">
                        <TabsTrigger
                            value="/dashboard"
                            className="rounded-full px-5 py-2 text-xs font-medium cursor-pointer transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-white data-[state=active]:shadow-xs"
                        >
                            Dashboard
                        </TabsTrigger>
                    </NavLink>
                    <TabsTrigger
                        disabled
                        value="/reports"
                        className="rounded-full px-5 py-2 text-xs font-medium opacity-40 cursor-not-allowed"
                    >
                        Reports
                    </TabsTrigger>
                    <NavLink to="/roadmap">
                        <TabsTrigger
                            value="/roadmap"
                            className="rounded-full px-5 py-2 text-xs font-medium cursor-pointer transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-white data-[state=active]:shadow-xs"
                        >
                            Roadmap
                        </TabsTrigger>
                    </NavLink>
                </TabsList>
            </Tabs>
        </div>
    );
}

export default DemoAppHeader;
