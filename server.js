import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("."));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ================= FILE =================

const MEMORY_FILE = "./memory.json";
const TEACH_FILE = "./knowledge.json";
const KNOWLEDGE_FOLDER = "./database/knowledge";

// ================= MEMORY =================

function loadMemory() {

    try {

        return JSON.parse(
            fs.readFileSync(MEMORY_FILE, "utf8")
        );

    } catch {

        return {
            profile: {},
            history: []
        };

    }

}

function saveMemory(data) {

    fs.writeFileSync(
        MEMORY_FILE,
        JSON.stringify(data, null, 2)
    );

}

// ================= TEACH KNOWLEDGE =================

function loadTeachKnowledge() {

    try {

        return JSON.parse(
            fs.readFileSync(TEACH_FILE, "utf8")
        );

    } catch {

        return [];

    }

}

function saveTeachKnowledge(data) {

    fs.writeFileSync(
        TEACH_FILE,
        JSON.stringify(data, null, 2)
    );

}
// ================= CHAT =================

app.post("/chat", async (req, res) => {

    const {
        message,
        profile,
        history
    } = req.body;

    const memory = loadMemory();

    if (profile && typeof profile === "object") {
        Object.assign(memory.profile, profile);
    }

    if (Array.isArray(history)) {
        memory.history = history;
    }

    saveMemory(memory);

    const prompt = `
Bạn là AnOS V3, một trợ lý AI thân thiện.

Thông tin người dùng:
${JSON.stringify(memory.profile, null, 2)}

Lịch sử hội thoại:
${memory.history.join("\n")}

Người dùng:
${message}

Nếu đã biết thông tin người dùng thì hãy sử dụng khi trả lời.

Nếu không biết thì trả lời bình thường.

Luôn trả lời bằng tiếng Việt.
`;

    try {

        const result = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt

        });

        res.json({

            reply: result.text || "Mình chưa có câu trả lời."

        });

    } catch (err) {

        console.error("Gemini:", err);

        if (err.status === 401) {

            return res.json({
                reply: "⚠️ Gemini API Key không hợp lệ."
            });

        }

        if (err.status === 429) {

            return res.json({
                reply: "⚠️ Gemini đã hết quota."
            });

        }

        if (err.status === 503) {

            return res.json({
                reply: "⚠️ Máy chủ Gemini đang bận."
            });

        }

        return res.json({

            reply: "⚠️ Không thể kết nối Gemini."

        });

    }

});
// ================= MEMORY API =================

app.get("/memory", (req, res) => {

    res.json(loadMemory());

});

app.post("/memory", (req, res) => {

    saveMemory(req.body);

    res.json({
        ok: true
    });

});

// ================= KNOWLEDGE FIND =================

app.post("/knowledge/find", (req, res) => {

    const { question } = req.body;

    const list = loadTeachKnowledge();

    const item = list.find(x =>
        x.question.toLowerCase() === question.toLowerCase()
    );

    if (item) {

        return res.json({
            found: true,
            answer: item.answer
        });

    }

    return res.json({
        found: false
    });

});

// ================= KNOWLEDGE TEACH =================

app.post("/knowledge/teach", (req, res) => {

    const {
        question,
        answer
    } = req.body;

    const list = loadTeachKnowledge();

    const index = list.findIndex(x =>
        x.question.toLowerCase() === question.toLowerCase()
    );

    if (index >= 0) {

        list[index].answer = answer;

    } else {

        list.push({
            question,
            answer
        });

    }

    saveTeachKnowledge(list);

    res.json({
        ok: true
    });

});

// ================= KNOWLEDGE LOAD =================

app.get("/knowledge", async (req, res) => {

    try {

        const folder = path.resolve(KNOWLEDGE_FOLDER);

        const files = await fs.promises.readdir(folder);

        let knowledge = [];

        for (const file of files) {

            if (!file.endsWith(".json")) {
                continue;
            }

            const filePath = path.join(folder, file);

            const text = await fs.promises.readFile(
                filePath,
                "utf8"
            );

            const data = JSON.parse(text);

            if (Array.isArray(data)) {

                knowledge.push(...data);

            }

        }

        res.json(knowledge);

    } catch (err) {

        console.error("Knowledge API:", err);

        res.json([]);

    }

});
// ================= GEMINI API =================

app.post("/api/gemini", async (req, res) => {
console.log("================================");
    console.log("📨 /api/gemini ĐÃ ĐƯỢC GỌI");
    console.log("Body:", req.body);
    console.log("================================");

    const {
        prompt,
        context = {},
        options = {}
    } = req.body;

    
    if (!prompt) {
    return res.status(400).json({
        success: false,
        text: "",
        error: "Thiếu prompt."
    });
}
    try {

        const fullPrompt = `
Bạn là AnOS V3 AI.

Thông tin ngữ cảnh:
${JSON.stringify(context, null, 2)}

Người dùng:
${prompt}

Luôn trả lời bằng tiếng Việt.
`;

        const result = await ai.models.generateContent({

            model: options.model || "gemini-2.5-flash",

            contents: fullPrompt

        });

        res.json({

    success: true,

    text: result.text ?? "",

    tokens: result.usageMetadata?.totalTokenCount ?? 0,

    provider: "gemini-2.5-flash"

});

    } catch (error) {

        console.error("Gemini API:", error);

        res.status(500).json({

            success: false,

            text: "",

            error: error?.message || "Unknown Error"

        });

    }

});
// ================= START SERVER =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("================================");
    console.log("🚀 AnOS V3 Server Started");
    console.log("================================");
    console.log(`🌐 http://127.0.0.1:${PORT}`);
    console.log("================================");

});