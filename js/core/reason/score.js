// score.js

export function scoreItem(item, bonus = 0) {

    const base = item.score ?? 1;

    return {
        ...item,
        score: base + bonus
    };

}