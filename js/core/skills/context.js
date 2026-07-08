import { getContext } from "../context.js";

export function contextSkill(message) {

    const text = message.toLowerCase();

    if (
        text.includes("tin nhắn trước") ||
        text.includes("vừa nói gì")
    ) {

        const ctx = getContext();

        if (!ctx.lastMessage) {
            return "Chúng ta chưa có cuộc trò chuyện nào.";
        }

        return "Tin nhắn trước của bạn là: " + ctx.lastMessage;
    }

    return null;
}