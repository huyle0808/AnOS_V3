const context = {
    lastMessage: "",
    lastReply: "",
    lastIntent: "",
    user: {}
};

export function getContext() {
    return context;
}

export function setContext(key, value) {
    context[key] = value;
}