import ServiceContainer from "./ServiceContainer.js";
import BootLoader from "./BootLoader.js";
import ModuleLoader from "./ModuleLoader.js";
import Version from "./Version.js";
import LifeCycle from "./LifeCycle.js";
import EventBus from "../event/EventBus.js";

export default class Kernel {

    constructor() {

        this.version = new Version();
        this.lifeCycle = new LifeCycle();
        this.container = new ServiceContainer();
        this.eventBus = new EventBus();

        this.register("eventBus", this.eventBus);

        this.bootLoader = new BootLoader(this);
        this.moduleLoader = new ModuleLoader(this);

        this.started = false;

    }

    register(name, service) {

        this.container.register(name, service);

    }

    get(name) {

        return this.container.get(name);

    }
    has(name) {

    return this.container.has(name);

}
    async start() {

        if (this.started) {
            console.warn("Kernel is already running.");
            return;
        }

        this.lifeCycle.setState("BOOTING");

        this.version.print();

        console.log("Starting AnOS Kernel...");

        await this.bootLoader.boot();

        await this.moduleLoader.loadAll();

        this.lifeCycle.setState("RUNNING");

        this.started = true;

        console.log("AnOS Kernel Started");

    }

    stop() {

        this.lifeCycle.setState("STOPPED");

        this.started = false;

        console.log("AnOS Kernel Stopped");

    }

}