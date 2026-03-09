import { useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react';
import WelcomeTip from './components/WelcomeTip';
import { NavLink, Outlet } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


const lastUpdated = new Date(import.meta.env.VITE_LAST_UPDATED);

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
// console.log(formattedDate); // Output: Tue Jan 06, 2026 | 23:50


// ==========================================
// 3. UI COMPONENTS
// ==========================================


const App = () => {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(true);



    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add("dark")
        else document.documentElement.classList.remove("dark")
    }, [isDarkMode])


    return (
        <>
            <WelcomeTip
                skipText='Dismiss'
                description='Click on the section heading to hide/unhide the component.'
            />

            <div className="min-h-screen bg-zinc-100 dark:bg-black text-zinc-900 dark:text-zinc-100 py-20 px-4 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300">
                <ToggleDarkButton isDarkMode={isDarkMode} toggleDark={() => setIsDarkMode(!isDarkMode)} />

                <DemoHeader />

                <Outlet />


            </div>
        </>
    );
};

export default App;


type ToggleDarkButtonProps = {
    isDarkMode: boolean,
    toggleDark(): void
}

const ToggleDarkButton = ({ isDarkMode, toggleDark }: ToggleDarkButtonProps) => (
    <button
        type='button'
        onClick={toggleDark}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg text-zinc-900 dark:text-white hover:scale-105 transition-transform"
        title="Toggle Theme"
    >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
)

const DemoHeader = () => (
    <header className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">Clinic App Catalogue</h1>
        <p className="text-zinc-600 dark:text-zinc-500">Modular React + TS components for Indian Physiotherapy Clinics.</p>

        <p className="text-zinc-700 dark:text-zinc-400 text-md mt-2 font-mono">Last Updated: {formattedDate} </p>
        <p className="text-zinc-700 dark:text-zinc-400 text-md mt-2">
            <a className='underline' href="https://github.com/omsrivastava512/clinic-demo/commits/" target="_blank" rel="noopener" >Track Progress↗ </a> &nbsp; | &nbsp;
            <a className='underline' href="#procedure" rel="noopener" >Jump to working component↓ </a>
        </p>
        <nav className='mt-5 p-5 flex justify-center'>
            <TabsLine/>
        </nav>

    </header>
)


export function TabsLine() {
    return (
        <Tabs defaultValue="workflow">
            <TabsList variant="line">
                <TabsTrigger value="workflow">
                    <NavLink to="/">Visit Workflow</NavLink>
                </TabsTrigger>
                <TabsTrigger disabled value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger disabled value="reports">Reports</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
