import MemoryService from "./MemoryService.js";
import KnowledgeService from "./KnowledgeService.js";
import ReasonService from "./ReasonService.js";

import WorkflowService from "./WorkflowService.js";
import DecisionService from "./DecisionService.js";
import ResponseBuilder from "./ResponseBuilder.js";

//import AIGateway from "../ai/AIGateway.js";

export default class AIService {

    constructor() {

        this.memory = new MemoryService();
        this.knowledge = new KnowledgeService();
        this.reason = new ReasonService();

        this.workflow = new WorkflowService(this);
        this.decision = new DecisionService();
        this.builder = new ResponseBuilder();

      //  this.gateway = new AIGateway();

    }

    async process(message) {
       console.log("AIService Start");
        console.log("================================");
        console.log("🤖 AIService.process()");
        console.log("📩 Message:", message);

        try {

            console.log("① Workflow");

            const context = await this.workflow.run(message);
            console.log("Workflow Context:", context);
            console.log("✅ Workflow:", context);

            console.log("② Decision");

            let result = await this.decision.process(context);
            console.log("Decision Result:", result);
            console.log("✅ Decision:", result);

            if (!result || !result.answer) {

    console.log("③ Không có kết quả");

    result = {
        found: false,
        source: "system",
        answer: "AI Gateway chưa được cài đặt."
    };

}

            

            console.log("④ ResponseBuilder");

            const response = this.builder.build(result);

            console.log("✅ Final Response:", response);

            console.log("================================");

            return response;

        } catch (error) {

            console.error("❌ AIService Error:", error);

            return "⚠️ AIService gặp lỗi:\n\n" + (error.stack || error.message);

        }

    }

}