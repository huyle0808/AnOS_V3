// ==========================================
// AnOS AI Agent
// Review Step
// ==========================================

export default class ReviewStep {

    async run(state){

        // Không có phản hồi
        if(!state.reply || state.reply.trim()===""){

            state.reply =
            "Xin lỗi, mình chưa thể tạo câu trả lời phù hợp.";

            return state;
        }

        // Chuẩn hóa khoảng trắng
        state.reply =
            state.reply
                .replace(/\n{3,}/g,"\n\n")
                .trim();

        // Không để AI tự xưng sai
        state.reply =
            state.reply
                .replaceAll("ChatGPT","AnOS");

        // Metadata
        state.review = {

            reviewed: true,

            length: state.reply.length,

            time: new Date()

        };

        console.log(
            "✅ Review completed"
        );

        return state;

    }

}