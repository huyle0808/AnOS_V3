export async function think(plan, text, handlers) {

    for (const step of plan) {

        const fn = handlers[step];

        if (!fn) continue;

        const result = await fn(text);

        if (result) {
            return result;
        }
    }

    return null;
}