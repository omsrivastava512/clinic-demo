
export const ledgerRowLayout = {
    main: "grid grid-cols-12 gap-4 px-4 py-3",
    time: "col-span-2 md:col-span-1",
    patientName: "col-span-6 md:col-span-4",
    treatment: "hidden md:block md:col-span-5",
    status: "col-span-4 md:col-span-2 text-right"
} as const;
