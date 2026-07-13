import { addTask as saveTask } from "../task/task.js";

export function createPlan(goal) {

    return {
        id: Date.now().toString(),
        goal,
        tasks: [],
        status: "waiting",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        metadata: {}
    };

}

export function addTask(plan, task) {

    plan.tasks.push({
        id: Date.now().toString() + Math.random(),
        status: "waiting",
        ...task
    });

    plan.updatedAt = Date.now();

    return plan;
}

export function updateTask(plan, id, data) {

    const task = plan.tasks.find(t => t.id === id);

    if (!task) return plan;

    Object.assign(task, data);

    plan.updatedAt = Date.now();

    return plan;
}

export function finishTask(plan, id) {

    return updateTask(plan, id, {
        status: "done"
    });

}

export function failTask(plan, id) {

    return updateTask(plan, id, {
        status: "failed"
    });

}

export function savePlanTasks(plan) {

    for (const task of plan.tasks) {

        saveTask({
            id: task.id,
            planId: plan.id,
            goal: plan.goal,
            ...task
        });

    }

    return plan;
}