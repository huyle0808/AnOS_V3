export function decide(intent) {

    switch (intent) {

        case "greeting":
        case "thanks":
        case "weather":
        case "time":
        case "calculator":
        case "memory":
        case "whoami":
        case "history":
        case "emotion":
        case "profile":
        case "reason":
        case "teach":
        case "context":
        case "task":
            return "skill";

        default:
            return "knowledge";
    }

}