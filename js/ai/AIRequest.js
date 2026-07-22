export default class AIRequest {

    constructor({
        prompt = "",
        capability = "chat",
        provider = null,
        context = {},
        options = {}
    } = {}) {

        this.prompt = prompt;
        this.message = prompt;
        this.capability = capability;
        this.provider = provider;
        this.context = context;
        this.options = options;

    }

}
