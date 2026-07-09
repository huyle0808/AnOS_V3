import { remember as saveMemory, forget } from "../memory.js";

export function remember(message) {
console.log("REMEMBER SKILL:", message);
    const text = message.trim();
    const lower = text.toLowerCase();

    // ===== NHỚ TÊN =====
    if (
        lower.startsWith("tên mình là ") ||
        (
            lower.startsWith("tên tôi là ") &&
            !lower.includes("tên tôi là gì")
        ) ||
        (
            lower.startsWith("tôi là ") &&
            !lower.includes("tôi là ai")
        )
    ) {

        const name = text
            .replace(/tên mình là/i, "")
            .replace(/tên tôi là/i, "")
            .replace(/tôi là/i, "")
            .trim();

        if (name) {
            saveMemory("name", name);
            return "Mình sẽ nhớ bạn tên là " + name + " 😊";
        }
    }

    // ===== NHỚ ĐỒ UỐNG =====
    let m = text.match(/^tôi thích uống\s+(.+)$/i);

    if (m) {

        const drink = m[1].trim();
        const value = drink.toLowerCase();

        if (
            value !== "gì" &&
            value !== "gì?" &&
            value !== "bao nhiêu" &&
            value !== "thứ gì"
        ) {

            saveMemory("drink", drink);

            return "Mình sẽ nhớ bạn thích uống " + drink + " 😊";
        }
    }
// Nhớ nghề

if (lower.startsWith("tôi làm ")) {

    const job = text
        .replace(/tôi làm/i, "")
        .trim();

    const value = job.toLowerCase();

    if (
        value !== "nghề gì" &&
        value !== "gì" &&
        value !== "gì?"
    ) {

        saveMemory("job", job);

        return "Mình sẽ nhớ bạn làm " + job + " 😊";
    }
}
// ===== NHỚ TUỔI =====
let age = text.match(/^tôi\s+(\d+)\s+tuổi$/i);

if (age) {

    saveMemory("age", age[1]);

    return "Mình sẽ nhớ bạn " + age[1] + " tuổi 😊";
}
// ===== NHỚ MÀU =====
let color = text.match(/^tôi thích màu\s+(.+)$/i);

if (color) {

    saveMemory("color", color[1].trim());

    return "Mình sẽ nhớ bạn thích màu " + color[1].trim() + " 😊";
}
// ===== NHỚ NƠI Ở =====
let hometown =
    text.match(/^tôi ở\s+(.+)$/i) ||
    text.match(/^tôi sống ở\s+(.+)$/i);

if (hometown) {

    const place = hometown[1].trim().toLowerCase();

    if (
        place !== "đâu" &&
        place !== "đâu?" &&
        place !== "gì"
    ) {

        saveMemory("hometown", hometown[1].trim());

        return "Mình sẽ nhớ bạn ở " + hometown[1].trim() + " 😊";
    }
}
// ===== QUÊN THÔNG TIN =====
if (lower.includes("quên tên")) {
    forget("name");
    return "Mình đã quên tên của bạn. 😊";
}

if (lower.includes("quên tuổi")) {
    forget("age");
    return "Mình đã quên tuổi của bạn. 😊";
}
    return null;
    
}