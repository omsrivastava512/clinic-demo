import { cn } from "@/lib"
import { forwardRef, type ComponentPropsWithoutRef, type ComponentPropsWithRef, type ReactNode } from "react";
import { defaultInputClasses, getReferralButtonClass, getToggleButtonClass, intakeLayoutClasses } from "./styles";


export const IntakeLayout = ({ children }: { children: ReactNode }) => (
    <div className={intakeLayoutClasses}>
        {children}
    </div>
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
