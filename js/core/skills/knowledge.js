import { searchKnowledge } from "../knowledge/search.js";

export async function askKnowledge(question) {

    console.log("📚 Knowledge:", question);

    return await searchKnowledge(question);

}

export async function knowledge(message) {

    return await askKnowledge(message);

}