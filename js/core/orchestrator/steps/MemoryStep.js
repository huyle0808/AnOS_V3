// ==========================================
// AnOS AI Agent
// Memory Step
// ==========================================

import { processHistory }
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

        // Lưu lịch sử vào Memory Engine
        await processHistory(

            state.input,

            state.reply

        );

        // Cập nhật Context
        updateContext(

            state.input,

            state.reply

        );

        // Lưu vào PipelineState
        state.memory.history.push({

            user: state.input,

            assistant: state.reply,

            time: new Date()

        });

        // Giới hạn lịch sử (20 cuộc hội thoại gần nhất)
        if(state.memory.history.length > 20){

            state.memory.history.shift();

        }

        console.log(
            "✅ Memory updated"
        );

        return state;

    }

}