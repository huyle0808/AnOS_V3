import { recall } from "../memory.js";

export function whoami(message) {
console.log("WHOAMI:", message);
    const text = message.toLowerCase().trim();

    // Giới thiệu AnOS
    if (
        text.includes("bạn là ai") ||
        text.includes("anos là ai")
    ) {
        return "Mình là AnOS V3, trợ lý AI của bạn. 😊";
    }
// Hỏi tên
if (
    text.includes("tên tôi là gì") ||
    text.includes("tôi tên gì") ||
    text.includes("tên mình là gì")
) {

    const name = recall("name");

    if (name) {
        return "Tên của bạn là " + name + ". 😊";
    }

    return "Mình chưa biết tên của bạn.";
}
    // Hỏi nghề
    if (
        text.includes("tôi làm nghề gì") ||
        text.includes("nghề của tôi") ||
        text.includes("tôi làm công việc gì")
    ) {

        const job = recall("job");

        if (job) {
            return "Bạn làm " + job + ". 😊";
        }

        return "Mình chưa biết nghề của bạn.";
    }
// Hỏi tuổi
if (
    text.includes("tôi bao nhiêu tuổi") ||
    text.includes("tuổi của tôi")
) {

    const age = recall("age");

    if (age) {
        return "Bạn " + age + " tuổi. 😊";
    }

    return "Mình chưa biết tuổi của bạn.";
}

// Hỏi màu yêu thích
if (
    text.includes("màu yêu thích của tôi") ||
    text.includes("tôi thích màu gì")
) {

    const color = recall("color");

    if (color) {
        return "Bạn thích màu " + color + ". 😊";
    }

    return "Mình chưa biết màu yêu thích của bạn.";
}
// Hỏi quê quán
if (
    text.includes("tôi ở đâu") ||
    text.includes("quê tôi ở đâu") ||
    text.includes("tôi sống ở đâu")
) {
    const hometown = recall("hometown");

    if (hometown) {
        return "Bạn ở " + hometown + ". 😊";
    }

    return "Mình chưa biết bạn ở đâu.";
}
// ===== BẠN BIẾT GÌ VỀ TÔI =====
if (
    text.includes("bạn biết gì về tôi") ||
    text.includes("bạn nhớ gì về tôi")
) {

    let info = [];

    const name = recall("name");
    const age = recall("age");
    const job = recall("job");
    const hometown = recall("hometown");
    const color = recall("color");
    const drink = recall("drink");

    if (name) info.push("Tên: " + name);
    if (age) info.push("Tuổi: " + age);
    if (job) info.push("Nghề: " + job);
    if (hometown) info.push("Nơi ở: " + hometown);
    if (color) info.push("Màu yêu thích: " + color);
    if (drink) info.push("Đồ uống yêu thích: " + drink);

    if (info.length === 0) {
        return "Mình chưa biết gì về bạn.";
    }

    return "Đây là những gì mình nhớ về bạn:\n\n" + info.join("\n");
}
    return null;
}
