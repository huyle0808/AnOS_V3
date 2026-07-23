// ==========================================
// AnOS V4
// Dispatcher Step
// Dynamic Agent Dispatcher
// ==========================================

export default class DispatcherStep {

    async run(state){

        const capability = state.capability;

        switch(capability){

            case "conversation":

                state.plan = [
                    "smalltalk",
                    "review",
                    "memory"
                ];
                break;

            case "software_engineer":

                state.plan = [
                    "analyze_requirement",
                    "design_solution",
                    "generate_code",
                    "ai",
                    "review",
                    "memory"
                ];
                break;

            case "creative_writer":

                state.plan = [
                    "creative",
                    "knowledge",
                    "ai",
                    "review",
                    "memory"
                ];
                break;

            case "planner":

                state.plan = [
                    "analyze_task",
                    "create_steps",
                    "ai",
                    "review",
                    "memory"
                ];
                break;

            case "memory_manager":

                state.plan = [
                    "memory",
                    "ai",
                    "review"
                ];
                break;

            default:

                state.plan = [
                    "understand",
                    "ai",
                    "review",
                    "memory"
                ];

        }

        console.log(
            "🚦 Dispatcher:",
            capability
        );

        console.log(
            "📋 Final Plan:",
            state.plan
        );

        return state;

    }

}