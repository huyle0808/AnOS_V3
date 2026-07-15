import { registerPlugin } from "../system/plugins.js";

registerPlugin("Test", {

    async start() {

        console.log("🚀 Test Plugin Started");

    },

    async stop() {

        console.log("🛑 Test Plugin Stopped");

    }

});