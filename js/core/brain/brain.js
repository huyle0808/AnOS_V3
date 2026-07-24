// ==========================================
// AnOS V4
// Brain Process
// ==========================================

import { pipeline } from "../pipeline.js";
import { emit } from "../event/index.js";
import { startup } from "../system/startup.js";

let busy = false;

export async function process(message) {

    console.log("🧠 process START");

    // ==========================
    // Startup
    // ==========================

    try {

        await startup();

    } catch (e) {

        console.error("❌ Startup Error:", e);

        return "Không thể khởi động AnOS.";

    }

    console.log("✅ startup");

    // ==========================
    // Validate
    // ==========================

    if (typeof message !== "string") {

        return "Bạn muốn mình giúp gì?";

    }

    const text = message.trim();

    if (!text.length) {

        return "Bạn muốn mình giúp gì?";

    }

    console.log("📩", text);

    // ==========================
    // Busy Protection
    // ==========================

    if (busy) {

        return "AnOS đang xử lý yêu cầu trước, vui lòng đợi...";

    }

    busy = true;

    try {

        // ==========================
        // Event Start
        // ==========================

        try {

            await emit("brain:start", text);

        } catch (e) {

            console.warn("brain:start event error", e);

        }

        console.log("🚀 Pipeline");

        const state = await pipeline(text);

        console.log("✅ Pipeline Finished");

        try {

            await emit("brain:end", state);

        } catch (e) {

            console.warn("brain:end event error", e);

        }

        if (!state) {

            return "Mình chưa có câu trả lời.";

        }

        if (typeof state === "string") {

            return state;

        }

        if (typeof state.reply === "string" && state.reply.length) {

            return state.reply;

        }

        if (typeof state.answer === "string" && state.answer.length) {

            return state.answer;

        }

        return "Mình chưa có câu trả lời.";

    }

    catch (error) {

        console.error("❌ Brain Error:", error);

        try {

            await emit("brain:error", error);

        } catch {}

        return "Xin lỗi, AnOS gặp lỗi.";

    }

    finally {

        busy = false;

        console.log("🏁 process END");

    }

}