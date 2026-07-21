export default class EventBus {

    constructor() {
        this.events = new Map();
    }

    on(event, listener) {

        if (!this.events.has(event)) {
            this.events.set(event, []);
        }

        this.events.get(event).push(listener);

    }

    emit(event, data = null) {

        if (!this.events.has(event)) return;

        for (const listener of this.events.get(event)) {
            listener(data);
        }

    }

    off(event, listener) {

        if (!this.events.has(event)) return;

        const listeners = this.events.get(event);

        this.events.set(
            event,
            listeners.filter(item => item !== listener)
        );

    }

    clear() {

        this.events.clear();

    }

}