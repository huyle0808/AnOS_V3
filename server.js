import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const MEMORY_FILE = path.join(__dirname, "memory.json");
const TEACH_FILE = path.join(__dirname, "knowledge.json");
const KNOWLEDGE_FOLDER = path.join(__dirname, "database", "knowledge");

function readJson(filePath, fallback) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {
        return fallback;
    }
}

function writeJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function loadMemory() {
    return readJson(MEMORY_FILE, { profile: {}, history: [] });
}

function saveMemory(data) {

    console.log("SAVE MEMORY:");
    console.log(JSON.stringify(data, null, 2));

    writeJson(MEMORY_FILE, data);

}

function loadTeachKnowledge() {
    return readJson(TEACH_FILE, []);
}

function saveTeachKnowledge(data) {
    writeJson(TEACH_FILE, data);
}

function geminiErrorReply(error) {
    if (error?.status === 401) return "Gemini API key không hợp lệ.";
    if (error?.status === 429) return "Gemini đã hết quota hoặc đang bị giới hạn.";
    if (error?.status === 503) return "Máy chủ Gemini đang bận, bạn thử lại sau nhé.";
    return "Không thể kết nối Gemini. Bạn kiểm tra mạng và GEMINI_API_KEY trong file .env.";
}

app.post("/chat", async (req, res) => {
    const { message, profile, history } = req.body;
    const memory = loadMemory();

    if (profile && typeof profile === "object") {
        Object.assign(memory.profile, profile);
    }

    if (Array.isArray(history)) {
        memory.history = history;
    }

    saveMemory(memory);

    const prompt = `
Bạn là AnOS V3, một trợ lý AI Agent thân thiện và thực tế.

Thông tin người dùng:
${JSON.stringify(memory.profile, null, 2)}

Lịch sử hội thoại:
${memory.history.join("\n")}

Người dùng:
${message}

Hãy trả lời bằng tiếng Việt. Nếu yêu cầu lớn, hãy chia thành các bước cụ thể.
`;

    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        res.json({ reply: result.text || "Mình chưa có câu trả lời." });
    } catch (error) {
        console.error("Gemini /chat error:", error);
        res.json({ reply: geminiErrorReply(error) });
    }
});

app.get("/memory", (req, res) => {
    res.json(loadMemory());
});

app.post("/memory", (req, res) => {
    saveMemory(req.body);
    res.json({ ok: true });
});

app.post("/knowledge/find", (req, res) => {
    const { question = "" } = req.body;
    const list = loadTeachKnowledge();
    const item = list.find((x) =>
        String(x.question || "").toLowerCase() === question.toLowerCase()
    );

    if (item) {
        return res.json({ found: true, answer: item.answer });
    }

    return res.json({ found: false });
});

app.post("/knowledge/teach", (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ ok: false, error: "Thiếu question hoặc answer." });
    }

    const list = loadTeachKnowledge();
    const index = list.findIndex((x) =>
        String(x.question || "").toLowerCase() === question.toLowerCase()
    );

    if (index >= 0) {
        list[index].answer = answer;
    } else {
        list.push({ question, answer });
    }

    saveTeachKnowledge(list);
    res.json({ ok: true });
});

app.get("/knowledge", async (req, res) => {
    try {
        const files = await fs.promises.readdir(KNOWLEDGE_FOLDER);
        const knowledge = [];

        for (const file of files) {
            if (!file.endsWith(".json")) continue;

            const filePath = path.join(KNOWLEDGE_FOLDER, file);
            const data = JSON.parse(await fs.promises.readFile(filePath, "utf8"));

            if (Array.isArray(data)) {
                knowledge.push(...data);
            }
        }

        res.json(knowledge);
    } catch (error) {
        console.error("Knowledge API error:", error);
        res.json([]);
    }
});

app.post("/api/gemini", async (req, res) => {
    const { prompt, context = {}, options = {} } = req.body;

    if (!prompt) {
        return res.status(400).json({
            success: false,
            text: "",
            error: "Thiếu prompt."
        });
    }

    try {
        const fullPrompt = `
Bạn là AnOS V3 AI Agent.

Ngữ cảnh:
${JSON.stringify(context, null, 2)}

Yêu cầu:
${prompt}

Luôn trả lời bằng tiếng Việt. Hãy cụ thể, có cấu trúc, và ưu tiên kết quả dùng được ngay.
`;

        const result = await ai.models.generateContent({
            model: options.model || "gemini-2.5-flash",
            contents: fullPrompt
        });

        res.json({
            success: true,
            text: result.text ?? "",
            tokens: result.usageMetadata?.totalTokenCount ?? 0,
            provider: options.model || "gemini-2.5-flash"
        });
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({
            success: false,
            text: "",
            error: error?.message || geminiErrorReply(error)
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("================================");
    console.log("AnOS V3 Server Started");
    console.log(`http://127.0.0.1:${PORT}`);
    console.log("================================");
});
