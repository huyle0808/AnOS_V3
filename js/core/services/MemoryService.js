import {
    processMemory,
    processHistory
} from "../pipeline/memory.js";

import {
    getProfile
} from "../memory.js";

export default class MemoryService {

    async process(message, reply = null) {

        await processMemory(message);

        if (reply) {
            await processHistory(message, reply);
        }

        const profile = getProfile() || {};

        return {
            found: Object.keys(profile).length > 0,
            answer: null,
            profile,
            source: "memory",
            confidence: 1.0
        };

    }

}