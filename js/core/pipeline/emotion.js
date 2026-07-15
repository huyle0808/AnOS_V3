export function processEmotion(text) {

    // Sau này sẽ thay bằng Emotion Engine

    const emotion = {
        score: 0,
        emotion: ""
    };

    let emotionReply = "";

    if (emotion.score >= 60) {

        emotionReply = "Mình hiểu cảm xúc của bạn.<br><br>";

        emotionReply +=
            "🧠 Cảm xúc nhận diện: " +
            emotion.emotion +
            "<br>";

        emotionReply +=
            "📊 Mức độ: " +
            emotion.score +
            "%<br><br>";

        switch (emotion.emotion) {

            case "😊 Vui":
                emotionReply +=
                    "Thật tuyệt khi biết bạn đang vui. Hy vọng niềm vui này sẽ tiếp tục cùng bạn.";
                break;

            case "😢 Buồn":
                emotionReply +=
                    "Mình rất tiếc khi biết bạn đang buồn. Nếu muốn, bạn có thể chia sẻ thêm.";
                break;

            case "😟 Lo lắng":
                emotionReply +=
                    "Lo lắng là điều ai cũng gặp. Chúng ta sẽ giải quyết từng bước.";
                break;

            case "😠 Tức giận":
                emotionReply +=
                    "Mình hiểu bạn đang rất khó chịu. Hãy kể mình nghe nhé.";
                break;

            default:
                emotionReply +=
                    "Mình luôn sẵn sàng lắng nghe bạn.";
        }
    }

    return {
        emotion,
        emotionReply
    };
}