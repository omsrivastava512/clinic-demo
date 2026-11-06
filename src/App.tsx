import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import WelcomeTip from './components/WelcomeTip';
import { DemoAppHeader } from './components/DemoAppHeader';
import { Outlet } from 'react-router-dom';

const lastUpdated = new Date(import.meta.env.VITE_LAST_UPDATED || Date.now());

const datePart = lastUpdated.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
});
const timePart = lastUpdated.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
});

const formattedDate = `${datePart} | ${timePart}`;

const App = () => {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [isDarkMode]);

    return (
        <>
            <WelcomeTip
                skipText="Dismiss"
                description={[
                    'Click on the section headings in Visit Workflow to hide/expand the components.',
                    'Check the Roadmap tab to understand the scope and future of the final app and track current progress.',
                    "Some tabs are under development and do not lead anywhere. Don't bother clicking.",
                ]}
            />

            <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 py-16 px-4 sm:px-6 md:px-8 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-200">
                <ToggleDarkButton isDarkMode={isDarkMode} toggleDark={() => setIsDarkMode(!isDarkMode)} />

                <DemoAppHeader formattedDate={formattedDate} />

                <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default App;

type ToggleDarkButtonProps = {
    isDarkMode: boolean;
    toggleDark(): void;
};

const ToggleDarkButton = ({ isDarkMode, toggleDark }: ToggleDarkButtonProps) => (
    <button
        type="button"
        onClick={toggleDark}
        className="fixed top-6 right-6 z-50 p-2.5 rounded-full bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-md text-zinc-800 dark:text-zinc-200 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        title="Toggle Light / Dark Theme"
    >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
);
