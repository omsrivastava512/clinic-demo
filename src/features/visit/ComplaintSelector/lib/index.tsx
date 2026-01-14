import { differenceInMonths, differenceInYears, formatDistanceToNow, parseISO } from 'date-fns';

export function getAge(dateOfBirth: string): string {
    let age = differenceInYears(new Date(), parseISO(dateOfBirth));
    if (age > 0) {
        return `${age} years old`
    }
    age = differenceInMonths(new Date(), parseISO(dateOfBirth))

    if (isNaN(age) || age<0) return "Invalid Age";
    return `${age} months old`

}


export function getLastVisit(date: string) {
    return formatDistanceToNow(parseISO(date), { addSuffix: true })
}

