import { getProfile } from "../memory.js";
import { analyze } from "../reason/index.js";

export function reason(message) {

    console.log("REASON:", message);

    const text = message.toLowerCase();
    const profile = getProfile();

    const result = analyze(profile);

// ===== PHÂN TÍCH =====
if (
    text.includes("phân tích") ||
    text.includes("hãy phân tích tôi")
) {

    if (result.facts.length === 0) {
        return "Mình chưa có đủ dữ liệu để phân tích.";
    }

    let reply = "📋 Phân tích về bạn:<br><br>";

    reply += "• " + result.facts.join("<br>• ");

    if (result.reasoning?.length) {

        reply += "<br><br>🧠 Lý do AI kết luận:<br><br>• ";

        reply += result.reasoning.join("<br>• ");

    }

    return reply;
}

    // ===== ĐIỂM MẠNH =====
    if (
        text.includes("điểm mạnh") ||
        text.includes("tôi giỏi gì")
    ) {

        if (result.strengths.length === 0) {
            return "Mình chưa đủ dữ liệu để đánh giá.";
        }

        return "💪 Điểm mạnh của bạn:<br><br>• " +
            result.strengths.join("<br>• ");
    }

    // ===== NGHỀ PHÙ HỢP =====
    if (
        text.includes("hợp nghề gì") ||
        text.includes("nên làm nghề gì")
    ) {

        if (result.jobs.length === 0) {
            return "Mình chưa có đủ dữ liệu để suy luận.";
        }

        return "💼 Bạn có thể phù hợp với:<br><br>• " +
            result.jobs.join("<br>• ");
    }

    // ===== GỢI Ý =====
    if (
        text.includes("nên học gì") ||
        text.includes("gợi ý")
    ) {

        if (result.suggestions.length === 0) {
            return "Hiện mình chưa có gợi ý phù hợp.";
        }

        return "📚 Gợi ý dành cho bạn:<br><br>• " +
            result.suggestions.join("<br>• ");
    }

    return null;
}