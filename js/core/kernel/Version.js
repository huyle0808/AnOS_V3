export default class Version {

    constructor() {

        this.name = "AnOS Core";
        this.version = "4.0.0-alpha.1";
        this.build = "2026.07.18";
        this.mode = "Development";

    }

    getInfo() {

        return {
            name: this.name,
            version: this.version,
            build: this.build,
            mode: this.mode
        };

    }

    print() {

        console.log("================================");
        console.log(this.name);
        console.log("Version :", this.version);
        console.log("Build   :", this.build);
        console.log("Mode    :", this.mode);
        console.log("================================");

    }

}