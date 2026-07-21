

import ModuleRegistry from "./ModuleRegistry.js";

export default class ModuleManager {

    constructor(kernel) {

        this.kernel = kernel;

        this.registry = new ModuleRegistry();

    }

    register(name, module) {

        if (this.registry.has(name)) {
    console.warn(`Module '${name}' đã tồn tại.`);
    return;
}

this.registry.register(name, module);

    }

    get(name) {

        return this.registry.get(name);

    }

    has(name) {

        return this.registry.has(name);

    }

    remove(name) {

        this.registry.remove(name);

    }

    list() {

        return this.registry.list();

    }

    async loadAll() {

        console.log("===== Module Manager =====");

        for (const name of this.registry.list()) {

    const module = this.registry.get(name);

            if (typeof module.load === "function") {

                console.log("Loading:", name);

                await module.load(this.kernel);

            }

        }

        console.log("All modules loaded.");

    }

}