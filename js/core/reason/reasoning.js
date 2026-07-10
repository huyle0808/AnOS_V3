export function buildReasoning(profile, result) {

    const reasoning = [];

    const favorite = (profile.favorite || []).map(x => x.toLowerCase());

    if (favorite.includes("ai")) {
        reasoning.push(
            "Bạn yêu thích AI nên hệ thống ưu tiên các nghề liên quan AI."
        );
    }

    if (favorite.includes("lập trình")) {
        reasoning.push(
            "Bạn yêu thích lập trình nên tăng điểm cho các nghề kỹ thuật."
        );
    }

    if (result.jobs.includes("AI Software Engineer")) {
        reasoning.push(
            "AI Software Engineer được xếp hạng cao vì phù hợp với hồ sơ của bạn."
        );
    }

    return reasoning;
}