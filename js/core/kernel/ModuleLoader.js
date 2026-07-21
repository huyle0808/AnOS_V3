import ModuleManager from "../module/ModuleManager.js";
export default class ModuleLoader {

    constructor(kernel) {

    this.kernel = kernel;

    this.manager = new ModuleManager(kernel);

}

    register(name, module) {

    this.manager.register(name, module);

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