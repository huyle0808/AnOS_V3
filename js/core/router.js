/*import { skills } from "./skills/index.js";

export async function route(message) {

    console.log("===== ROUTER =====");

    for (const skill of skills) {

        console.log("Bắt đầu:", skill.name);

        const reply = rgb(255,255,255) skill(message);

        console.log("Kết thúc:", skill.name);

        if (reply) {
            console.log("Đã trả lời bởi:", skill.name);
            return reply;
        }
    }

    console.log("Không skill nào xử lý");

    return null;
}*/
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