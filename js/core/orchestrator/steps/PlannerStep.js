// ==========================================
// AnOS AI Agent
// Planner Step
// ==========================================


import { createPlan } from "../../reason/planner.js";



export default class PlannerStep {



    async run(state){


        try{


            state.plan =
                createPlan(
                    state.input
                );


        }catch(error){


            console.warn(
                "Planner error:",
                error
            );


            state.plan=[];


        }


        return state;


    }



}