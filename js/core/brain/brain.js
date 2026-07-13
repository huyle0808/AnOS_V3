/*import { pipeline } from "../pipeline.js";
import { emit } from "../event/index.js";
import { startup } from "../system/startup.js";
  
export async function process(message) {  
  await startup();
    // Kiểm tra dữ liệu  
    if (!message || typeof message !== "string") {  
        return "Bạn muốn mình giúp gì?";  
    }  
  
    const text = message.trim();  
  
    if (!text) {  
        return "Bạn muốn mình giúp gì?";  
    }  
  
    try {  
  
        // Báo Brain bắt đầu xử lý  
        emit("brain:start", text);  
  
        const reply = await pipeline(text);  
  
        // Báo Brain xử lý xong  
        emit("brain:end", reply);  
  
        return reply || "Mình chưa có câu trả lời.";  
  
    } catch (error) {  
  
        console.error("Brain Error:", error);  
  
        // Có thể phát sự kiện lỗi  
        emit("brain:error", error);  
  
        return "Xin lỗi, đã xảy ra lỗi trong quá trình xử lý.";  
  
    }  
  
}*/
import { pipeline } from "../pipeline.js";
import { emit } from "../event/index.js";
import { startup } from "../system/startup.js";

export async function process(message) {
    await startup();

    if (!message || typeof message !== "string") {
        return "Bạn muốn mình giúp gì?";
    }

    const text = message.trim();

    if (!text) {
        return "Bạn muốn mình giúp gì?";
    }

    try {
        emit("brain:start", text);

        const reply = await pipeline(text);

        emit("brain:end", reply);

        return reply || "Mình chưa có câu trả lời.";
    } catch (error) {
        console.error("Brain Error:", error);

        emit("brain:error", error);

        return "Xin lỗi, đã xảy ra lỗi trong quá trình xử lý.";
    }
}