export function detectGoals(profile) {

    const goals = [];

    const favorite = profile.favorite || [];

    if (favorite.includes("AI")) {
        goals.push({
            goal: "Trở thành chuyên gia AI",
            score: 95,
            reason: "Bạn nhiều lần thể hiện sự yêu thích AI và mong muốn học chuyên sâu."
        });
    }

    if (favorite.includes("lập trình")) {
        goals.push({
            goal: "Phát triển phần mềm",
            score: 90,
            reason: "Bạn yêu thích lập trình và có tư duy logic tốt."
        });
    }

    if (favorite.includes("thẩm mỹ")) {
        goals.push({
            goal: "Thiết kế và sáng tạo",
            score: 80,
            reason: "Bạn quan tâm đến thẩm mỹ và có xu hướng sáng tạo."
        });
    }

    return goals.sort((a, b) => b.score - a.score);
}