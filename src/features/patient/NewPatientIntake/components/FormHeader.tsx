import { cn } from "@/lib"
import { UserPlus2Icon, XIcon } from "lucide-react"

const FormHeader = ({ onClose }: { onClose(): void }) => {
    return (
        <div className={cn(
            "px-6 py-4 bg-zinc-50 dark:bg-zinc-950",    // layout
            "border-b border-zinc-200 dark:border-zinc-900",    // border
            "flex justify-between items-start "   // flex
        )}>
            <div className="flex gap-4 items-center justify-center shrink-0">

                <UserPlus2Icon className="w-10 h-10 font-bold text-emerald-600 dark:text-emerald-500" />
                <div>
                    <h2 className={cn(
                        "text-lg font-bold text-zinc-900 dark:text-white",  // text
                        "flex items-center gap-2"   // flex
                    )}>
                        New Patient Registration
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Create digital ID & generate MRN</p>
                </div>
            </div>
            <button title={'Close'} type={'button'} onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white">
                <XIcon className="w-6 h-6" />
            </button>
        </div>
    )
}

export default FormHeader