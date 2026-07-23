import {
    processMemory,
    processHistory
} from "../pipeline/memory.js";

import {
    getProfile
} from "../memory.js";

export default class MemoryService {

    async process(message, reply = null) {

        // ==========================
        // Chuẩn hóa message
        // ==========================

        const text =
            typeof message === "string"

                ? message

                : message?.input || "";

        await processMemory(text);

        if (reply) {

            await processHistory(text, reply);

        }

        const profile =
            getProfile() || {};

        return {

            found:
                Object.keys(profile).length > 0,

            answer: null,

            profile,

            source: "memory",

            confidence: 1

        };

    }

}