export function greeting(message) {

    const text = message.toLowerCase();

    if (text.includes("chào")) {
        return "Xin chào 👋";
    }

    return null;

}
