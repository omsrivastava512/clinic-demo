
/** Utility function to convert 12H time into minutes
 * @param t timeString1 in 12h format
 * @returns minutes
 * 
 */
 export const calcMin12H = (t: string): number => {
    const [time, meridiem] = t.split(' ');
    let [h, m] = time.split(':').map(t => +t);

    if (meridiem === 'AM' && h === 12) {
        h = 0;
    }
    else if (meridiem === 'PM' && h < 12) {
        h += 12;
    }
    
    m =  h * 60 + m;
    return m;
}

/**
 * A compare function to compare 2 time strings in 12H format
 * @param t1 timeString1 in 12H format
 * @param t2 timeString2 in 12H format
 * @returns 
 */
export const compTime = (t1: string, t2: string): number => {// Consider AM/PM
    return calcMin12H(t1) - calcMin12H(t2)
}

export const min12HToTime = (minutes: number): string => {
    let h = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;
    const meridiem = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m.toString().padStart(2, '0')} ${meridiem}`;
}

/** Check if time is in valid 12H format */
export const isValid12HTime = (t: string): boolean => {
    const regex = /^(0?[1-9]|1[0-2]):[0-5]\d\s(AM|PM)$/i;
    return regex.test(t);
}

/** Add minutes to a 12H time string */
export const addMinutes12H = (t: string, mins: number): string => {
    const totalMins = calcMin12H(t) + mins;
    return min12HToTime(totalMins % (24 * 60));
}

/** Get difference between two times in 12H format */
export const timeDiff12H = (t1: string, t2: string) => {
    const mAbs = Math.abs(calcMin12H(t1) - calcMin12H(t2));
    const hAbs = (mAbs / 60);
    const h = Math.floor(hAbs);
    const m = mAbs % 60;
    return { diffString: `${h}h ${m}m`, h, m, hAbs, mAbs};
}

