// ==========================================
// AnOS V4
// Knowledge Step
// ==========================================

export default class KnowledgeStep {

    async run(state){

        const text =
            state.input.toLowerCase();

        state.knowledge = {

            domain: "general",

            sources: [],

            hints: [],

            confidence: 50

        };

        // ==========================
        // Accounting
        // ==========================

        if(text.includes("kế toán")){

            state.knowledge.domain =
                "accounting";

            state.knowledge.sources.push(
                "Vietnam Accounting",
                "Accounting Standards"
            );

            state.knowledge.hints.push(
                "Ưu tiên chuẩn kế toán Việt Nam",
                "Kiểm tra chứng từ",
                "Sinh bút toán đúng"
            );

            state.knowledge.confidence = 95;

        }

        // ==========================
        // Notary
        // ==========================

        else if(text.includes("công chứng")){

            state.knowledge.domain =
                "notary";

            state.knowledge.sources.push(
                "Luật Công chứng"
            );

            state.knowledge.hints.push(
                "Ưu tiên pháp luật Việt Nam"
            );

            state.knowledge.confidence = 95;

        }

        // ==========================
        // JavaScript
        // ==========================

        else if(
            /javascript|js/.test(text)
        ){

            state.knowledge.domain =
                "javascript";

            state.knowledge.sources.push(
                "JavaScript ES2024"
            );

            state.knowledge.hints.push(
                "Ưu tiên ES Module",
                "Code sạch",
                "Không dùng thư viện thừa"
            );

            state.knowledge.confidence = 90;

        }

        // ==========================
        // Python
        // ==========================

        else if(text.includes("python")){

            state.knowledge.domain =
                "python";

            state.knowledge.sources.push(
                "Python 3"
            );

            state.knowledge.hints.push(
                "Ưu tiên Python hiện đại"
            );

            state.knowledge.confidence = 90;

        }

        console.log(
            "📚 Knowledge:",
            state.knowledge
        );

        return state;

    }

}