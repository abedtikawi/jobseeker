export function humanizeKey(key: string): string {
    if (!key) return "";
    return key
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export function stripHtml(value: string): string {
    if (!value) return "";
    // Remove HTML tags and normalize common entities/spaces
    return value
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();
}

