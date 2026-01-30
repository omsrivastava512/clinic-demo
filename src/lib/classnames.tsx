
type ClassPrimitive = string | false | null | undefined
type ClassProducer = () => ClassPrimitive
type ClassValue = ClassPrimitive | ClassProducer


function resolveClass(value: ClassValue): ClassPrimitive {
    return typeof value === 'function' ? value() : value
}

export function cn(...classes: ClassValue[]): string {
    return classes
        .map(resolveClass)
        .filter(Boolean)
        .join(' ')
}
