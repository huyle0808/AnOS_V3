import {
    addHistory,
    remember,
    rememberList
} from "./memory.js";

import { askAI } from "./ai.js";
import { saveMemory } from "./sync.js";
import { askKnowledge } from "./skills/knowledge.js";
import { route } from "./router.js";

export async function pipeline(message) {

    const text = message.trim();
    const lower = text.toLowerCase();

    // ===== PHÂN TÍCH CẢM XÚC =====
   // const emotion = analyzeEmotion(text);

   // console.log("Emotion:", emotion);
const emotion = {
    score: 0,
    emotion: ""
};
    let emotionReply = "";

    if (emotion.score >= 60) {

        emotionReply = "Mình hiểu cảm xúc của bạn.<br><br>";

        emotionReply +=
            "🧠 Cảm xúc nhận diện: " +
            emotion.emotion +
            "<br>";

        emotionReply +=
            "📊 Mức độ: " +
            emotion.score +
            "%<br><br>";

        switch (emotion.emotion) {

            case "😊 Vui":
                emotionReply +=
                    "Thật tuyệt khi biết bạn đang vui. Hy vọng niềm vui này sẽ tiếp tục cùng bạn.";
                break;

            case "😢 Buồn":
                emotionReply +=
                    "Mình rất tiếc khi biết bạn đang buồn. Nếu muốn, bạn có thể chia sẻ thêm.";
                break;

            case "😟 Lo lắng":
                emotionReply +=
                    "Lo lắng là điều ai cũng gặp. Chúng ta sẽ giải quyết từng bước.";
                break;

            case "😠 Tức giận":
                emotionReply +=
                    "Mình hiểu bạn đang rất khó chịu. Hãy kể mình nghe nhé.";
                break;

            default:
                emotionReply +=
                    "Mình luôn sẵn sàng lắng nghe bạn.";
        }
    }

    // ===== GHI NHỚ TÊN =====
    let m = text.match(/^tên tôi là\s+(.+)$/i);

    if (m) {

        const name = m[1].trim();

        if (name && name.toLowerCase() !== "gì") {
            remember("name", name);
        }
    }

    // ===== GHI NHỚ TUỔI =====
    m = text.match(/^tôi\s+(\d+)\s+tuổi$/i);

    if (m) {
        remember("age", m[1]);
    }

    // ===== GHI NHỚ NGHỀ =====
    m = text.match(/^tôi làm\s+(.+)$/i);

    if (m) {

        const job = m[1].trim();

        if (job) {
            remember("job", job);
        }
    }

    // ===== GHI NHỚ ĐỒ UỐNG =====
    m = text.match(/^tôi thích uống\s+(.+)$/i);

    if (m) {

        const drink = m[1].trim();
        const check = drink.toLowerCase();

        if (
            drink &&
            check !== "gì" &&
            check !== "gì?" &&
            check !== "bao nhiêu" &&
            check !== "thứ gì"
        ) {
            remember("drink", drink);
        }
    }

   //  ===== THỬ XỬ LÝ BẰNG SKILL =====
  let reply = await route(text);
    // ===== THỬ KIẾN THỨC =====
    if (!reply) {

        const answer = await askKnowledge(text);

        if (answer) {
            reply = answer;
        }
    }

    // ===== GỌI GEMINI =====
    if (!reply) {
        reply = await askAI(text);
    }

    // ===== GHÉP PHẢN HỒI CẢM XÚC =====
    if (emotionReply) {

        if (reply) {
            reply = emotionReply + "<br><br>" + reply;
        } else {
            reply = emotionReply;
        }

    }

    // ===== LƯU LỊCH SỬ =====
    if (
        !lower.includes("lịch sử") &&
        !lower.includes("đã nói gì") &&
        !lower.includes("nhớ gì")
    ) {

        addHistory("👤 " + text);
        addHistory("🤖 " + reply);

        await saveMemory();
    }

    return reply;
}