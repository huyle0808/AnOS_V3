const status = {

    boot: false,

    memory: false,

    knowledge: false,

    agent: false,

    engine: false

};

export function setStatus(name, value = true) {

    status[name] = value;

}

export function getStatus() {

    return { ...status };

}