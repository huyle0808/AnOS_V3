import { getHistory, getProfile } from "./memory.js";
import { fallbackAI } from "./fallbackAI.js";
async function findKnowledge(question) {

    const res = await fetch("/knowledge/find", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            question
        })

    });

    return await res.json();

}


export async function askAI(message) {

    
// ===== Tìm trong knowledge trước =====
try {

    const data = await findKnowledge(message);

    if (data.found) {

        

        return data.answer;

    }

} catch (e) {

    console.log("Knowledge:", e);

}
    try {

        const res = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message,
                profile: getProfile(),
                history: getHistory()
            })
        });

        

        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }

        const data = await res.json();

        

        if (!data.reply) {
            throw new Error("Server không trả về reply");
        }

        // Gemini hết quota hoặc đang bận
        if (
            data.reply.includes("quota") ||
            data.reply.includes("Gemini đang bận") ||
            data.reply.includes("Không thể kết nối")
        ) {

            

            return fallbackAI(message);

        }

        return data.reply;

    } catch (err) {

        console.error("askAI:", err);

        
        

        return fallbackAI(message);

    }

}