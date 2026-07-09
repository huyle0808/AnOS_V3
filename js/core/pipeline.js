
import {
    addHistory,
    remember
} from "./memory.js";
import { askAI } from "./ai.js";
import { saveMemory } from "./sync.js";
import { askKnowledge } from "./skills/knowledge.js";
import { route } from "./router.js";
export async function pipeline(message) {

    

    const text = message.trim();
    const lower = text.toLowerCase();

    // ===== GHI NHỚ TÊN =====
    let m = text.match(/^tên tôi là\s+(.+)$/i);

    if (m) {
        const name = m[1].trim();

        if (name && name.toLowerCase() !== "gì") {
            remember("name", name);
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

// ===== THỬ XỬ LÝ BẰNG SKILL =====
let reply = await route(text);

// ===== THỬ KIẾN THỨC ĐÃ HỌC =====
if (!reply) {

    const answer = await askKnowledge(text);

    if (answer) {
        reply = answer;
    }

}


    // ===== KHÔNG CÓ SKILL THÌ GỌI GEMINI =====
    if (!reply) {

        

        reply = await askAI(text);

        
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