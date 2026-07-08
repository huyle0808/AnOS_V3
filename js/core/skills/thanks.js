export function thanks(message) {

    const text = message.toLowerCase();

    if (
        text.includes("cảm ơn") ||
        text.includes("thank") ||
        text.includes("tks")
    ) {
        return "Rất vui được giúp bạn ❤️";
    }

    return null;

}
