import { knowledge } from "./knowledge.js";
import { rules } from "./rules.js";

// Thêm dữ liệu nhưng không bị trùng
function addUnique(target, items) {

    if (!Array.isArray(items)) return;

    for (const item of items) {

        let obj;

        if (typeof item === "string") {

            obj = {
                id: item.toLowerCase(),
                text: item,
                score: 1
            };

        } else {

            obj = {
                id: item.id ?? item.text.toLowerCase(),
                text: item.text,
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

    // ===== Đọc Knowledge =====
    for (const fav of favorite) {

        const key = fav.toLowerCase();

        const data = knowledge[key];

        if (!data) continue;

        addUnique(result.facts, data.facts);
addUnique(result.strengths, data.strengths);
addUnique(result.jobs, data.jobs);
addUnique(result.suggestions, data.suggestions);

    }

// ===== Áp dụng Rules =====

for (const rule of rules) {

    if (!rule.when(profile))
        continue;

    if (rule.facts)
        addUnique(result.facts, rule.facts);

    if (rule.strengths)
        addUnique(result.strengths, rule.strengths);

    if (rule.jobs)
        addUnique(result.jobs, rule.jobs);

    if (rule.suggestions)
        addUnique(result.suggestions, rule.suggestions);

}
    // ===== Chuyển object -> text =====
    result.facts = result.facts.map(x => x.text);
    result.strengths = result.strengths.map(x => x.text);
    result.jobs = result.jobs.map(x => x.text);
    result.suggestions = result.suggestions.map(x => x.text);
console.log("FACTS:", result.facts);
console.log("STRENGTHS:", result.strengths);
console.log("JOBS:", result.jobs);
console.log("SUGGESTIONS:", result.suggestions);
    return result;

}