import {
    remember,
    addHistory
} from "../memory.js";

import { saveMemory } from "../sync.js";

export async function processMemory(text) {

    let m;

    // ===== GHI NHỚ TÊN =====
    m = text.match(/^tên tôi là\s+(.+)$/i);

    if (m) {

        const name = m[1].trim();

        if (
            name &&
            name.toLowerCase() !== "gì"
        ) {
            remember("name", name);
        }
    }

    // ===== GHI NHỚ TUỔI =====
    m = text.match(/^tôi\s+(\d+)\s+tuổi$/i);

    if (m) {

        remember("age", m[1]);
    }

    // ===== GHI NHỚ NGHỀ =====
    m = text.match(/^tôi làm\s+(.+)$/i);

    if (m) {

        const job = m[1].trim();

        if (
            job &&
            job.toLowerCase() !== "gì"
        ) {
            remember("job", job);
        }
    }

    // ===== GHI NHỚ ĐỒ UỐNG =====
    m = text.match(/^tôi thích uống\s+(.+)$/i);

    if (m) {

        const drink = m[1].trim();
        const check = drink.toLowerCase();

        if (
            drink &&
            check !== "gì" &&
            check !== "gì?" &&
            check !== "bao nhiêu" &&
            check !== "thứ gì"
        ) {
            remember("drink", drink);
        }
    }
}

export async function processHistory(text, reply) {

    const lower = text.toLowerCase();

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