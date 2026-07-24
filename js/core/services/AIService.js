// ==========================================
// AnOS V4
// AI Service
// ==========================================

import PromptBuilder from "../prompt/PromptBuilder.js";
import ResponseBuilder from "./ResponseBuilder.js";

import AIGateway from "../../ai/AIGateway.js";
import AIRequest from "../../ai/AIRequest.js";
import MemoryAnswerService from "./MemoryAnswerService.js";
export default class AIService{

    constructor(){
        
        this.promptBuilder =
            new PromptBuilder();

        this.responseBuilder =
            new ResponseBuilder();

        this.gateway =
            new AIGateway();
        this.memoryAnswer =
    new MemoryAnswerService();

    }

    async process(payload){
      // ==========================
// Memory Fast Answer
// Chỉ trả lời khi đang hỏi thông tin đã lưu
// ==========================

if (payload?.intent === "chat") {

    const memoryReply =
        this.memoryAnswer.answer(
            payload?.input || ""
        );

    if (memoryReply) {

        console.log("🧠 Memory Answer");

        return this.responseBuilder.build({

            answer: memoryReply,

            source: "memory",

            confidence: 1

        });

    }

}
        try{

            console.log(
                "📦 AI Payload:",
                payload
            );

            // ==========================
            // Build Prompt
            // ==========================

            const prompt =
                this.promptBuilder.build(payload);

            // ==========================
            // AI Request
            // ==========================

            const request =
    new AIRequest({

        prompt,

        input: payload.input,

        intent: payload.intent,

        capability:
            payload.capability || "general",

        provider:
            payload.provider || "gemini",

        context: payload,

        memory: payload.memory,

        goal: payload.goal

    });

            // ==========================
            // Execute
            // ==========================

            const response =
                await this.gateway.execute(request);

            console.log(
                "🤖 AI Response:",
                response
            );

            if(!response.success){

                return "Xin lỗi, AI hiện chưa phản hồi.";

            }

            return this.responseBuilder.build({

                answer:
                    response.text,

                source:
                    response.provider,

                confidence:1

            });

        }

        catch(error){

            console.error(
                "AIService Error:",
                error
            );

            return "AIService gặp lỗi.";

        }

    }

}