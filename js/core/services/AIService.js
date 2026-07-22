import MemoryService from "./MemoryService.js";
import KnowledgeService from "./KnowledgeService.js";
import ReasonService from "./ReasonService.js";
import WorkflowService from "./WorkflowService.js";
import DecisionService from "./DecisionService.js";
import ResponseBuilder from "./ResponseBuilder.js";
import AIGateway from "../../ai/AIGateway.js";
import AIRequest from "../../ai/AIRequest.js";

export default class AIService {
    constructor() {
        this.memory = new MemoryService();
        this.knowledge = new KnowledgeService();
        this.reason = new ReasonService();
        this.workflow = new WorkflowService(this);
        this.decision = new DecisionService();
        this.builder = new ResponseBuilder();
        this.gateway = new AIGateway();
    }

    async process(message) {
        try {
            const context = await this.workflow.run(message);
            let result = await this.decision.process(context);

            if (!result || !result.answer) {
                const aiResponse = await this.gateway.execute(new AIRequest({
                    prompt: this.buildAgentPrompt(message, context),
                    capability: this.detectCapability(message),
                    provider: "gemini",
                    context,
                    options: {
                        model: "gemini-2.5-flash"
                    }
                }));

                result = {
                    found: aiResponse.success,
                    source: aiResponse.provider || "ai",
                    answer: aiResponse.success
                        ? aiResponse.text
                        : "Mình chưa kết nối được AI bên ngoài. Bạn kiểm tra GEMINI_API_KEY trong file .env rồi chạy lại server nhé.",
                    confidence: aiResponse.success ? 0.8 : 0
                };
            }

            return this.builder.build(result);
        } catch (error) {
            console.error("AIService Error:", error);
            return "AIService gặp lỗi:\n\n" + (error.stack || error.message);
        }
    }

    detectCapability(message) {
        const text = message.toLowerCase();

        if (/(phim|kich ban|kịch bản|canh quay|cảnh quay|nhan vat|nhân vật|dao dien|đạo diễn|trailer)/i.test(text)) {
            return "creative";
        }

        if (/(bai hat|bài hát|loi nhac|lời nhạc|giai dieu|giai điệu|verse|chorus|rap|nhac|nhạc)/i.test(text)) {
            return "creative";
        }

        if (/(truyen|truyện|tieu thuyet|tiểu thuyết|chuong|chương|cot truyen|cốt truyện)/i.test(text)) {
            return "creative";
        }

        if (/(ke hoach|kế hoạch|cong viec|công việc|du an|dự án|lich|lịch|todo|viec can lam|việc cần làm)/i.test(text)) {
            return "plan";
        }

        return "chat";
    }

    buildAgentPrompt(message, context) {
        return `
Bạn là AnOS, một AI Agent tiếng Việt có nhiệm vụ giúp người dùng làm việc thật sự.

Vai trò chính:
- Trợ lý sáng tạo: xây dựng phim, bài hát, truyện, ý tưởng, nhân vật, lời thoại, cấu trúc chương.
- Trợ lý công việc: chia việc lớn thành bước nhỏ, lập kế hoạch, checklist, gợi ý cách làm.
- Trợ lý đời sống: lắng nghe, phân tích tình huống, đưa lời khuyên thực tế và dịu dàng.

Nguyên tắc trả lời:
- Luôn trả lời bằng tiếng Việt.
- Nếu yêu cầu lớn, hãy chia thành các bước rõ ràng.
- Nếu người dùng muốn sáng tạo, hãy đưa bản nháp có thể dùng ngay.
- Nếu thiếu thông tin, vẫn đưa phiên bản đầu tiên rồi hỏi thêm 1-2 câu quan trọng.
- Không nói chung chung. Hãy tạo nội dung cụ thể.

Ngữ cảnh hệ thống:
${JSON.stringify(context, null, 2)}

Yêu cầu của người dùng:
${message}
`;
    }
}
