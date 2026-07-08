export function normalize(text) {

    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

}