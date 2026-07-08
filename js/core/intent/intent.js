export function detectIntent(message) {

    const text = message.toLowerCase().trim();

    if (
        text.includes("chào")
    ) {
        return "greeting";
    }

    if (
        text.includes("cảm ơn")
    ) {
        return "thanks";
    }

    if (
        text.includes("thời tiết") ||
        text.includes("trời đẹp")
    ) {
        return "weather";
    }

    if (
        text.includes("lịch sử")
    ) {
        return "history";
    }

    if (
        text.includes("bạn là ai") ||
        text.includes("tên tôi là gì") ||
        text.includes("tôi tên gì")
    ) {
        return "whoami";
    }

    if (
        text.includes("tên")
    ) {
        return "memory";
    }

    return "skill";

}