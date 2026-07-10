export function detectEmotion(profile) {

    const result = [];

    const favorite = (profile.favorite || []).join(" ").toLowerCase();

    if (favorite.includes("ai")) {
        result.push({
            name: "Đam mê khám phá",
            score: 95,
            reason: "Bạn rất quan tâm đến AI và công nghệ."
        });
    }

    if (favorite.includes("lập trình")) {
        result.push({
            name: "Kiên trì",
            score: 90,
            reason: "Bạn thích giải quyết các vấn đề logic."
        });
    }

    if (favorite.includes("thẩm mỹ")) {
        result.push({
            name: "Yêu cái đẹp",
            score: 85,
            reason: "Bạn quan tâm đến thiết kế và tính thẩm mỹ."
        });
    }

    if (result.length === 0) {
        result.push({
            name: "Trung lập",
            score: 50,
            reason: "Chưa đủ dữ liệu."
        });
    }

    return result;
}