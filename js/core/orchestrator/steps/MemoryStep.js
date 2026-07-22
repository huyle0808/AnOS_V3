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


    await processHistory(

        state.input,

        state.reply

    );



    updateContext(

        state.input,

        state.reply

    );


    return state;


}


}