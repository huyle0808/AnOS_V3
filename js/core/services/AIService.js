// ==========================================
// AnOS V4
// AI Service
// ==========================================

import PromptBuilder from "../prompt/PromptBuilder.js";
import ResponseBuilder from "./ResponseBuilder.js";

import AIGateway from "../../ai/AIGateway.js";
import AIRequest from "../../ai/AIRequest.js";

export default class AIService{

    constructor(){

        this.promptBuilder =
            new PromptBuilder();

        this.responseBuilder =
            new ResponseBuilder();

        this.gateway =
            new AIGateway();

    }

    async process(payload){

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

                    capability:
                        payload.capability ||

                        "general",

                    provider:
                        payload.provider ||

                        "gemini",

                    context:
                        payload

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