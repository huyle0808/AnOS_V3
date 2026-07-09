import { knowledge } from "./knowledge.js";
import { rules } from "./rules.js";

// Thêm dữ liệu nhưng không bị trùng
function addUnique(target, items) {

    if (!Array.isArray(items)) return;

    for (const item of items) {

        // Kiểu cũ: chuỗi
        if (typeof item === "string") {

            const exists = target.some(x => x.text === item);

            if (!exists) {
                target.push({
                    id: item.toLowerCase(),
                    text: item
                });
            }

            continue;
        }

        // Kiểu mới: object {id,text}
        if (item && typeof item === "object") {

            const id = item.id || item.text;

            const exists = target.some(x => x.id === id);

            if (!exists) {

                target.push({
                    id,
                    text: item.text
                });

            }

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

        if (!rule.when(profile)) continue;

        if (rule.fact)
            addUnique(result.facts, [rule.fact]);

        if (rule.strength)
            addUnique(result.strengths, [rule.strength]);

        if (rule.job)
            addUnique(result.jobs, [rule.job]);

        if (rule.suggestion)
            addUnique(result.suggestions, [rule.suggestion]);

    }

    // ===== Chuyển object -> text =====
    result.facts = result.facts.map(x => x.text);
    result.strengths = result.strengths.map(x => x.text);
    result.jobs = result.jobs.map(x => x.text);
    result.suggestions = result.suggestions.map(x => x.text);

    return result;

}