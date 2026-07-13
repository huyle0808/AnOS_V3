const KEY = "anos_tasks";

export function loadTasks() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
}

export function saveTasks(tasks) {
    localStorage.setItem(KEY, JSON.stringify(tasks));
}

export function clearTasks() {
    localStorage.removeItem(KEY);
}