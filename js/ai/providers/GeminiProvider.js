import Provider from "../Provider.js";
import AIResponse from "../AIResponse.js";

export default class GeminiProvider extends Provider {

    constructor() {

        super(
            "gemini",
            "Google Gemini",
            [
                "chat",
                "reason",
                "analyze",
                "code",
                "vision",
                "translate",
                "summarize"
            ]
        );

    }

    async execute(request) {

        console.log("===== GEMINI START =====");
        console.log("Request:", request);

        const result = new AIResponse();

        try {

            // Chạy được cả Browser và Node.js
            const apiUrl =
                typeof window !== "undefined"
                    ? "/api/gemini"
                    : "http://127.0.0.1:3000/api/gemini";

            console.log("API:", apiUrl);
            console.log("Chuẩn bị gọi fetch...");

            const response = await fetch(apiUrl, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    prompt: request.prompt || request.message,

                    context: request.context || {},

                    options: request.options || {}

                })

            });

            console.log("Đã nhận response");
            console.log("HTTP Status:", response.status);

            const data = await response.json();

            console.log("Response Data:", data);

            result.success = data.success ?? false;
            result.provider = data.provider || "Gemini";
            result.text = data.text || "";
            result.tokens = data.tokens || 0;
            result.error = data.error || null;

        } catch (e) {

            console.error("===== GEMINI ERROR =====");
            console.error(e);

            result.success = false;
            result.provider = "Gemini";
            result.text = "";
            result.error = e.message;

        }

        console.log("===== GEMINI END =====");

        return result;

    }

}