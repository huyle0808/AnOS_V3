import { askAI } from "../ai.js";

export async function processAI(text) {

    try {

        const reply = await askAI(text);

        if (reply) {
            return reply;
        }

    } catch (e) {

        console.error("AI:", e);

    }

    return null;
}