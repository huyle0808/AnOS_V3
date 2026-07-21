
import ServiceInstaller from "./ServiceInstaller.js";
import { EventTypes } from "../event/EventTypes.js";
export default class Boot {

    constructor(kernel) {
        this.kernel = kernel;
    }

    async boot() {

    console.log("================================");
    console.log("Booting AnOS...");
    console.log("================================");

    // Cài đặt các service
    const installer = new ServiceInstaller(this.kernel);
    installer.install();

    // Khởi tạo các service
    const services = this.kernel.container.entries();

    for (const [name, service] of services) {

        if (typeof service.init === "function") {

            console.log("Loading:", name);

            await service.init();

        }

    }

    console.log("================================");
    console.log("AnOS Ready");
    console.log("================================");

}

}