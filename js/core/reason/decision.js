export function makeDecision(results) {

    for (const result of results) {

        if (result) {
            return result;
        }

    }

    return "Mình chưa có câu trả lời phù hợp.";

}