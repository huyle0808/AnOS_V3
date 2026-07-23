// ==========================================
// AnOS V4
// Design Solution Step
// ==========================================

export default class DesignSolutionStep {

    async run(state){

        console.log("🏗 Design Solution");

        const requirement =
            state.requirement || {};

        state.solution = {

            architecture: "General",

            modules: [],

            technologies: [],

            database: "",

            api: "",

            deployment: ""

        };

        // ==========================
        // Application
        // ==========================

        if(requirement.type === "application"){

            state.solution.architecture =
                "Modular AI Architecture";

            state.solution.modules = [

                "UI",
                "Router",
                "Pipeline",
                "Memory",
                "Database",
                "AI Service"

            ];

            state.solution.technologies = [

                "JavaScript",
                "HTML",
                "CSS"

            ];

        }

        // ==========================
        // AI
        // ==========================

        if(
            requirement.features?.includes("AI")
        ){

            state.solution.technologies.push(
                "Gemini API"
            );

            state.solution.api =
                "Gemini";

        }

        // ==========================
        // Database
        // ==========================

        if(
            requirement.features?.includes("Database")
        ){

            state.solution.database =
                "Firebase";

            state.solution.technologies.push(
                "Firebase"
            );

        }

        // ==========================
        // Deploy
        // ==========================

        state.solution.deployment =
            "Netlify";

        console.log(
            "🏗 Solution:",
            state.solution
        );

        return state;

    }

}