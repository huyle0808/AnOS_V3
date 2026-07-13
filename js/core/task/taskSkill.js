import { parseTask } from "./taskParser.js";
import * as task from "./taskEngine.js";

export async function taskSkill(message) {

    const cmd = parseTask(message);

    if (!cmd) return null;

    switch (cmd) {

        case "COUNT": {

            const s = task.statistics();

            return `Bạn có ${s.pending} task chưa hoàn thành (${s.done}/${s.total} đã hoàn thành).`;
        }

        case "LIST": {

            const tasks = task.getTasksList();

            if (!tasks.length) {
                return "Hiện chưa có task nào.";
            }

            return tasks.map((t, i) =>
                `${i + 1}. ${t.done ? "✅" : "⬜"} ${t.title}`
            ).join("\n");
        }

        case "ADD": {

    const title = message.replace(/thêm task/i, "").trim();

    if (!title)
        return "Bạn hãy nhập tên task.";

     task.addTask(title);

    return `Đã thêm task: ${title}`;
}

        case "DONE": {

    const match = message.match(/\d+/);

    if (!match)
        return "Ví dụ: Hoàn thành task 1";

    const index = Number(match[0]) - 1;

    const t = await task.completeTask(index);

    if (!t)
        return "Không tìm thấy task.";

    return `✅ Đã hoàn thành: ${t.title}`;
}
        case "DELETE":
            return "Chức năng xóa task đang được phát triển.";

        default:
            return null;
    }

}