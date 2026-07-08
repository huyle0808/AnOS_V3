import {
    getProfile,
    getHistory,
    setProfile,
    setHistory
} from "./memory.js";

// Nạp bộ nhớ từ server
export async function loadMemory() {

    try {

        const res = await fetch("/memory");

        if (!res.ok) {
            throw new Error("Không đọc được memory");
        }

        const data = await res.json();

        setProfile(data.profile || {});
        setHistory(data.history || []);

        console.log("✅ Đã nạp bộ nhớ.");

    } catch (e) {

        console.log("❌ Không nạp được bộ nhớ:", e.message);

    }

}

// Lưu bộ nhớ lên server
export async function saveMemory() {

    try {

        await fetch("/memory", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                profile: getProfile(),
                history: getHistory()
            })

        });

        console.log("✅ Đã lưu bộ nhớ.");

    } catch (e) {

        console.log("❌ Không lưu được bộ nhớ:", e.message);

    }

}