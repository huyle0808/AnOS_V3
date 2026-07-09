import { getProfile } from "../memory.js";

export function profile(message) {

    const text = message.toLowerCase();

    if (
        text.includes("thông tin của tôi") ||
        text.includes("hồ sơ của tôi") ||
        text.includes("bạn biết gì về tôi") ||
        text.includes("bạn nhớ gì về tôi")
    ) {

        const p = getProfile();
        alert(JSON.stringify(p));
        console.log("PROFILE =", p);

        let result = [];

        if (p.name) result.push("👤 Tên: " + p.name);
        if (p.age) result.push("🎂 Tuổi: " + p.age);
        if (p.job) result.push("💼 Nghề: " + p.job);
        if (p.hometown) result.push("🏠 Nơi ở: " + p.hometown);
        if (p.color) result.push("🎨 Màu yêu thích: " + p.color);
        if (p.drink) result.push("☕ Đồ uống yêu thích: " + p.drink);

        if (Array.isArray(p.favorite)) {

            result.push(
                "❤️ Sở thích:<br>• " +
                p.favorite.join("<br>• ")
            );

        } else if (p.favorite) {

            result.push("❤️ Sở thích: " + p.favorite);

        }

        if (result.length === 0) {
            return "Mình chưa biết gì về bạn.";
        }

        return result.join("<br>");
    }

    return null;
}