import { getProfile, setProfile } from "../memory.js";

export function profile(message) {

    const text = message.trim();
    const lower = text.toLowerCase();

    const p = getProfile();

    // ==========================
    // LƯU TÊN
    // ==========================
    let match = text.match(/^(tôi tên là|tên tôi là|tôi là)\s+(.+)$/i);

    if (match) {

        p.name = match[2].trim();
        setProfile(p);

        return `Mình sẽ nhớ bạn tên là ${p.name} 😊`;
    }

    // ==========================
    // HỎI TÊN
    // ==========================
    if (

        lower.includes("tên tôi") ||
        lower.includes("tôi tên gì") ||
        lower.includes("bạn nhớ tên tôi") ||
        lower.includes("tôi là ai") ||
        lower.includes("tôi tên là gì") ||
        lower.includes("bạn biết tên tôi")

    ) {

        if (p.name)
            return `Bạn tên là ${p.name} 😊`;

        return "Mình chưa biết tên của bạn.";
    }

    // ==========================
    // TUỔI
    // ==========================
    match = text.match(/^tôi\s+(\d+)\s+tuổi$/i);

    if (match) {

        p.age = match[1];
        setProfile(p);

        return `Mình sẽ nhớ bạn ${p.age} tuổi 😊`;
    }

    if (

        lower.includes("tuổi tôi") ||
        lower.includes("bao nhiêu tuổi") ||
        lower.includes("bạn nhớ tuổi tôi")

    ) {

        if (p.age)
            return `Bạn ${p.age} tuổi 😊`;

        return "Mình chưa biết tuổi của bạn.";
    }

    // ==========================
    // HỒ SƠ
    // ==========================
    if (

        lower.includes("bạn biết gì về tôi") ||
        lower.includes("bạn nhớ gì về tôi") ||
        lower.includes("hồ sơ của tôi") ||
        lower.includes("thông tin của tôi")

    ) {

        let result = [];

        if (p.name)
            result.push("👤 Tên: " + p.name);

        if (p.age)
            result.push("🎂 Tuổi: " + p.age);

        if (p.job)
            result.push("💼 Nghề: " + p.job);

        if (p.hometown)
            result.push("🏠 Nơi ở: " + p.hometown);

        if (p.color)
            result.push("🎨 Màu yêu thích: " + p.color);

        if (p.drink)
            result.push("☕ Đồ uống: " + p.drink);

        if (Array.isArray(p.favorite)) {

            result.push(
                "❤️ Sở thích:<br>• " +
                p.favorite.join("<br>• ")
            );

        } else if (p.favorite) {

            result.push("❤️ Sở thích: " + p.favorite);

        }

        if (result.length === 0)
            return "Mình chưa biết gì về bạn.";

        return result.join("<br>");
    }

    return null;
}