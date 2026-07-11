import { skills } from "./skills/index.js";

export async function route(message) {

    for (const skill of skills) {

        console.log("Đang chạy skill:", skill.name);

        const reply = await skill(message);

        console.log("Đã chạy xong:", skill.name);

        if (reply) {
            return reply;
        }
    }

    return null;
}