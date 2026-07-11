// js/core/reason/causeDetector.js

const patterns = [
    "vì",
    "do",
    "bởi",
    "tại",
    "bởi vì",
    "do vì"
];

export function detectCause(text = "") {

    const msg = text.toLowerCase().trim();

    for (const p of patterns) {

        if (msg.includes(p)) {

            const cause = msg.split(p)[1]?.trim();

            if (cause && cause.length > 0) {
                return cause;
            }

        }

    }

    return null;
}