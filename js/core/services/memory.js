import { register } from "../system/boot.js";
import { loadMemory } from "../sync.js";

register("Memory", async () => {

    console.log("📦 Memory Init");

    await loadMemory();

    console.log("✅ Memory Ready");

});