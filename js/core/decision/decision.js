export function decide(intent) {

    switch (intent) {

        case "greeting":
        case "weather":
        case "thanks":
        case "history":
        case "memory":
        case "whoami":
        case "skill":
            return "skill";

        default:
            return "skill";

    }

}
