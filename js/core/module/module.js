import { register, get, has, list, remove } from "../registry/index.js";

export function registerEngine(name, engine) {

    register("engine", name, engine);

}

export function registerAgent(name, agent) {

    register("agent", name, agent);

}

export function registerPlugin(name, plugin) {

    register("plugin", name, plugin);

}

export function getEngine(name) {

    return get("engine", name);

}

export function getAgent(name) {

    return get("agent", name);

}

export function getPlugin(name) {

    return get("plugin", name);

}

export function listEngines() {

    return list("engine");

}

export function listAgents() {

    return list("agent");

}

export function listPlugins() {

    return list("plugin");

}

export function removeEngine(name) {

    remove("engine", name);

}

export function removeAgent(name) {

    remove("agent", name);

}

export function removePlugin(name) {

    remove("plugin", name);

}