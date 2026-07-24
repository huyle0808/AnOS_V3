import { set, clear } from "./registry.js";
import { emit } from "./events.js";
import { startPlugins } from "./plugins.js";
let ready = false;

const services = new Map();

export function register(name, fn) {

    if (!name || typeof name !== "string") {
        throw new Error("Tên service không hợp lệ");
    }

    if (typeof fn !== "function") {
        throw new Error(`Service "${name}" không phải là function`);
    }

    if (services.has(name)) {
        console.warn(`⚠ Service "${name}" đã tồn tại`);
        return;
    }

    services.set(name, fn);
    set(name, fn);
}

export async function boot() {

    if (ready) return;

    console.log("⚙ Boot Runtime");
    console.log("Services:", [...services.keys()]);
    for (const [name, fn] of services) {

    console.log("▶ Start:", name);

    try {

        console.log("   gọi service...");
        await fn();

        console.log("   service xong");

        console.log("   emit...");
        await emit(`${name}.ready`);

        console.log("   emit xong");

        console.log("✔ Finish:", name);

    } catch (e) {

        console.error("❌ Boot Error:", name, e);

        throw e;
    }
}

console.log("▶ Start Plugins");

await startPlugins();

console.log("✔ Plugins Done");

ready = true;

await emit("boot.ready");

console.log("✔ Boot Finished");
    ready = true;

await emit("boot.ready");

console.log("✔ Boot Finished");
}

export function isReady() {
    return ready;
}

export function getServices() {
    return [...services.keys()];
}

export function resetBoot() {

    ready = false;

    services.clear();

    clear();
}