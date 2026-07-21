import { getKnowledge } from "./cache.js";

function normalize(text) {

    if (text === null || text === undefined) {
        return "";
    }

    text = String(text);

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}

export async function searchKnowledge(message) {

    const text = normalize(message);
    const words = text.split(" ");

    const knowledge = getKnowledge();

    let best = null;
    let bestScore = 0;

    for (const item of knowledge) {

        let score = 0;

        // ===== Keywords =====
        if (item.keywords) {

            for (const keyword of item.keywords) {

                const key = normalize(keyword);

                if (text.includes(key)) {

                    score += 10;

                } else {

                    const keyWords = key.split(" ");

                    let matched = 0;

                    for (const w of keyWords) {

                        if (words.includes(w)) {
                            matched++;
                        }

                    }

                    score += matched;

                }

            }

        }

        // ===== Tags =====
        if (item.tags) {

            for (const tag of item.tags) {

                const t = normalize(tag);

                if (text.includes(t)) {
                    score += 5;
                }

            }

        }

        // ===== Category =====
        if (
            item.category &&
            text.includes(normalize(item.category))
        ) {
            score += 2;
        }

        if (score > bestScore) {
            bestScore = score;
            best = item;
        }

    }

    if (best) {
        return best.answer;
    }

    return null;

}