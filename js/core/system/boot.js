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

    for (const [name, fn] of services) {

        console.log(`▶ ${name}`);

        try {

            await fn();

await emit(`${name}.ready`);

console.log(`✔ ${name}`);

        } catch (e) {

            console.error(`❌ ${name}:`, e);

            throw e;
        }
    }
await startPlugins();
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