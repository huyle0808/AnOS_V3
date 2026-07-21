export default class Provider {

    constructor(id, name, capabilities = []) {

        this.id = id;
        this.name = name;
        this.capabilities = capabilities;

    }

    supports(capability) {

        return this.capabilities.includes(capability);

    }

    async execute(request) {

        throw new Error("Provider chưa được triển khai.");

    }

}