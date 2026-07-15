import {
    remember as saveMemory,
    rememberList,
    recall,
    forget,
    clearProfile
} from "../memory.js";

// ===== Mẫu nhận diện =====

const NAME_PATTERNS = [
    /^tôi tên là\s+(.+)$/i,
    /^tên tôi là\s+(.+)$/i,
    /^tên mình là\s+(.+)$/i,
    /^mình tên là\s+(.+)$/i,
    /^tôi là\s+(.+)$/i,
    /^gọi tôi là\s+(.+)$/i,
    /^cứ gọi tôi là\s+(.+)$/i
];

const DRINK_PATTERNS = [
    /^tôi thích uống\s+(.+)$/i,
    /^mình thích uống\s+(.+)$/i
];

const LIKE_PATTERNS = [
    /^tôi thích\s+(.+)$/i,
    /^mình thích\s+(.+)$/i
];

const JOB_PATTERNS = [
    /^tôi làm\s+(.+)$/i,
    /^nghề của tôi là\s+(.+)$/i
];

const AGE_PATTERNS = [
    /^tôi\s+(\d+)\s+tuổi$/i,
    /^mình\s+(\d+)\s+tuổi$/i
];

const COLOR_PATTERNS = [
    /^tôi thích màu\s+(.+)$/i,
    /^mình thích màu\s+(.+)$/i
];

const HOME_PATTERNS = [
    /^tôi ở\s+(.+)$/i,
    /^tôi sống ở\s+(.+)$/i,
    /^quê tôi ở\s+(.+)$/i,
    /^mình ở\s+(.+)$/i
];

export function remember(message) {

    console.log("REMEMBER SKILL:", message);

    const text = message.trim();
    const lower = text.toLowerCase();

    // ===== Hỏi sở thích =====
    if (
        lower.includes("tôi thích gì") ||
        lower.includes("sở thích của tôi")
    ) {

        const favorite = recall("favorite");

        if (Array.isArray(favorite))
            return "Bạn thích: " + favorite.join(", ") + " 😊";

        if (favorite)
            return "Bạn thích " + favorite + " 😊";

        return "Mình chưa biết sở thích của bạn.";
    }

    // ===== Nhớ tên =====
    for (const pattern of NAME_PATTERNS) {

        const match = text.match(pattern);

        if (!match) continue;

        const name = match[1].trim();

        if (
            !name ||
            name.toLowerCase() === "ai"
        ) continue;

        saveMemory("name", name);

        return "Mình sẽ nhớ bạn tên là " + name + " 😊";
    }

    // ===== Nhớ đồ uống =====
    for (const pattern of DRINK_PATTERNS) {

        const match = text.match(pattern);

        if (!match) continue;

        const drink = match[1].trim();

        if (
            drink === "gì" ||
            drink === "gì?" ||
            drink === "bao nhiêu"
        ) continue;

        saveMemory("drink", drink);

        return "Mình sẽ nhớ bạn thích uống " + drink + " 😊";
    }

    // ===== Nhớ sở thích =====
    for (const pattern of LIKE_PATTERNS) {

        const match = text.match(pattern);

        if (!match) continue;

        const favorite = match[1].trim();

        if (
            favorite.startsWith("màu ") ||
            favorite.startsWith("uống ")
        ) continue;

        rememberList("favorite", favorite);

        return "Mình sẽ nhớ bạn thích " + favorite + " 😊";
    }

    // ===== Nhớ nghề =====
    for (const pattern of JOB_PATTERNS) {

        const match = text.match(pattern);

        if (!match) continue;

        const job = match[1].trim();

        saveMemory("job", job);

        return "Mình sẽ nhớ bạn làm " + job + " 😊";
    }

    // ===== Nhớ tuổi =====
    for (const pattern of AGE_PATTERNS) {

        const match = text.match(pattern);

        if (!match) continue;

        saveMemory("age", match[1]);

        return "Mình sẽ nhớ bạn " + match[1] + " tuổi 😊";
    }

    // ===== Nhớ màu =====
    for (const pattern of COLOR_PATTERNS) {

        const match = text.match(pattern);

        if (!match) continue;

        saveMemory("color", match[1].trim());

        return "Mình sẽ nhớ bạn thích màu " + match[1].trim() + " 😊";
    }

    // ===== Nhớ nơi ở =====
    for (const pattern of HOME_PATTERNS) {

        const match = text.match(pattern);

        if (!match) continue;

        saveMemory("hometown", match[1].trim());

        return "Mình sẽ nhớ bạn ở " + match[1].trim() + " 😊";
    }

    // ===== Quên =====
    if (lower.includes("quên tên")) {

        forget("name");

        return "Mình đã quên tên của bạn. 😊";
    }

    if (lower.includes("quên tuổi")) {

        forget("age");

        return "Mình đã quên tuổi của bạn. 😊";
    }

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