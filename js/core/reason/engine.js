import { knowledge } from "./knowledge.js";
import { applyRules } from "./inference.js";
import { normalize } from "./normalize.js";
const DEBUG = true;

// Thêm dữ liệu nhưng không bị trùng
function addUnique(target, items) {

    if (!Array.isArray(items)) return;

    for (const item of items) {

        let obj;
if (typeof item === "string") {

    const text = normalize(item);

    obj = {
        id: text.toLowerCase(),
        text: text,
        score: 1
    };

}
        else {

            const text = normalize(item.text);

obj = {
    id: item.id ?? text.toLowerCase(),
    text: text,
    score: item.score ?? 1
};

        }

        const old = target.find(x => x.id === obj.id);

        if (old) {
            old.score += obj.score;
        } else {
            target.push(obj);
        }

    }

}

export function analyze(profile) {

    const result = {
        facts: [],
        strengths: [],
        jobs: [],
        suggestions: []
    };

    const favorite = Array.isArray(profile.favorite)
        ? profile.favorite
        : [];

    const fields = [
        "facts",
        "strengths",
        "jobs",
        "suggestions"
    ];

    // ===== Đọc Knowledge =====
    for (const fav of favorite) {

        const key = fav.toLowerCase();
        const data = knowledge[key];

        if (!data) continue;

        for (const field of fields) {
            addUnique(result[field], data[field]);
        }

    }

    // ===== Áp dụng Rules =====
    applyRules(profile, result, addUnique);

    // ===== Sắp xếp theo điểm =====
    for (const field of fields) {

        result[field] = result[field]
            .sort((a, b) => b.score - a.score)
            .map(x => x.text);

    }
    



    if (DEBUG) {

        console.log("FACTS:", result.facts);
        console.log("STRENGTHS:", result.strengths);
        console.log("JOBS:", result.jobs);
        console.log("SUGGESTIONS:", result.suggestions);

    }

    return result;

}