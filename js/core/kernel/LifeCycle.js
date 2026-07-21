export default class LifeCycle {

    constructor() {

        this.state = "CREATED";

    }

    setState(state) {

        this.state = state;

        console.log(`LifeCycle -> ${state}`);

    }

    getState() {

        return this.state;

    }

    is(state) {

        return this.state === state;

    }

}