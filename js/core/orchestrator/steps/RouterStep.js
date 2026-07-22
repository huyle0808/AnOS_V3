// ==========================================
// AnOS AI Agent
// Router Step
// ==========================================


import { route } from "../../router.js";



export default class RouterStep {



    async run(state){


        try{


            state.reply =
                await route(
                    state.input
                );


        }catch(error){


            console.warn(
                "Router error:",
                error
            );


        }


        return state;


    }



}