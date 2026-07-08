import { skills } from "./skills/index.js";

export async function route(message) {

    for (const skill of skills) {

        const reply = await skill(message);

        if (reply) {
            return reply;
        }

    }

    return null;
}