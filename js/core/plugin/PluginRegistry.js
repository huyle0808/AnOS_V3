export default class PluginRegistry {

    constructor() {
        this.plugins = new Map();
    }

    register(name, plugin) {
        this.plugins.set(name, plugin);
    }

    get(name) {
        return this.plugins.get(name);
    }

    has(name) {
        return this.plugins.has(name);
    }

    remove(name) {
        this.plugins.delete(name);
    }

    list() {
        return [...this.plugins.keys()];
    }

}