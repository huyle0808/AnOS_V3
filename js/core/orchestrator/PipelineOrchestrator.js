// ==========================================
// AnOS V3
// Pipeline Orchestrator
// ==========================================


import PipelineState from "./PipelineState.js";


import StepManager from "./StepManager.js";


// Steps

import ContextStep from "./steps/ContextStep.js";


import EmotionStep from "./steps/EmotionStep.js";


import PlannerStep from "./steps/PlannerStep.js";


import RouterStep from "./steps/RouterStep.js";


import AIStep from "./steps/AIStep.js";


import ReviewStep from "./steps/ReviewStep.js";


import MemoryStep from "./steps/MemoryStep.js";


export default class PipelineOrchestrator {



constructor(){


    this.manager =
        new StepManager();


    this.registerSteps();


}





registerSteps(){



    // 1. Lấy ngữ cảnh

    this.manager.add(
        new ContextStep()
    );



    // 2. Phân tích cảm xúc

    this.manager.add(
        new EmotionStep()
    );



    // 3. Lập kế hoạch

    this.manager.add(
        new PlannerStep()
    );



    // 4. Điều hướng kỹ năng

    this.manager.add(
        new RouterStep()
    );



    // 5. AI xử lý sâu

    this.manager.add(
        new AIStep()
    );



    // 6. Kiểm tra câu trả lời

    this.manager.add(
        new ReviewStep()
    );



    // 7. Lưu trí nhớ

    this.manager.add(
        new MemoryStep()
    );


}





async execute(message){



    console.log(
        "🚀 AnOS Agent START"
    );



    const state =
        new PipelineState(
            message
        );



    const result =
        await this.manager.execute(
            state
        );



    result.finish();



    console.log(
        "🏁 AnOS Agent END"
    );



    return result;



}



}