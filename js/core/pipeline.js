import { route } from "./router.js";

import { processEmotion } from "./pipeline/emotion.js";

import {
    processHistory
} from "./pipeline/memory.js";

import {
    updateContext,
    getContext
} from "./pipeline/context.js";

import {
    createPlan
} from "./reason/planner.js";

import AIService from "./services/AIService.js";


// Khởi tạo AI một lần
const ai = new AIService();


export async function pipeline(message) {

    console.log("🚀 pipeline() START");
    console.log("📩 Message:", message);

    const text = message.trim();

    // Lấy context hiện tại
    const context = getContext();
    console.log("📦 Context:", context);

    // Lập kế hoạch
    const plan = createPlan(text);
    console.log("📋 Plan:", plan);

    // Phân tích cảm xúc
    const {
        emotion,
        emotionReply
    } = processEmotion(text);

    console.log("😊 Emotion:", emotion);

    // ==========================
    // 1. Skill Router
    // ==========================

    console.log("① Router");

    let reply = await route(text);

    console.log("✅ Router Reply:", reply);

    // ==========================
    // 2. AI SERVICE
    // ==========================

    if (!reply) {

        console.log("② Chuyển sang AIService");

        reply = await ai.process(text);

        console.log("✅ AI Reply:", reply);

    }

    // ==========================
    // 3. Ghép cảm xúc
    // ==========================

    if (emotionReply) {

        reply = reply
            ? emotionReply + "<br><br>" + reply
            : emotionReply;

    }

    // ==========================
    // 4. Lưu lịch sử
    // ==========================

    console.log("③ Save History");

    await processHistory(
        text,
        reply
    );

    console.log("④ Update Context");

    updateContext(
        text,
        reply
    );

    console.log("🏁 pipeline() END");

    return reply;

}