import { cn } from "@/utils"
import { forwardRef, type ComponentPropsWithoutRef, type ComponentPropsWithRef, type ReactNode } from "preact/compat";


export const IntakeLayout = ({ children }: { children: ReactNode }) => (
    <div className={cn(
        "w-full max-w-xl mx-auto my-4",
        "bg-white dark:bg-black",
        "border border-zinc-200 dark:border-zinc-800 rounded-xl",
        "shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]",
        "overflow-hidden flex flex-col"
    )}>
        {children}
    </div>
)

const defaultInputClasses = cn(
    "w-full bg-white dark:bg-zinc-900/50",
    "border border-zinc-200 dark:border-zinc-800",
    "text-zinc-900 dark:text-white text-lg",
    "px-2 py-3 rounded-lg outline-none",
    "focus:border-zinc-400 dark:focus:border-zinc-500",
    "focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-800",
    "placeholder-zinc-400 dark:placeholder-zinc-600",
)
type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'className'> & {
    className?: string
}
export const Input = ({ className = '', ...props }: InputProps) => (
    <input
        {...props}
        className={cn(
            defaultInputClasses,
            className
        )}
    />
)

type InputWithRefProps = Omit<ComponentPropsWithRef<'input'>, 'className'> & {
    className?: string
}
export const InputWithRef = forwardRef<HTMLInputElement, InputWithRefProps>(({ className = '', ...props }, ref) => (
    <input
        ref={ref}
        {...props}
        className={cn(
            defaultInputClasses,
            className
        )}
    />
))

const getToggleButtonClass = (isActive: boolean) => cn(
    "flex-1 py-2 rounded text-sm font-bold ",
    isActive
        ? cn("bg-white dark:bg-zinc-700",
            "text-zinc-900 dark:text-white",
            "shadow-sm border border-zinc-200 dark:border-transparent"
        ) :
        'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
)

type ToggleButtonProps = {
    isActive: boolean;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className'>

export const ToggleButton = ({ isActive, ...props }: ToggleButtonProps) => (
    <button
        {...props}
        className={getToggleButtonClass(isActive)}
    >
    </button>
)

const getReferralButtonClass = (isActive: boolean) => cn(
    "px-4 py-2 rounded-md border",
    "text-xs font-medium flex-1",
    isActive
        ? cn(
            "bg-zinc-900 dark:bg-white",
            "border-zinc-200 dark:border-zinc-800",
            "text-white dark:text-black"
        )
        : cn(
            "bg-white dark:bg-black",
            "dark:text-zinc-400 text-zinc-600",
            "hover:bg-zinc-50 dark:hover:bg-zinc-900",
            "hover:border-zinc-300 dark:hover:border-zinc-700",
        )
)

export const ReferralButton = ({ isActive, ...props }: ToggleButtonProps) => (
    <button
        {...props}
        className={getReferralButtonClass(isActive)}
    >
    </button>
)
type TextAreaWithRefProps = Omit<ComponentPropsWithRef<'textarea'>, 'className'> & {
    className?: string
}
export const TextAreaWithRef = forwardRef<HTMLTextAreaElement, TextAreaWithRefProps>(({ className = '', ...props }, ref) => (
    <textarea ref={ref}
        {...props}
        className={cn(
            defaultInputClasses,
            'font-mono',
            className
        )}
    />
))

type TextAreaProps = Omit<ComponentPropsWithoutRef<'textarea'>, 'className'> & {
    className?: string
}
export const TextArea = ({ className = '', ...props }:TextAreaProps) => (
    <textarea
        {...props}
        className={cn(
            defaultInputClasses,
            'font-mono',
            className
        )}
    />
)
