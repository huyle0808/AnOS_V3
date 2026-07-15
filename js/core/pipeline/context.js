let lastQuestion = "";
let lastAnswer = "";

export function updateContext(question, answer) {
    lastQuestion = question;
    lastAnswer = answer;
}

export function getContext() {
    return {
        question: lastQuestion,
        answer: lastAnswer
    };
}

export function clearContext() {
    lastQuestion = "";
    lastAnswer = "";
}