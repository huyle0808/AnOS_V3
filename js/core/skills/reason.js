import { getProfile } from "../memory.js";

export function reason(message) {

    const text = message.toLowerCase();
    const p = getProfile();

    const fav = Array.isArray(p.favorite)
        ? p.favorite.map(x => x.toLowerCase())
        : [];

    // ===== GỢI Ý NGHỀ =====
    if (
        text.includes("hợp nghề gì") ||
        text.includes("nên làm nghề gì")
    ) {

        let jobs = [];

        if (fav.includes("ai")) {
            jobs.push("Kỹ sư AI");
        }

        if (fav.includes("lập trình")) {
            jobs.push("Lập trình viên");
        }

        if (fav.includes("đọc sách")) {
            jobs.push("Nghiên cứu");
        }

        if (jobs.length === 0) {
            return "Mình chưa có đủ thông tin để gợi ý nghề.";
        }

        return "Theo những gì mình nhớ, bạn có thể phù hợp với: " +
               jobs.join(", ") + ". 😊";
    }

    // ===== ĐIỂM MẠNH =====
    if (
        text.includes("điểm mạnh của tôi") ||
        text.includes("tôi có điểm mạnh gì")
    ) {

        let strengths = [];

        if (fav.includes("đọc sách")) {
            strengths.push("ham học hỏi");
        }

        if (fav.includes("lập trình")) {
            strengths.push("tư duy logic");
        }

        if (fav.includes("ai")) {
            strengths.push("đam mê công nghệ");
        }

        if (strengths.length === 0) {
            return "Mình chưa biết đủ về bạn để đánh giá.";
        }

        return "Theo những gì mình nhớ, điểm mạnh của bạn là: " +
               strengths.join(", ") + ".";
    }

    return null;
}