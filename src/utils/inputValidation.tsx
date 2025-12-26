export const cleanSearchInput = (input: string): string => {

    if (!input) return ""; // Handle Empty Strings

    // 1. Normalize whitespace first
    const normalized = input.replace(/\s+/g, ' ').trimStart();

    // 2. Find first meaningful character
    const firstChar = normalized[0];
    if (!firstChar) return "";

    // if the string starts with a Letter
    if (/[a-zA-Z]/.test(firstChar)) {
        // Regex: Replace anything that is NOT (^) a letter or space
        return normalized.replace(/[^a-zA-Z ]/g, "");
    }
    // if the string starts with a Number
    if (/[0-9]/.test(firstChar)) {
        // Regex: Replace anything that is NOT (^) a number and slice it till 10 digits
        return normalized.replace(/[^0-9]/g, "").slice(0, 10);
    }

    return "";
};
