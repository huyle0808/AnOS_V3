let waitingTeach = false;

export async function teach(message) {

    const text = message.trim();
    const lower = text.toLowerCase();

    // Bắt đầu dạy
    if (
        lower === "dạy bạn nhé" ||
        lower === "dạy nhé" ||
        lower === "học nhé"
    ) {
        waitingTeach = true;
        return "😊 Bạn muốn dạy mình điều gì?";
    }

    // Đang chờ kiến thức
    if (waitingTeach) {

        waitingTeach = false;

        const m = text.match(/^(.+?)\s+là\s+(.+)$/i);

        if (!m) {
            return "❌ Hãy nhập theo dạng: Mèo là động vật";
        }

        const question = m[1].trim();
        const answer = m[2].trim();

        await fetch("/knowledge/teach", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question,
                answer
            })
        });

        return `🎉 Mình đã học: ${question} → ${answer}`;
    }

    return null;
}