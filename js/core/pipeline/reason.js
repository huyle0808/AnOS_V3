export function processReason(text) {

    const msg = text.toLowerCase().trim();

    // Giải thích
    if (
        msg.startsWith("tại sao") ||
        msg.startsWith("vì sao")
    ) {
        return "reason";
    }

    // So sánh
    if (
        msg.includes("khác gì") ||
        msg.includes("so sánh")
    ) {
        return "compare";
    }

    // Lựa chọn
    if (
        msg.startsWith("nên ") ||
        msg.includes("hay ")
    ) {
        return "decision";
    }

    return null;
}