import PluginRegistry from "./PluginRegistry.js";

export default class PluginManager {

    constructor(kernel) {

        this.kernel = kernel;
        this.registry = new PluginRegistry();

    }

    register(name, plugin) {

        if (this.registry.has(name)) {
            console.warn(`Plugin '${name}' đã tồn tại.`);
            return;
        }

        this.registry.register(name, plugin);

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

        console.log("===== Plugin Manager =====");

        for (const name of this.registry.list()) {

            const plugin = this.registry.get(name);

            if (typeof plugin.load === "function") {

                console.log("Loading Plugin:", name);

                await plugin.load(this.kernel);

            }

        }

        console.log("All plugins loaded.");

    }

}