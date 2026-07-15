import { searchKnowledge } from "./search.js";

export async function askKnowledge(message) {

    return await searchKnowledge(message);

}