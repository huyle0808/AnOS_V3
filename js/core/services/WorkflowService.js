export default class WorkflowService {

    constructor(ai) {
        this.ai = ai;
    }

    async run(message) {

        const memory = await this.ai.memory.process(message);

        const knowledge = await this.ai.knowledge.process(message);

        const reason = await this.ai.reason.process(message);

        return {
            message,
            memory,
            knowledge,
            reason
        };

    }

}