// Regex: Replace multiple whitespaces into single
export const normalizeWhitespaces = (val: string) => val.trimStart().replace(/\s+/g, ' ');
// Regex: Replace anything that is NOT (^) a letter or space
const filterAlphabetsAndSpaces = (val: string) => val.replace(/[^a-zA-Z ]/g, "");

// Regex: Replace anything that is NOT (^) a number and slice it till 10 digits
export const filterPhoneNumber = (val: string) => val.replace(/[^0-9]/g, "").slice(0, 10);

export const filterAlphabetsAndNormalizeSpaces = (val: string) => filterAlphabetsAndSpaces(normalizeWhitespaces(val))

export const filterAlphaNumeric = (val: string) => normalizeWhitespaces(val).replace(/[^A-Za-z0-9 ]+/g, '');


export const filterAge = (val: string) => val.replace(/[^0-9]/g, "").slice(0, 2);

export const cleanSearchInput = (input: string): string => {
    if (!input) return ""; // Handle Empty Strings

    // 1. Normalize whitespace first
    const normalized = normalizeWhitespaces(input)

    // 2. Find first meaningful character
    const firstChar = normalized[0];
    if (!firstChar) return "";

    // if the string starts with a Letter
    if (/[a-zA-Z]/.test(firstChar)) {
        return filterAlphabetsAndSpaces(normalized)
    }
    // if the string starts with a Number
    if (/[0-9]/.test(firstChar)) {
        return filterPhoneNumber(normalized)
    }
    return "";
};

export const formatPhone = (digits: string) => {
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 5));
    if (digits.length > 5) parts.push(digits.slice(5, 10));

    return parts.join(" ");
}

export const normalizeAddress = (addr: string) => normalizeWhitespaces(addr)
    .replace(/[^A-Za-z0-9\s,'#\/\-]/g, '') // remove garbage
    .replace(/([.,;:\-\/#])\1+/g, '$1')
    .replace(/\s*,\s*/g, ', ')              // normalize commas
    .trim();

export const validateAddress = (addr: string) => /^(?=.*[A-Za-z]).{5,}$/.test(addr)
