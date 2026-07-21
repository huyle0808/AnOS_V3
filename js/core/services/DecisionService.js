export default class DecisionService {

    async process(context) {

        // 1. Memory
        if (context.memory?.found) {
            return {
                found: true,
                source: "memory",
                answer: context.memory.answer,
                confidence: 1.0
            };
        }

        // 2. Knowledge
        if (context.knowledge?.found) {
            return {
                found: true,
                source: "knowledge",
                answer: context.knowledge.answer,
                confidence: 1.0
            };
        }

        // 3. Reason / Skill
        if (context.reason?.found) {
            return {
                found: true,
                source: context.reason.source,
                answer: context.reason.answer,
                confidence: context.reason.confidence
            };
        }

        // 4. Chưa có kết quả
        return {
            found: false,
            source: "ai",
            answer: null,
            confidence: 0
        };

    }

}