import { boot } from "./boot.js";

let started = false;

export async function startup() {

    if (started) {
        return;
    }

    console.log("================================");
    console.log("🚀 Starting AnOS...");
    console.log("================================");

    await boot();

    started = true;

    console.log("✅ AnOS Ready");
}

export function isStarted() {
    return started;
}