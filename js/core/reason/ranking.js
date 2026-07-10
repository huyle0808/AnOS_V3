export function sortByScore(items) {

    return [...items].sort((a, b) => {

        const scoreA = (a.score || 0) + (a.confidence || 0);
        const scoreB = (b.score || 0) + (b.confidence || 0);

        return scoreB - scoreA;

    });

}

export function top(items, limit = 5) {

    return sortByScore(items).slice(0, limit);

}

// Lấy phần tử tốt nhất
export function best(items) {

    const list = sortByScore(items);

    return list.length ? list[0] : null;

}