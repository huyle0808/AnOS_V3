import { rules } from "./rules.js";

export function applyRules(profile, result, addUnique) {

    let changed = true;

    const fields = [
        "facts",
        "strengths",
        "jobs",
        "suggestions"
    ];

    while (changed) {

        changed = false;

        for (const rule of rules) {

            if (!rule.when(profile))
                continue;

            const before =
                result.facts.length +
                result.strengths.length +
                result.jobs.length +
                result.suggestions.length;

            for (const field of fields) {

                if (rule[field]) {
                    addUnique(result[field], rule[field]);
                }

            }

            const after =
                result.facts.length +
                result.strengths.length +
                result.jobs.length +
                result.suggestions.length;

            if (after > before) {
                changed = true;
            }

        }

    }

}