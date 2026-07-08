import { think } from "./core/brain.js";
import { loadMemory } from "./core/sync.js";

const btn = document.getElementById("send");
const input = document.getElementById("prompt");
const messages = document.getElementById("messages");

window.debugLog = function () {};
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

    console.error("Lỗi app.js:", e);

    addMessage("AnOS", "Lỗi: " + e.message);

}

};

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        btn.click();
    }

});

function addMessage(sender, text){

    const div=document.createElement("div");

    div.className=(sender==="Bạn")?"user":"bot";

    div.innerHTML=`
        <div class="bubble">
            ${text.replace(/\n/g,"<br>")}
        </div>
    `;

    messages.appendChild(div);

    window.scrollTo({
        top:document.body.scrollHeight,
        behavior:"smooth"
    });

}
