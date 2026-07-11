import { analyzeEmotion } from "../emotion/index.js";
import { getAdvice } from "../reason/adviceEngine.js";

export function emotion(message) {

    const result = analyzeEmotion(message);

    if (!result || result.score < 60) {
        return null;
    }

    const text = message.toLowerCase();

    let cause = "";

    if (text.includes("mất việc")) {
        cause = "mất việc";
    } else if (text.includes("công việc")) {
        cause = "công việc";
    } else if (
        text.includes("tiền") ||
        text.includes("nợ") ||
        text.includes("nghèo")
    ) {
        cause = "tiền";
    } else if (
        text.includes("học") ||
        text.includes("thi")
    ) {
        cause = "học";
    }

    const advice = getAdvice(cause);

    let reply = "";

    switch (result.emotion) {

        case "😊 Vui":
            reply =
                "😊 Mình rất vui khi biết bạn đang vui.";
            break;

        case "😢 Buồn":
            reply =
                "😢 Mình rất tiếc khi biết bạn đang buồn.";
            break;

        case "😟 Lo lắng":
            reply =
                "😟 Mình hiểu bạn đang lo lắng.";
            break;

        case "😠 Tức giận":
            reply =
                "😠 Mình hiểu bạn đang tức giận.";
            break;

        default:
            reply =
                "🙂 Mình hiểu cảm xúc của bạn.";
    }

    reply += "<br><br>";
    reply += "🧠 Cảm xúc: " + result.emotion;
    reply += "<br>";
    reply += "📊 Mức độ: " + result.score + "%";

    if (cause) {
        reply += "<br><br>";
        reply += "📌 Nguyên nhân: " + cause;
    }

    if (advice.length) {

        reply += "<br><br>💡 Gợi ý:<br><br>";

        for (const item of advice) {
            reply += "• " + item + "<br>";
        }

    }

    return reply;
}