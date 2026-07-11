const agents = {};

export function registerAgent(name, agent) {
    agents[name] = agent;
}

export function getAgent(name) {
    return agents[name] || null;
}

export function listAgents() {
    return Object.keys(agents);
}

export async function runAgent(name, input) {

    const agent = getAgent(name);

    if (!agent) {
        throw new Error(`Agent "${name}" không tồn tại.`);
    }

    return await agent.run(input);
}