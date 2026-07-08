import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("."));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const MEMORY_FILE = "./memory.json";
const KNOWLEDGE_FILE = "./knowledge.json";

// ================= MEMORY =================

function loadMemory() {
    try {
        return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8"));
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

// ================= KNOWLEDGE =================

function loadKnowledge() {
    try {
        return JSON.parse(
            fs.readFileSync(KNOWLEDGE_FILE, "utf8")
        );
    } catch {
        return [];
    }
}

function saveKnowledge(data) {
    fs.writeFileSync(
        KNOWLEDGE_FILE,
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

Người dùng vừa nói:
${message}

Nếu đã biết tên hoặc sở thích của người dùng thì hãy sử dụng khi trả lời.

Nếu chưa biết thì trả lời bình thường.

Luôn trả lời bằng tiếng Việt.
`;

    try {

        let result;

        try {

            result = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

        } catch (err) {

            if (err.status === 503) {

                console.log("Gemini bận, thử lại sau 3 giây...");

                await new Promise(resolve =>
                    setTimeout(resolve, 3000)
                );

                result = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt
                });

            } else {
                throw err;
            }
        }

        res.json({
            reply: result.text
        });

    } catch (err) {

        console.error("Gemini:", err);

        if (err.status === 429) {
            return res.json({
                reply: "⚠️ Bạn đã dùng hết quota Gemini miễn phí hôm nay."
            });
        }

        if (err.status === 503) {
            return res.json({
                reply: "⚠️ Máy chủ Gemini đang bận, vui lòng thử lại sau."
            });
        }

        return res.json({
            reply: "⚠️ Không thể kết nối tới Gemini."
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

    const list = loadKnowledge();

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

    const list = loadKnowledge();

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

    saveKnowledge(list);

    res.json({
        ok: true
    });

});

// ================= START SERVER =================

app.listen(3000, () => {
    console.log("✅ AnOS V3 chạy tại http://127.0.0.1:3000");
});