import { askAI } from "./ai.js";
import { processKnowledge } from "./pipeline/knowledge.js";
import { route } from "./router.js";

import { processEmotion } from "./pipeline/emotion.js";
import {
    processMemory,
    processHistory
} from "./pipeline/memory.js";
import {
    updateContext,
    getContext
} from "./pipeline/context.js";
import { processAI } from "./pipeline/ai.js";
import { processReason } from "./pipeline/reason.js";
import { createPlan } from "./reason/planner.js";
import { think } from "./reason/thinker.js";
export async function pipeline(message) {

    const text = message.trim();
const context = getContext();

const plan = createPlan(text);

console.log("📋 Plan:", plan);
    // ===== GHI NHỚ =====
    await processMemory(text);

    // ===== PHÂN TÍCH CẢM XÚC =====
    const { emotion, emotionReply } = processEmotion(text);

    // ===== THỬ XỬ LÝ BẰNG SKILL =====
    let reply = await route(text);

// ===== THỬ KIẾN THỨC =====
if (!reply) {

    console.log("📚 Không có Skill, tìm trong Knowledge...");

    reply = await processKnowledge(text);

}

// ===== SUY LUẬN (nếu có) =====
if (!reply) {

    console.log("🧠 Không có Knowledge, Reason...");

    reply = await processReason(text);

}

// ===== GỌI AI =====
if (!reply) {

    console.log("🤖 Không có Reason, gọi AI...");

    reply = await processAI(text);

}

    // ===== GHÉP PHẢN HỒI CẢM XÚC =====
    if (emotionReply) {

        reply = reply
            ? emotionReply + "<br><br>" + reply
            : emotionReply;
    }

    // ===== LƯU LỊCH SỬ =====
    await processHistory(text, reply);
    updateContext(text, reply);
    return reply;
}