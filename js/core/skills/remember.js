
import {
    remember as saveMemory,
    recall,
    forget,
    clearProfile
} from "../memory.js";
export function remember(message) {
console.log("REMEMBER SKILL:", message);
    const text = message.trim();
    const lower = text.toLowerCase();

    // ===== NHỚ TÊN =====
    if (
    lower.startsWith("tôi tên là ") ||
    lower.startsWith("tên tôi là ") ||
    lower.startsWith("tên mình là ") ||
    (
        lower.startsWith("tôi là ") &&
        !lower.includes("tôi là ai")
    )
) {

    const name = text
        .replace(/tôi tên là/i, "")
        .replace(/tên tôi là/i, "")
        .replace(/tên mình là/i, "")
        .replace(/tôi là/i, "")
        .trim();

    if (name) {
        saveMemory("name", name);
        return "Mình sẽ nhớ bạn tên là " + name + " 😊";
    }
}
// ===== HỎI SỞ THÍCH =====
if (
    lower.includes("tôi thích gì") ||
    lower.includes("sở thích của tôi")
) {

    const favorite = recall("favorite");

    if (favorite) {
        return "Bạn thích " + favorite + " 😊";
    }

    return "Mình chưa biết sở thích của bạn.";
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
    // ===== GHI NHỚ SỞ THÍCH =====
let like = message.match(/^tôi thích\s+(.+)$/i);

if (like) {

    const value = like[1].trim();

    saveMemory("favorite", value);

    return "Mình sẽ nhớ bạn thích " + value + " 😊";
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
// ===== QUÊN TẤT CẢ =====
if (
    lower.includes("quên tất cả") ||
    lower.includes("xóa toàn bộ thông tin") ||
    lower.includes("đặt lại trí nhớ")
) {

    clearProfile();

    return "Mình đã quên toàn bộ thông tin về bạn. 😊";
}
    return null;
    
}