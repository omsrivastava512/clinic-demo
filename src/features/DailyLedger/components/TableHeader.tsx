import {cn} from "@/utils";

const TableHeader = () => (
    <div className={cn(
        rowGridLayout.main,    // grid
        "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 ",  // color
        "border-b border-zinc-200 dark:border-zinc-800",    // border
        "text-xs font-medium  uppercase tracking-wider"     // misc
    )}>
        <div className={rowGridLayout.time}>Time</div>
        <div className={rowGridLayout.patientName}>Patient Name</div>
        <div className={rowGridLayout.treatment}>Treatment</div>
        <div className={rowGridLayout.status}>Status</div>
    </div>
);


export default TableHeader

export const rowGridLayout = {
    main: "grid grid-cols-12 gap-4 px-4 py-3",
    time: "col-span-2 md:col-span-1",
    patientName: "col-span-6 md:col-span-4",
    treatment: "hidden md:block md:col-span-5",
    status: "col-span-4 md:col-span-2 text-right"
} as const;     