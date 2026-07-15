import { detectIntent } from "./intent/intent.js";
import { skills } from "./skills/index.js";

export async function route(message) {

    const intent = detectIntent(message);

    console.log("🧭 Router | Intent:", intent);

    const skill = skills[intent];

    if (!skill) {

        console.log("❌ Không tìm thấy skill:", intent);

        return null;
    }

    try {

        const reply = await skill(message);

        if (reply) {

            console.log("✔ Skill:", intent);

            return reply;
        }

    } catch (e) {

        console.error("❌ Skill Error:", e);

    }

    return null;
}