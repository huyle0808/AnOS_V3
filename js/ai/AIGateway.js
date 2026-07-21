import ProviderRegistry from "./ProviderRegistry.js";
import GeminiProvider from "./providers/GeminiProvider.js";

export default class AIGateway {

    constructor(kernel = null) {

    this.kernel = kernel;

    this.registry = new ProviderRegistry();

    this.loadProviders();

}

    loadProviders() {

        this.registry.register(
            new GeminiProvider()
        );

    }

    register(provider) {

        this.registry.register(provider);

    }

    async execute(request) {

        let provider;

        if (request.provider) {

            provider = this.registry.get(request.provider);

        } else {

            provider = this.registry.find(request.capability);

        }

        if (!provider) {

            throw new Error("Không tìm thấy AI Provider.");

        }

        return await provider.execute(request);

    }

}