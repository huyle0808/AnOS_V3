/*export async function askKnowledge(question) {

    try {

        const res = await fetch("/knowledge/find", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question })
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();

        if (data.found) {
            return data.answer;
        }

        return null;

    } catch (err) {

        console.error("Knowledge:", err);

        return null;

    }

}*/
export async function askKnowledge(question) {

    console.log("askKnowledge chạy:", question);

    return null;

}