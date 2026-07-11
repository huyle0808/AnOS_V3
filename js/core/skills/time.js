export function time(message) {

    const text = message.toLowerCase();

    if (
        text.includes("hôm nay") ||
        text.includes("ngày mấy") ||
        text.includes("thứ mấy") ||
        text.includes("ngày gì")
    ) {

        const now = new Date();

const weekday = now.toLocaleDateString("vi-VN", {
    weekday: "long"
});

const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();

return `Hôm nay là ${weekday}, ngày ${day} tháng ${month} năm ${year}.`;
    }

    return null;
}