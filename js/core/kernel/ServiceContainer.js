export default class ServiceContainer {

    constructor() {
        this.services = new Map();
    }

    register(name, instance) {

        if (this.services.has(name)) {
            console.warn(`Service '${name}' already exists.`);
            return;
        }

        this.services.set(name, instance);

    }

    get(name) {

        if (!this.services.has(name)) {
            throw new Error(`Service '${name}' not found.`);
        }

        return this.services.get(name);

    }

    has(name) {
        return this.services.has(name);
    }

    remove(name) {
        return this.services.delete(name);
    }

    clear() {
        this.services.clear();
    }

    keys() {
        return [...this.services.keys()];
    }

    values() {
        return [...this.services.values()];
    }

    entries() {
        return [...this.services.entries()];
    }

    count() {
        return this.services.size;
    }

    list() {
        return this.keys();
    }

}