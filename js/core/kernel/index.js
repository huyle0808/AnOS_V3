import { loadConfig } from "../config/index.js";
import { initRegistry } from "../registry/index.js";
import { initModule } from "../module/index.js";
import { initMemory } from "../memory/index.js";

let started = false;

export async function boot() {

    if (started) {
        return true;
    }

    console.log("🚀 AI AIGENT Booting...");

    await loadConfig();

    await initRegistry();

    await initModule();

    await initMemory();

    started = true;

    console.log("✅ AI AIGENT Ready");

    return true;

}

export function isReady() {

    return started;

}