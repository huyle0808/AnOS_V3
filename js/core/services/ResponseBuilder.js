export default class ResponseBuilder {

    build(result) {

        if (!result) {
            return "Mình chưa có câu trả lời.";
        }

        // Chuỗi
        if (typeof result === "string") {
            return result;
        }

        // DecisionService mới
        if (result.answer) {
            return result.answer;
        }

        // Object có text
        if (result.text) {
            return result.text;
        }

        // Chưa có câu trả lời
        if (result.found === false) {
            return "Mình chưa có câu trả lời.";
        }

        // Mặc định
        return JSON.stringify(result, null, 2);

    }

}