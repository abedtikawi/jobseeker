export function humanizeKey(key: string): string {
    if (!key) return "";
    return key
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

