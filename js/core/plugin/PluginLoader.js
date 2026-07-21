import PluginManager from "./PluginManager.js";

export default class PluginLoader {

    constructor(kernel) {

        this.manager = new PluginManager(kernel);

    }

    register(name, plugin) {

        this.manager.register(name, plugin);

    }

    get(name) {

        return this.manager.get(name);

    }

    has(name) {

        return this.manager.has(name);

    }

    async loadAll() {

        await this.manager.loadAll();

    }

}