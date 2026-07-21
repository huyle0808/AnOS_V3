import { reason } from "../skills/reason.js";

export default class ReasonService {

    async process(message) {

        const answer = await reason(message);

        return {

            found: Boolean(answer),

            answer,

            confidence: answer ? 1.0 : 0,

            source: answer ? "skill" : "ai"

        };

    }

}