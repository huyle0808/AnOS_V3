import "./core/plugin/testPlugin.js";
import { think } from "./core/brain.js";
import { loadMemory } from "./core/sync.js";

const btn = document.getElementById("send");
const input = document.getElementById("prompt");
const messages = document.getElementById("messages");

loadMemory();

btn.onclick = async () => {

    console.log("① Click");

    const text = input.value.trim();

    console.log("② Text:", text);

    if (!text) return;

    input.value = "";

    addMessage("Bạn", text);

    try {

        console.log("③ Gọi think()");

        const reply = await think(text);

        console.log("④ think() trả về:", reply);

        addMessage("AnOS", reply);

        console.log("⑤ Hoàn tất");

    } catch (e) {

        console.error("❌ app.js Error:", e);

        addMessage("AnOS", "Đã xảy ra lỗi.");

    }

};

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});

function addMessage(sender, text) {

    if (text === null || text === undefined) {
        text = "";
    }

    if (typeof text !== "string") {
        text = JSON.stringify(text, null, 2);
    }

    const div = document.createElement("div");
    div.className = sender === "Bạn" ? "user" : "bot";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    div.appendChild(bubble);

    messages.appendChild(div);

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}