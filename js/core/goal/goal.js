const goals = new Map();

export function createGoal(title) {

    const goal = {
        id: Date.now().toString(),
        title,
        status: "waiting",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        plans: [],
        result: null
    };

    goals.set(goal.id, goal);

    return goal;
}

export function getGoal(id) {
    return goals.get(id);
}

export function updateGoal(id, data) {

    const goal = goals.get(id);

    if (!goal) return null;

    Object.assign(goal, data);

    goal.updatedAt = Date.now();

    return goal;
}

export function listGoals() {
    return [...goals.values()];
}