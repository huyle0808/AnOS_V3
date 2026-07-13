import { getTasks, setTasks } from "../memory.js";

export function getTasksList() {
    return getTasks();
}

export  function addTask(title) {

    const tasks = getTasks();

    tasks.push({
        id: Date.now(),
        title,
        done: false,
        created: new Date().toISOString()
    });

    setTasks(tasks);
    
    return tasks;
}

export function completeTask(index) {

    const tasks = getTasks();

    const task = tasks[index];

    if (!task) return false;

    task.done = true;
    task.completed = new Date().toISOString();

    setTasks(tasks);

    return task;
}

export function deleteTask(index) {

    const tasks = getTasks();

    tasks.splice(index, 1);

    setTasks(tasks);

    return tasks;
}

export function statistics() {

    const tasks = getTasks();

    return {
        total: tasks.length,
        done: tasks.filter(t => t.done).length,
        pending: tasks.filter(t => !t.done).length
    };

}