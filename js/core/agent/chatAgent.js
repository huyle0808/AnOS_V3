import { pipeline } from "../pipeline.js";

export default {

    name: "chat",

    async run(message) {

        return await pipeline(message);

    }

};