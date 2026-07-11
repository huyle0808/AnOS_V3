let ready = false;

export async function boot() {

    if (ready) {
        return;
    }

    console.log("⚙ Boot Runtime");

    // Sau này sẽ khởi động:
    // Config
    // Registry
    // Event
    // Memory
    // Knowledge
    // Agent
    // Engine

    ready = true;

    console.log("✔ Boot Finished");
}

export function isReady() {
    return ready;
}