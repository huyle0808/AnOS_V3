export function normalize(text) {

    if (text === null || text === undefined) {
        return "";
    }

    return String(text)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

}