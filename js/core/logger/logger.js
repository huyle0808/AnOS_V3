export function log(type, message) {

    console.log(
        "[" + new Date().toLocaleTimeString() + "]",
        type,
        message
    );

}