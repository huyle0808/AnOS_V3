const INTENTS = {
    greeting: [
        "xin chào",
        "chào",
        "hello",
        "hi"
    ],

    calculator: [],

    memory: [
        "hãy nhớ",
        "nhớ rằng",
        "ghi nhớ",
        "lưu lại",
        "quên"
    ],

    profile: [
    "thông tin của tôi",
    "hồ sơ của tôi",
    "bạn biết gì về tôi",
    "bạn nhớ gì về tôi",

    "tên tôi là gì",
    "tôi tên gì",
    "bạn nhớ tên tôi",
    "bạn biết tên tôi",

    "tuổi tôi",
    "bạn nhớ tuổi tôi"
],
    analyze: [
    "phân tích",
    "đánh giá",
    "nhận xét",
    "phân tích tôi",
    "phân tích về tôi",
    "đánh giá tôi",
    "nhận xét về tôi"
],
    time: [
        "mấy giờ",
        "giờ",
        "hôm nay",
        "ngày mấy",
        "thứ mấy",
        "ngày gì"
    ],

    weather: [
        "thời tiết",
        "dự báo",
        "trời mưa",
        "trời nắng",
        "nhiệt độ"
    ],

    emotion: [
        "buồn",
        "vui",
        "mệt",
        "chán",
        "cô đơn",
        "thất vọng",
        "hạnh phúc"
    ],

    knowledge: [
        "vì sao",
        "tại sao",
        "giải thích",
        "nghĩa là gì",
        "bao nhiêu",
        "bao nhiêu độ",
        "ai là",
        "ở đâu",
        "khi nào",
        "làm sao",
        "cách",
        "nguyên nhân"
    ]
};

export function detectIntent(message) {

    if (!message) {
        return "fallback";
    }

    const text = message.toLowerCase().trim();
// ===== Memory ưu tiên =====
if (
    /^tôi tên là\s+\S+/i.test(text) ||
    /^tên tôi là\s+\S+/i.test(text) ||
    /^tên mình là\s+\S+/i.test(text) ||
    /^tôi là\s+\S+/i.test(text) ||
    /^tôi\s+\d+\s+tuổi$/i.test(text) ||
    /^tôi ở\s+.+/i.test(text) ||
    /^tôi sống ở\s+.+/i.test(text) ||
    /^tôi thích\s+.+/i.test(text) ||
    /^tôi thích uống\s+.+/i.test(text) ||
    /^tôi làm\s+.+/i.test(text)
) {

    if (
        text.endsWith("gì") ||
        text.endsWith("gì?") ||
        text.includes("tên tôi là gì")
    ) {
        return "profile";
    }

    return "memory";
}
    // Calculator ưu tiên cao nhất
    if (/^[0-9+\-*/().\s]+$/.test(text)) {
    return "calculator";
}

    // Profile ưu tiên trước knowledge
    
if (/(tên.*gì|tôi tên gì|bạn nhớ tên|bạn biết tên|bạn còn nhớ tên|thông tin của tôi|hồ sơ của tôi|bạn nhớ gì về tôi|bạn biết gì về tôi|tuổi tôi|bạn nhớ tuổi)/i.test(text)) {
    return "profile";
}
// Analyze ưu tiên
if (/(phân tích|đánh giá|nhận xét).*(tôi|bản thân)|phân tích về tôi/i.test(text)) {
    return "analyze";
}

    // Memory
    if (
    text.includes("hãy nhớ") ||
    text.includes("nhớ rằng") ||
    text.includes("ghi nhớ") ||
    text.includes("lưu lại") ||
    text.includes("quên")
) {
    return "memory";
}

    // Các intent còn lại
    for (const [intent, keywords] of Object.entries(INTENTS)) {

        if (intent === "profile" || intent === "memory" || intent === "calculator") {
            continue;
        }

        for (const keyword of keywords) {
            if (text.includes(keyword)) {
                return intent;
            }
        }
    }

    return "fallback";
}