import cn from "classnames";

const TableHeader = () => (
    <div className={cn(
        "grid grid-cols-12 gap-4 px-6 py-3",
        "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 ",
        "border-b border-zinc-200 dark:border-zinc-800", 
        "text-xs font-medium  uppercase tracking-wider"
    )}>
        <div className="col-span-2">Time</div>
        <div className="col-span-6 md:col-span-4">Patient Name</div>
        <div className="hidden md:block md:col-span-4">Treatment</div>
        <div className="col-span-4 md:col-span-2 text-right">Status</div>
    </div>
);


export default TableHeader