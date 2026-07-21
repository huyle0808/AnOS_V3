export default class ProviderRegistry {

    constructor() {

        this.providers = new Map();

    }

    register(provider) {

        this.providers.set(provider.id, provider);

    }

    get(id) {

        return this.providers.get(id);

    }

    has(id) {

        return this.providers.has(id);

    }

    remove(id) {

        this.providers.delete(id);

    }

    find(capability) {

        for (const provider of this.providers.values()) {

            if (provider.supports(capability)) {

                return provider;

            }

        }

        return null;

    }

    list() {

        return [...this.providers.keys()];

    }

}