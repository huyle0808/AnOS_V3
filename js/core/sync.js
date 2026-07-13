import {
    getProfile,
    getHistory,
    getTasks,
    setProfile,
    setHistory,
    setTasks
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
        setTasks(data.tasks || []);
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
    history: getHistory(),
    tasks: getTasks()
})

        });

        console.log("✅ Đã lưu bộ nhớ.");

    } catch (e) {

        console.log("❌ Không lưu được bộ nhớ:", e.message);

    }

}