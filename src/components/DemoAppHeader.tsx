import { NavLink, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TextExpander from './TextExpander';

export const DemoAppHeader = ({ formattedDate }: { formattedDate: string; }) => (
    <header className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">Clinic App Catalogue</h1>
        <p className="text-zinc-600 dark:text-zinc-500">Modular React + TS components for Indian Physiotherapy Clinics.</p>
        <TextExpander collapseLabel='' className="text-zinc-600 dark:text-zinc-500 max-w-2xl mx-auto text-center p-2">
            This repository is not the final clinic application. It is a component catalogue and interaction prototype for a clinic management system. The goal is to validate each UI module individually before those components are integrated into a full backend-connected product.
        </TextExpander>

        <p className="text-zinc-700 dark:text-zinc-400 text-md mt-2 font-1mono">Last Updated: {formattedDate} </p>
        <p className="text-zinc-700 dark:text-zinc-400 text-md mt-2">
            <a className='underline' href="https://github.com/omsrivastava512/clinic-demo/commits/" target="_blank" rel="noopener">Track Progress↗ </a> &nbsp; | &nbsp;
            <a className='underline' href="#procedure" rel="noopener">Jump to working component↓ </a>
        </p>
        <nav className='mt-5 p-5 flex justify-center'>
            <TabsLine />
        </nav>

    </header>
);


function TabsLine() {
    const location = useLocation()

    return (
        <Tabs defaultValue={location.pathname}>
            <TabsList variant="line">
                <NavLink to="/">
                    <TabsTrigger value="/">Visit Workflow</TabsTrigger>
                </NavLink>
                <TabsTrigger disabled value="/dashboard">Dashboard</TabsTrigger>
                <TabsTrigger disabled value="/reports">Reports</TabsTrigger>
                <NavLink to="/roadmap">
                    <TabsTrigger value="/roadmap">Roadmap</TabsTrigger>
                </NavLink>
            </TabsList>
        </Tabs>
    )
}