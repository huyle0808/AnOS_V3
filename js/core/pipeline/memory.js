import {
    remember,
    addHistory,
    getProfile
} from "../memory.js";

import { saveMemory } from "../sync.js";

export async function processMemory(text) {

    console.log("📝 MEMORY INPUT:", text);

    if (typeof text !== "string") {
        text = text?.input || "";
    }

    text = text.trim();

    if (!text) {
        return;
    }

    let m;

    // ==========================
    // GHI NHỚ TÊN
    // ==========================

    m = text.match(
        /^(?:tên tôi là|tôi tên là|tôi là|mình là|mình tên là|tên mình là)\s+(.+)$/i
    );

    if (m) {

        const name = m[1].trim();

        const checkName = name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[?.!,]/g, "")
            .trim();

        const invalidNames = [
            "gi",
            "ten",
            "ten gi",
            "la ai",
            "ai",
            "khong biet",
            "khong ro"
        ];

        if (
            name &&
            !invalidNames.includes(checkName)
        ) {

            console.log("👤 SAVE NAME:", name);

            remember("name", name);

            console.log("✅ PROFILE:", getProfile());

            await saveMemory();
        }

        return;
    }

    // ==========================
    // GHI NHỚ TUỔI
    // ==========================

    m = text.match(
        /^(?:tôi|mình)(?:\s+năm\s+nay)?\s+(\d+)\s*tuổi[.!?]*$/i
    );

    if (m) {

        console.log("🎂 SAVE AGE:", m[1]);

        remember("age", m[1]);

        console.log("✅ PROFILE:", getProfile());

        await saveMemory();

        return;
    }

    // ==========================
    // GHI NHỚ NGHỀ
    // ==========================

    m = text.match(
        /^(?:tôi làm|mình làm|nghề của tôi là|nghề mình là)\s+(.+)$/i
    );

    if (m) {

        const job = m[1].trim();

        const invalidJob = [
            "gì",
            "gì?",
            "nghề gì",
            "nghề gì?",
            "nghề",
            "không biết",
            "không rõ"
        ];

        const checkJob = job
            .toLowerCase()
            .replace(/[?.!,]/g, "")
            .trim();

        if (
            job &&
            !invalidJob.includes(checkJob)
        ) {

            console.log("💼 SAVE JOB:", job);

            remember("job", job);

            console.log("✅ PROFILE:", getProfile());

            await saveMemory();
        }

        return;
    }

    // ==========================
    // GHI NHỚ ĐỒ UỐNG
    // ==========================

    m = text.match(
        /^(?:tôi thích uống|mình thích uống)\s+(.+)$/i
    );

    if (m) {

        const drink = m[1].trim();

        const check = drink
            .toLowerCase()
            .replace(/[?.!,]/g, "")
            .trim();

        const invalidDrink = [
            "gì",
            "gi",
            "bao nhiêu",
            "thứ gì"
        ];

        if (
            drink &&
            !invalidDrink.includes(check)
        ) {

            console.log("🥤 SAVE DRINK:", drink);

            remember("drink", drink);

            console.log("✅ PROFILE:", getProfile());

            await saveMemory();
        }

        return;
    }

}

export async function processHistory(text, reply) {

    const lower = (text || "").toLowerCase();

    // Không lưu các câu hỏi về lịch sử
    if (
        lower.includes("lịch sử") ||
        lower.includes("đã nói gì") ||
        lower.includes("nhớ gì")
    ) {
        return;
    }

    // Không lưu nếu reply rỗng
    if (!reply) {
        return;
    }

    addHistory(`👤 ${text}`);
    addHistory(`🤖 ${reply}`);

    await saveMemory();
}