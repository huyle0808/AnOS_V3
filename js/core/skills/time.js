export function time(message) {

    const text = message.toLowerCase().trim();

    const now = new Date();

    // Hỏi giờ
    if (
        text.includes("mấy giờ") ||
        text.includes("giờ rồi") ||
        text.includes("bây giờ")
    ) {

        const hour = now.getHours();
        const minute = now.getMinutes();

        return `Bây giờ là ${hour} giờ ${minute} phút.`;
    }

    // Hỏi ngày
    if (
        text.includes("hôm nay") ||
        text.includes("ngày mấy") ||
        text.includes("thứ mấy") ||
        text.includes("ngày gì")
    ) {

        const weekday = now.toLocaleDateString("vi-VN", {
            weekday: "long"
        });

        return `Hôm nay là ${weekday}, ngày ${now.getDate()} tháng ${now.getMonth()+1} năm ${now.getFullYear()}.`;
    }

    return null;
}