const events = new Map();

export function on(name, listener) {

    if (typeof listener !== "function") {
        throw new Error(`Listener của "${name}" không phải là function`);
    }

    if (!events.has(name)) {
        events.set(name, []);
    }

    events.get(name).push(listener);
}

export async function emit(name, data = null) {

    const listeners = events.get(name);

    if (!listeners || listeners.length === 0) {
        return;
    }

    console.log(`📢 Event: ${name}`);

    for (const listener of listeners) {

        try {

            await listener(data);

        } catch (e) {

            console.error(`❌ Event "${name}":`, e);
        }
    }
}

export function off(name, listener) {

    const listeners = events.get(name);

    if (!listeners) return;

    events.set(
        name,
        listeners.filter(fn => fn !== listener)
    );
}

export function clearEvents() {

    events.clear();
}

export function listEvents() {

    return [...events.keys()];
}