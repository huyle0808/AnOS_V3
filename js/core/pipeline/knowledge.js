import { askKnowledge } from "../skills/knowledge.js";

export async function processKnowledge(text) {

    return await askKnowledge(text);

}