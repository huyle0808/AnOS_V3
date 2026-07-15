const plugins = new Map();

export function registerPlugin(name, plugin) {

    if (!name || typeof name !== "string") {
        throw new Error("Tên plugin không hợp lệ");
    }

    if (plugins.has(name)) {
        console.warn(`⚠ Plugin "${name}" đã tồn tại`);
        return;
    }

    plugins.set(name, plugin);

    console.log(`📦 Plugin "${name}" registered`);
}

export function getPlugin(name) {

    return plugins.get(name);
}

export function hasPlugin(name) {

    return plugins.has(name);
}

export function removePlugin(name) {

    plugins.delete(name);
}

export function listPlugins() {

    return [...plugins.keys()];
}

export async function startPlugins() {

    for (const [name, plugin] of plugins) {

        if (typeof plugin.start === "function") {

            console.log(`▶ Plugin ${name}`);

            await plugin.start();

            console.log(`✔ Plugin ${name}`);
        }
    }
}

export async function stopPlugins() {

    for (const [name, plugin] of plugins) {

        if (typeof plugin.stop === "function") {

            await plugin.stop();
        }
    }
}

export function clearPlugins() {

    plugins.clear();
}