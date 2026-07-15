const registry = new Map();

export function set(name, value) {

    registry.set(name, value);
}

export function get(name) {

    return registry.get(name);
}

export function has(name) {

    return registry.has(name);
}

export function remove(name) {

    registry.delete(name);
}

export function list() {

    return [...registry.keys()];
}

export function clear() {

    registry.clear();
}