export function detectPersonality(profile) {

    const personality = [];

    const favorite = profile.favorite || [];

    if (favorite.includes("AI")) {
        personality.push({
            trait: "Đam mê công nghệ",
            score: 95,
            reason: "Bạn thường xuyên quan tâm đến AI."
        });
    }

    if (favorite.includes("lập trình")) {
        personality.push({
            trait: "Tư duy logic",
            score: 90,
            reason: "Bạn yêu thích lập trình."
        });
    }

    if (favorite.includes("thẩm mỹ")) {
        personality.push({
            trait: "Óc sáng tạo",
            score: 80,
            reason: "Bạn quan tâm đến thiết kế và thẩm mỹ."
        });
    }

    return personality.sort((a, b) => b.score - a.score);

}