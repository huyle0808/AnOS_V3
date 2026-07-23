// ==========================================
// AnOS V4
// Generate Code Step
// ==========================================

export default class GenerateCodeStep {

    async run(state){

        console.log("💻 Generate Code Plan");

        const solution =
            state.solution || {};

        state.codePlan = {

            language: "JavaScript",

            framework: "Vanilla",

            folders: [],

            files: [],

            ready: false

        };

        // ==========================
        // Application
        // ==========================

        if(
            solution.architecture ===
            "Modular AI Architecture"
        ){

            state.codePlan.ready = true;

            state.codePlan.folders = [

                "css",

                "js",

                "js/core",

                "js/core/orchestrator",

                "js/core/orchestrator/steps",

                "js/services",

                "js/database",

                "assets"

            ];

            state.codePlan.files = [

                "index.html",

                "style.css",

                "app.js",

                "router.js",

                "AIService.js",

                "MemoryService.js",

                "PipelineOrchestrator.js",

                "PipelineState.js",

                "StepManager.js"

            ];

        }

        // ==========================
        // AI Project
        // ==========================

        if(
            solution.api === "Gemini"
        ){

            state.codePlan.files.push(

                "GeminiProvider.js",

                "PromptBuilder.js"

            );

        }

        // ==========================
        // Firebase
        // ==========================

        if(
            solution.database === "Firebase"
        ){

            state.codePlan.files.push(

                "firebase.js",

                "FirestoreService.js"

            );

        }

        console.log(
            "📂 Code Plan:",
            state.codePlan
        );

        return state;

    }

}