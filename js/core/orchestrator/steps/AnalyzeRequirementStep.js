// ==========================================
// AnOS V4
// Analyze Requirement Step
// ==========================================

export default class AnalyzeRequirementStep {

    async run(state){

        console.log("🔎 Analyze Requirement");

        const text = state.input.trim().toLowerCase();

        state.requirement = {

            raw: state.input,

            type: state.intent || "unknown",

            complexity: "normal",

            keywords: [],

            features: [],

            language: "vi"

        };

        // ==========================
        // Complexity
        // ==========================

        if(text.length > 200){

            state.requirement.complexity = "high";

        }

        // ==========================
        // Keywords
        // ==========================

        const keywords = [

            "ai",
            "ứng dụng",
            "website",
            "web",
            "javascript",
            "python",
            "firebase",
            "database",
            "api",
            "netlify",
            "kế toán",
            "công chứng"

        ];

        state.requirement.keywords =
            keywords.filter(word =>
                text.includes(word)
            );

        // ==========================
        // Application
        // ==========================

        if(
            /(app|ứng dụng|website|web|phần mềm)/i
            .test(text)
        ){

            state.requirement.type = "application";

            state.requirement.features.push(
                "UI",
                "Backend",
                "Database",
                "AI"
            );

        }

        // ==========================
        // Accounting
        // ==========================

        if(text.includes("kế toán")){

            state.requirement.features.push(
                "Accounting",
                "Voucher",
                "Ledger"
            );

        }

        // ==========================
        // AI Agent
        // ==========================

        if(text.includes("ai")){

            state.requirement.features.push(
                "LLM",
                "Memory",
                "Planning"
            );

        }

        console.log(
            "📌 Requirement:",
            state.requirement
        );

        return state;

    }

}