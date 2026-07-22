export default class Planner {

    async create(message, history, personality) {

        const text =
            message.toLowerCase();

        let intent = "chat";

        if (text.includes("phim"))
            intent = "film";

        else if (text.includes("nhạc"))
            intent = "music";

        else if (text.includes("youtube"))
            intent = "youtube";

        else if (text.includes("website"))
            intent = "website";

        else if (text.includes("app"))
            intent = "app";

        else if (text.includes("game"))
            intent = "game";

        else if (text.includes("code"))
            intent = "code";

        return {

            intent,

            message,

            history,

            personality,

            created: Date.now()

        };

    }

}