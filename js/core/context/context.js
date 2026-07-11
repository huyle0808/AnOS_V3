const context = {

    session: null,

    user: null,

    project: null,

    plan: null,

    task: null,

    memory: {},

    variables: {}

};

export function getContext() {
    return context;
}

export function setContext(key, value) {
    context[key] = value;
}

export function updateContext(data) {
    Object.assign(context, data);
}

export function clearContext() {

    context.plan = null;
    context.task = null;
    context.variables = {};

}