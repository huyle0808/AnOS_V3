import { register } from "../system/boot.js";
import { loadKnowledge } from "../knowledge/loader.js";

register("Knowledge", async () => {

    const ok = await loadKnowledge();

    if (!ok) {
        throw new Error("Không thể nạp Knowledge");
    }

    console.log("📚 Knowledge Ready");

});