import { get } from "../registry/index.js";

export async function runEngine(name, input) {

    const engine = get("engine", name);

    if (!engine) {
        throw new Error(`Engine "${name}" không tồn tại.`);
    }

    return await engine.run(input);

}