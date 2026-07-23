// ==========================================
// AnOS V4
// AI Step
// ==========================================

import AIService from "../../services/AIService.js";

const ai = new AIService();

export default class AIStep{

    async run(state){

        // Đã có reply thì bỏ qua

        if(
            state.reply &&
            state.reply.trim()!==""
        ){

            return state;

        }

        try{

            const payload={

                input:
                    state.input,

                context:
                    state.context,

                memory:
                    state.memory,

                intent:
                    state.intent,

                capability:
                    state.capability,

                goal:
                    state.goal,

                requirement:
                    state.requirement,

                solution:
                    state.solution,

                codePlan:
                    state.codePlan,

                emotion:
                    state.emotion

            };

            console.log(
                "📦 AI Payload:",
                payload
            );

            state.reply =
                await ai.process(payload);

            return state;

        }
        catch(error){

            console.error(
                "❌ AIStep:",
                error
            );

            state.reply =
                "Xin lỗi, AI đang bận.";

            return state;

        }

    }

}