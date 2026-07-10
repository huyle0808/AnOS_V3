import { knowledge } from "./knowledge.js";
import { applyRules } from "./inference.js";
import { normalize } from "./normalize.js";
import { addExplanation } from "./explanation.js";

import { scoreItem } from "./score.js";
import { buildReasoning } from "./reasoning.js";
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
    suggestions: [],
    confidence: {},
    explanations: [],
    reasoning: []
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
// ===== Score Engine =====

for (const field of fields) {

    result[field] = result[field].map(item => {

        let bonus = 0;

        // Ưu tiên dữ liệu từ Rule Engine
        if (item.score >= 2) {
            bonus += 2;
        }

        return scoreItem(item, bonus);

    });

}
    // ===== Sắp xếp theo điểm =====
    for (const field of fields) {

        result[field] = [
    ...new Set(
        result[field]
            .sort((a, b) => b.score - a.score)
            .map(x => x.text)
    )
];

    }
    

        // ===== Tính Confidence =====


for (const field of fields) {

    const count = result[field].length;
    result.confidence[field] = Math.min(100, count * 20);

}

// ===== Explanation =====


addExplanation(
    result.explanations,
    "Knowledge",
    "Phân tích dựa trên Knowledge Graph."
);

addExplanation(
    result.explanations,
    "Rules",
    "Áp dụng các luật suy luận."
);
// ===== Reasoning =====
result.reasoning = buildReasoning(profile, result);
if (DEBUG) {

    console.log("FACTS:", result.facts);
    console.log("STRENGTHS:", result.strengths);
    console.log("JOBS:", result.jobs);
    console.log("SUGGESTIONS:", result.suggestions);
    console.log("CONFIDENCE:", result.confidence);
    console.log("EXPLANATIONS:", result.explanations);
    console.log("REASONING:", result.reasoning);
}

return result;

}