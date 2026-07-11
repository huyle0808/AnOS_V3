const tasks = new Map();

export function addTask(task) {

    tasks.set(task.id, task);

    return task;

}

export function getTask(id) {

    return tasks.get(id);

}

export function updateTask(id, data) {

    const task = tasks.get(id);

    if (!task) return null;

    Object.assign(task, data);

    return task;

}

export function removeTask(id) {

    tasks.delete(id);

}

export function listTasks() {

    return [...tasks.values()];

}