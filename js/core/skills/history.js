import { getHistory } from "../memory.js";

export function history(message) {

    const text = message.toLowerCase();

    if (
        text.includes("lịch sử") ||
        text.includes("đã nói gì") ||
        text.includes("nhớ gì")
    ) {

        const list = getHistory();

        if (list.length === 0) {
            return "Mình chưa có cuộc trò chuyện nào.";
        }

return list.join("<br>");
    }

    return null;

}
