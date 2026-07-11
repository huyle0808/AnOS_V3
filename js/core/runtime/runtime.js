const runtime = {

    version: "3.0.0",

    started: false,

    modules: new Map(),

    state: {}

};

export function getRuntime() {

    return runtime;

}

export function registerModule(name, module) {

    runtime.modules.set(name, module);

}

export function getModule(name) {

    return runtime.modules.get(name);

}

export function listModules() {

    return [...runtime.modules.keys()];

}

export async function startRuntime() {

    if (runtime.started) {

        return;

    }

    runtime.started = true;

    for (const [name, module] of runtime.modules) {

        if (typeof module.init === "function") {

            console.log("▶ Init:", name);

            await module.init();

        }

    }

    console.log("✅ Runtime Started");

}