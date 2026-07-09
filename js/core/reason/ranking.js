export function sortByScore(items) {

    return [...items].sort((a, b) => b.score - a.score);

}

export function top(items, limit = 5) {

    return sortByScore(items).slice(0, limit);

}