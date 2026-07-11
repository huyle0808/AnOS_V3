const events = {};

export function on(name, callback) {

    if (!events[name]) {
        events[name] = [];
    }

    events[name].push(callback);

}

export function emit(name, data) {

    if (!events[name]) {
        return;
    }

    for (const callback of events[name]) {
        callback(data);
    }

}