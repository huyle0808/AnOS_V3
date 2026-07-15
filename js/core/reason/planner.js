import { detectIntent } from "../intent/intent.js";

export function createPlan(message) {

    const intent = detectIntent(message);

    console.log("📋 Plan:", intent);

    switch (intent) {
        case "greeting":
    return ["greeting"];
        case "memory":
            return [
                "memory",
                "profile"
            ];

        case "profile":
            return [
                "profile"
            ];

        case "knowledge":
            return [
                "knowledge"
            ];

        case "calculator":
            return [
                "calculator"
            ];

        case "weather":
            return [
                "weather"
            ];

        case "time":
            return [
                "time"
            ];

        case "emotion":
            return [
                "emotion"
            ];

        default:
            return [
                "fallback"
            ];

    }

}