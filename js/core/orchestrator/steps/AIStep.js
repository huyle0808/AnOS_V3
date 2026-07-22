// ==========================================
// AnOS V3
// AI Step
// ==========================================


import AIService 
from "../../services/AIService.js";



const ai =
new AIService();



export default class AIStep {



async run(state){



    // Nếu Router đã xử lý
    if(state.reply){

        return state;

    }



    try{


        state.reply =
        await ai.process(

            state.input,

            state.context

        );



        return state;



    }catch(error){


        console.error(
            "AIStep Error:",
            error
        );



        state.reply =
        "AI gặp lỗi khi xử lý yêu cầu.";



        return state;


    }



}



}