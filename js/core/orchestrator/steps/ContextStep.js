// ==========================================
// AnOS V3.5
// Context Step
// ==========================================

import {
    getContext
} from "../../pipeline/context.js";

export default class ContextStep {

    async run(state){

        try{

            const context =
                getContext() || {};

            state.context = {

                ...state.context,

                ...context

            };

            // Đưa lịch sử Memory vào Context

            if(
                state.memory &&
                Array.isArray(state.memory.history)
            ){

                state.context.history =
                    state.memory.history
                    .slice(-10);

            }

            // Metadata

            state.context.intent =
                state.intent;

            state.context.capability =
                state.capability;

            state.context.goal =
                state.goal;

            console.log(
                "✅ Context loaded"
            );

        }
        catch(error){

            console.warn(
                "Context Error:",
                error
            );

        }

        return state;

    }

}