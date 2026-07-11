const plugins = {};

export function registerPlugin(name, plugin) {

    plugins[name] = plugin;

}

export async function executePlugin(name, data) {

    if (!plugins[name]) {
        return null;
    }

    return await plugins[name](data);

}