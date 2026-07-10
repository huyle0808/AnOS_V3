export function detectPersonality(profile) {

    const personality = [];

    const favorite = profile.favorite || [];
    const facts = profile.facts || [];

    if (favorite.includes("AI")) {
        personality.push({
            trait: "Đam mê công nghệ",
            score: 95,
            reason: "Bạn nhiều lần nói thích AI."
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
            reason: "Bạn quan tâm đến thẩm mỹ."
        });
    }

    if (facts.length > 5) {
        personality.push({
            trait: "Ham học hỏi",
            score: 85,
            reason: "Bạn thường xuyên bổ sung kiến thức mới."
        });
    }

    return personality.sort((a,b)=>b.score-a.score);

}