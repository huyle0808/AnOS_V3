import { createPlan } from "../planner/index.js";
import { addTask } from "../task/index.js";
import { runAgent } from "../agent/index.js";

export async function execute(goal) {

    const plan = createPlan(goal);

    addTask({
        id: Date.now().toString(),
        planId: plan.id,
        agent: "chat",
        input: goal,
        status: "waiting"
    });

    let result = "";

    for (const task of plan.tasks) {

        result = await runAgent(
            task.agent,
            task.input
        );

    }

    return result;

}