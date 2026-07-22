// ==========================================
// AnOS AI Agent
// Review Step
// ==========================================


export default class ReviewStep {



    async run(state){


        if(!state.reply){


            state.reply =
            "Mình chưa có câu trả lời.";


        }



        return state;


    }


}