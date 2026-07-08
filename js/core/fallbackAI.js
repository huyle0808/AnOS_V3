import { knowledge } from "./knowledge.js";

export function fallbackAI(message) {

    const text = message.toLowerCase();

    for (const item of knowledge) {

        for (const keyword of item.keywords) {

            if (text.includes(keyword)) {
                return item.answer;
            }

        }

    }

    return "😊 Xin lỗi nhé, Gemini hiện đang bận và mình chưa biết trả lời câu này.";

}