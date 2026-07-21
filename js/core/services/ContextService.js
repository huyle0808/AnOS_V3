export default class ContextService {

    constructor() {
        this.data = {};
    }

    update(newData) {
        this.data = {
            ...this.data,
            ...newData
        };
    }

    get() {
        return this.data;
    }

    clear() {
        this.data = {};
    }

}