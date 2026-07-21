export default class BaseModule {

    constructor(name) {

        this.name = name;

        this.enabled = true;

        this.state = "created";

    }

    async load(kernel) {

        this.state = "loaded";

    }

    async start() {

        this.state = "running";

    }

    async stop() {

        this.state = "stopped";

    }

    async unload() {

        this.state = "unloaded";

    }

    getState() {

        return this.state;

    }

    isRunning() {

        return this.state === "running";

    }

}