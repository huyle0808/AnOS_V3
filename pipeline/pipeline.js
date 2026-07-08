import Brain from "../brain/brain.js";

const brain = new Brain();

export default async function pipeline(message) {

    const answer = await brain.think(message);

    if (answer) {
        return answer;
    }

    return "Mình chưa biết trả lời câu này.";
}
