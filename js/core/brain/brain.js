import { pipeline } from "../pipeline.js";
import { emit } from "../event/index.js";
import { startup } from "../system/startup.js";

export async function process(message) {

    console.log("🧠 process START");

    await startup();

    console.log("✅ startup");

    if (!message || typeof message !== "string") {
        return "Bạn muốn mình giúp gì?";
    }

    const text = message.trim();

    console.log("📩", text);

    if (!text) {
        return "Bạn muốn mình giúp gì?";
    }

    try {

        emit("brain:start", text);

        console.log("🚀 Gọi pipeline");

        const state = await pipeline(text);

        console.log("✅ Pipeline trả về:", state);

        emit("brain:end", state);

        if (state && typeof state === "object") {
            return state.reply || "Mình chưa có câu trả lời.";
        }

        return state;

    } catch (error) {

        console.error("❌ Brain Error:", error);

        emit("brain:error", error);

        return "Xin lỗi, đã xảy ra lỗi.";

    }

}