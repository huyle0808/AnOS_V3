export function weather(message) {

    const text = message.toLowerCase();

    if (
        text.includes("trời đẹp") ||
        text.includes("thời tiết đẹp")
    ) {
        return "Đúng rồi, hôm nay thời tiết khá đẹp ☀️";
    }

    return null;

}
