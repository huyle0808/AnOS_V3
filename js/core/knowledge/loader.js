import { setKnowledge } from "./cache.js";

export async function loadKnowledge() {

    try {

        const res = await fetch("/knowledge");

        if (!res.ok) {
            throw new Error("Không tải được Knowledge");
        }

        const knowledge = await res.json();

        setKnowledge(knowledge);

        console.log("📚 Knowledge Loaded:", knowledge.length);

        return true;

    } catch (err) {

        console.error("Knowledge Loader:", err);

        setKnowledge([]);

        return false;

    }

}