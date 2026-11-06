import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { PlusIcon } from "lucide-react";

type FormFooterProps = {
    onClose(): void;
    openClinicNotes(): void;
};

const FormFooter = ({ onClose, openClinicNotes }: FormFooterProps) => {
    return (
        <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <button
                type="button"
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 text-xs font-semibold py-2 px-3 transition-colors cursor-pointer"
            >
                Cancel
            </button>

            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={openClinicNotes}
                    className="border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 text-xs font-medium cursor-pointer"
                >
                    <PlusIcon className="w-3.5 h-3.5" />
                    <span>Clinical Notes</span>
                </Button>

                <button
                    type="submit"
                    className={cn(
                        "py-2.5 px-6 rounded-xl font-bold text-xs cursor-pointer",
                        "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900",
                        "hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs active:scale-[0.985]"
                    )}
                >
                    Create Profile
                </button>
            </div>
        </div>
    );
};

export default FormFooter;
