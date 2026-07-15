export function weather(message) {

    const text = message.toLowerCase();

    if (
        text.includes("bầu trời") ||
        text.includes("màu xanh") ||
        text.includes("vì sao bầu trời") ||
        text.includes("thời tiết") ||
        text.includes("trời đẹp") ||
        text.includes("nắng") ||
        text.includes("mưa")
    ) {

        if (
            text.includes("màu xanh") ||
            text.includes("bầu trời")
        ) {

            return "Bầu trời có màu xanh vì ánh sáng xanh của Mặt Trời bị tán xạ mạnh hơn các màu khác trong khí quyển.";

        }

        if (text.includes("mưa")) {
            return "Mình chưa thể xem thời tiết trực tiếp, nhưng bạn có thể tích hợp API thời tiết để mình trả lời chính xác.";
        }

        if (text.includes("nắng")) {
            return "Nếu trời nắng thì nhớ uống đủ nước và hạn chế ra ngoài vào giữa trưa nhé ☀️";
        }

        return "Mình có thể trả lời các câu hỏi liên quan đến thời tiết.";
    }

    return null;
}