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

        console.log("Chuẩn bị gọi fetch...");

        const response = await fetch("/api/gemini", {

            method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    prompt: request.message,

                    context: request.context || {},

                    options: request.options || {}

                })

            });

            



        console.log("Đã nhận response");
        console.log("HTTP Status:", response.status);

        const data = await response.json();

        console.log("Response Data:", data);

            console.log(data);

            result.success = data.success;
            result.provider = "Gemini";
            result.text = data.text;
            result.tokens = data.tokens || 0;

        } catch (e) {

            console.error("Gemini Error");

            console.error(e);

            result.success = false;
            result.error = e.message;

        }

        console.log("===== GEMINI END =====");

        return result;

    }

}