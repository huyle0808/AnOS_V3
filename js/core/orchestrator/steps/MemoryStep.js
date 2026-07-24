// ==========================================
// AnOS AI Agent
// Memory Step
// ==========================================

import { 
    processMemory,
    processHistory
}
from "../../pipeline/memory.js";

import { updateContext }
from "../../pipeline/context.js";

export default class MemoryStep {

    async run(state){

        // Khởi tạo nếu chưa có
        if(!state.memory){

            state.memory = {

                profile:{},

                history:[],

                tasks:[]

            };

        }


        if(!Array.isArray(state.memory.history)){

            state.memory.history = [];

        }


        // ==========================
        // Lưu thông tin Profile
        // ==========================

        await processMemory(
            state.input
        );


        // ==========================
        // Lưu lịch sử
        // ==========================

        await processHistory(

            state.input,

            state.reply

        );


        // ==========================
        // Cập nhật Context
        // ==========================

        updateContext(

            state.input,

            state.reply

        );


        // ==========================
        // Pipeline History
        // ==========================

        state.memory.history.push({

            user: state.input,

            assistant: state.reply,

            time: new Date()

        });


        if(state.memory.history.length > 20){

            state.memory.history.shift();

        }


        console.log(
            "✅ Memory updated"
        );


        // ==========================
        // Memory Confirmation
        // ==========================

        if(
            state.intent === "memory" &&
            !state.reply
        ){

            state.reply =
                "Mình đã ghi nhớ thông tin này.";

        }


        return state;

    }

}