import { cn } from "@/lib";
import { CheckIcon, NotebookPenIcon } from "lucide-react"

type FormFooterProps = {
    onClose(): void;
    openClinicNotes(): void;
}
const FormFooter = ({ onClose, openClinicNotes }: FormFooterProps) => {
    return (
        <div
            className={cn(
                "pt-6 mt-2",    // spacing
                "border-t border-zinc-100 dark:border-zinc-900",    // border
                "flex flex-col-reverse sm:flex-row",  // layout & direction
                "justify-end",  // alignment
                "gap-3 sm:gap-4"    // spacing (gaps)
            )}
        >
            <button type="button"
                title="Add additional details"
                onClick={openClinicNotes}
                className="pr-10 py-3 outline-none"
                tabIndex={-1}
            >
                <NotebookPenIcon
                    className={cn(
                        "sm:w-auto", // layout & sizing
                        "font-medium", // typography
                        "text-zinc-500", // color (base)
                        "hover:text-zinc-900 dark:hover:text-white", // color 
                        "transition-colors" // interaction & motion
                    )}
                />
            </button>
            <button
                type="button"
                onClick={onClose}
                className={cn(
                    "w-full sm:w-auto", // layout & sizing
                    "px-6 py-3", // spacing
                    "text-sm font-medium", // typography
                    "text-zinc-500", // color (base)
                    "hover:text-zinc-900 dark:hover:text-white", // color (states)
                    "transition-colors" // interaction & motion
                )}
            >
                Cancel (Esc)
            </button>
            <button
                type="submit"
                className={cn(
                    "w-full sm:w-auto", // layout & sizing
                    "px-8 py-3",    // spacing
                    "bg-emerald-600 text-white",    // colors (base)
                    "hover:bg-emerald-700 dark:hover:bg-emerald-500",   // colors (states)
                    "font-bold",     // typography
                    "rounded-lg shadow-md", // shape & elevation
                    "transition-all",    // interaction & motion
                    "flex items-center justify-center gap-2"    // flex & alignment
                )}

            >
                <CheckIcon className="w-4 h-4" />
                Create Profile & Proceed...
            </button>
        </div>
    )
}

export default FormFooter