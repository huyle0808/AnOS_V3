import { reasonAboutUser } from "../reason/reasonEngine.js";

export async function processReason(text) {

    console.log("🧠 processReason:", text);

    const msg = text.toLowerCase().trim();

    // Phân tích người dùng
    if (/phân tích|đánh giá|nhận xét/i.test(msg)) {

        console.log("🧠 Gọi reasonAboutUser()");

        const result = await reasonAboutUser();

        console.log("🧠 reasonAboutUser trả về:", result);

        return result;
    }

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
        msg.includes(" hay ")
    ) {
        return "decision";
    }

    console.log("🧠 processReason: không khớp");

    return null;
}

