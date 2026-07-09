import { getProfile } from "../memory.js";

export function reason(message) {
console.log("REASON:", message);
    const text = message.toLowerCase();
    const p = getProfile();

    const fav = Array.isArray(p.favorite)
        ? p.favorite.map(x => x.toLowerCase())
        : [];

    // ===== Nghề nghiệp =====
    if (
        text.includes("hợp nghề gì") ||
        text.includes("nên làm nghề gì")
    ) {

        let jobs = [];

        if (fav.includes("ai"))
            jobs.push("Kỹ sư AI");

        if (fav.includes("lập trình"))
            jobs.push("Lập trình viên");

        if (fav.includes("đọc sách"))
            jobs.push("Nghiên cứu");

        if (jobs.length) {

            return "Theo những gì mình nhớ, bạn có thể phù hợp với: "
                + jobs.join(", ")
                + " 😊";
        }

        return "Mình chưa có đủ thông tin để suy luận.";
    }

    // ===== Điểm mạnh =====
    if (
        text.includes("điểm mạnh của tôi") ||
        text.includes("tôi giỏi gì")
    ) {

        let strengths = [];

        if (fav.includes("đọc sách"))
            strengths.push("ham học hỏi");

        if (fav.includes("lập trình"))
            strengths.push("tư duy logic");

        if (fav.includes("ai"))
            strengths.push("đam mê công nghệ");

        if (strengths.length) {

            return "Theo những gì mình nhớ, điểm mạnh của bạn là: "
                + strengths.join(", ")
                + ".";
        }

        return "Mình chưa đủ dữ liệu để đánh giá.";
    }

    return null;
}