
const LedgerHeader = () => {
    return (
        <div className="flex justify-between items-end z-0 p-6 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
            <div>
                <div className="flex-col md:flex-row gap-2 items-center">
                    <p className="text-zinc-900 dark:text-white font-medium">Daily Register</p>
                    <p className="text-zinc-500 text-xs">Friday, 24 Nov</p>
                </div>
                <p className="text-zinc-500 text-sm">Dr. Sharma's Clinic</p>
            </div>
            {/* OPD Count */}
            <div className="text-right">
                <div className="text-2xl font-mono text-zinc-900 dark:text-white">42</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">OPD Count</div>
            </div>
        </div>
    )
}

export default LedgerHeader