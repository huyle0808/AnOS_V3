const workflows = new Map();

export function registerWorkflow(name, steps) {
    workflows.set(name, steps);
}

export function getWorkflow(name) {
    return workflows.get(name);
}

export async function runWorkflow(name, context) {

    const steps = workflows.get(name);

    if (!steps) {
        throw new Error(`Workflow "${name}" không tồn tại.`);
    }

    for (const step of steps) {
        await step(context);
    }

    return context;
}