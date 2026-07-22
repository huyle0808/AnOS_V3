// ==========================================
// AnOS AI Agent
// Context Step
// ==========================================


import { getContext }
from "../../context.js";



export default class ContextStep {



async run(state){


    state.context =
        getContext();


    return state;


}



}