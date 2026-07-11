let currentTask = null;

export function setTask(task) {

    currentTask = task;

}

export function getTask() {

    return currentTask;

}

export function clearTask() {

    currentTask = null;

}