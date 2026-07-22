// ==========================================
// AnOS V3
// Main Pipeline
// Orchestrator
// ==========================================


import PipelineOrchestrator from "./orchestrator/PipelineOrchestrator.js";


const orchestrator =
    new PipelineOrchestrator();



export async function pipeline(message){


    const result =
        await orchestrator.execute(message);


    return result;


}