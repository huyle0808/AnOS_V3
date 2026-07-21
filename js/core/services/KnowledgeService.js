import { processKnowledge } from "../pipeline/knowledge.js";

export default class KnowledgeService {

    async process(message) {

        const answer = await processKnowledge(message);

        return {
            found: !!answer,
            answer
        };

    }

}