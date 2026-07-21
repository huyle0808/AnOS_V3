export default class ModuleRegistry {

    constructor() {

        this.modules = new Map();

    }

    register(name, module) {

        this.modules.set(name, module);

    }

    get(name) {

        return this.modules.get(name);

    }

    has(name) {

        return this.modules.has(name);

    }

    remove(name) {

        this.modules.delete(name);

    }

    list() {

        return [...this.modules.keys()];

    }

}