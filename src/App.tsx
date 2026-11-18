import WelcomeTip from './components/WelcomeTip';

import { DemoAppHeader } from './components/DemoAppHeader';
import { Outlet } from 'react-router-dom';


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


const App = () => {
    return (
        <>
            <WelcomeTip
                skipText='Dismiss'
                description={[
                    'Click on the section headings in Visit Workflow to hide/expand the components.',
                    'Check the Roadmap tab to understand the scope and future of the final app and track the current progress.',
                    "Some tabs are under development and do not lead anywhere. Don't bother clicking.",
                ]}
            />

            <div className="min-h-screen flex flex-col bg-zinc-100 dark:bg-black text-zinc-900 dark:text-zinc-100 py-20 px-4 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300">
                <DemoAppHeader formattedDate={formattedDate} />

                <div className="flex-1 flex flex-col">
                  <Outlet />
                </div>
            </div>
        </>
    );
};

export default App;


