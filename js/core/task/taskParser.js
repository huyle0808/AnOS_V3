export function parseTask(text) {

    const msg = text.toLowerCase().trim();

    if (
        msg.startsWith("thêm task") ||
        msg.startsWith("thêm công việc") ||
        msg.startsWith("tạo task")
    )
        return "ADD";

    if (
        msg.startsWith("hoàn thành task") ||
        msg.startsWith("đánh dấu task") ||
        msg.startsWith("xong task")
    )
        return "DONE";

    if (
        msg.startsWith("xóa task") ||
        msg.startsWith("xóa công việc")
    )
        return "DELETE";

    if (
        msg.includes("bao nhiêu task") ||
        msg.includes("còn bao nhiêu task")
    )
        return "COUNT";

    if (
        msg.includes("liệt kê") ||
        msg.includes("danh sách task")
    )
        return "LIST";

    return null;
}