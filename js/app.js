
import "./core/plugin/testPlugin.js";
import { think } from "./core/brain.js";
import { loadMemory } from "./core/sync.js";

const btn = document.getElementById("send");
const input = document.getElementById("prompt");
const messages = document.getElementById("messages");

loadMemory();

btn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    addMessage("Bạn", text);

    try {
        const reply = await think(text);
        addMessage("AnOS", reply);
    } catch (e) {
        console.error(e);
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

    div.innerHTML =
        `<div class="bubble">${text.replace(/\n/g, "<br>")}</div>`;

    messages.appendChild(div);

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}