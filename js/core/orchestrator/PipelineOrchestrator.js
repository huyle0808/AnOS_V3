// ==========================================
// AnOS V3.5
// Pipeline Orchestrator
// Dynamic Agent Pipeline
// ==========================================

import PipelineState from "./PipelineState.js";
import StepManager from "./StepManager.js";

// ==========================================
// Core Steps
// ==========================================

import ContextStep from "./steps/ContextStep.js";
import EmotionStep from "./steps/EmotionStep.js";
import PlannerStep from "./steps/PlannerStep.js";
import RouterStep from "./steps/RouterStep.js";

// ==========================================
// Agent Steps
// ==========================================

import CreativeStep from "./steps/CreativeStep.js";
import AIStep from "./steps/AIStep.js";
import ReviewStep from "./steps/ReviewStep.js";
import MemoryStep from "./steps/MemoryStep.js";
import SmallTalkStep from "./steps/SmallTalkStep.js";

// ==========================================
// Software Engineer Steps
// ==========================================

import AnalyzeRequirementStep from "./steps/AnalyzeRequirementStep.js";
import DesignSolutionStep from "./steps/DesignSolutionStep.js";
import GenerateCodeStep from "./steps/GenerateCodeStep.js";

// ==========================================
// Planning Steps
// ==========================================

import TaskPlannerStep from "./steps/TaskPlannerStep.js";

// ==========================================
// Understanding
// ==========================================

import UnderstandStep from "./steps/UnderstandStep.js";

export default class PipelineOrchestrator {

    constructor(){

        this.manager = new StepManager();

        this.planner = new PlannerStep();

        this.registerSteps();

    }

    // ======================================
    // Register All Steps
    // ======================================

    registerSteps(){

        // Core

        this.manager.register(
            "context",
            new ContextStep()
        );

        this.manager.register(
            "emotion",
            new EmotionStep()
        );

        this.manager.register(
            "router",
            new RouterStep()
        );

        // Conversation

        this.manager.register(
            "smalltalk",
            new SmallTalkStep()
        );

        // Creative

        this.manager.register(
            "creative",
            new CreativeStep()
        );

        // Software Engineer

        this.manager.register(
            "analyze_requirement",
            new AnalyzeRequirementStep()
        );

        this.manager.register(
            "design_solution",
            new DesignSolutionStep()
        );

        this.manager.register(
            "generate_code",
            new GenerateCodeStep()
        );

        // Planning

        this.manager.register(
            "analyze_task",
            new TaskPlannerStep()
        );

        this.manager.register(
            "create_steps",
            new TaskPlannerStep()
        );

        // General

        this.manager.register(
            "understand",
            new UnderstandStep()
        );

        this.manager.register(
            "ai",
            new AIStep()
        );

        // Review

        this.manager.register(
            "review",
            new ReviewStep()
        );

        // Memory

        this.manager.register(
            "memory",
            new MemoryStep()
        );

    }

    // ======================================
    // Execute Pipeline
    // ======================================

    async execute(message){

    console.log("🚀 AnOS Agent START");

    const state =
        new PipelineState(message);

    try{

        // STEP 1
        await this.manager
            .get("context")
            .run(state);

        state.addStep("context");

        // STEP 2
        await this.manager
            .get("emotion")
            .run(state);

        state.addStep("emotion");

        // STEP 3
        await this.planner.run(state);

        state.addStep("planner");

        console.log("🧠 GENERATED PLAN:",state.plan);
        console.log("🎯 INTENT:",state.intent);
        console.log("🧩 CAPABILITY:",state.capability);
        console.log("🎯 GOAL:",state.goal);

        // STEP 4
        const result =
            await this.manager.execute(state);

        // STEP 5
        result.finish();

        console.log(
            "📌 STEPS:",
            result.metadata.steps
        );

        console.log(
            "🏁 AnOS Agent END"
        );

        return result;

    }
    catch(error){

        console.error(
            "❌ Pipeline Error:",
            error
        );

        state.fail(error);

        state.reply =
    "Xin lỗi, AnOS gặp lỗi khi xử lý yêu cầu.";

        return state;

    }

}
}