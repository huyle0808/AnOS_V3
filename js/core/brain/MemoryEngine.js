// ==========================================
// AnOS V4
// Memory Engine
// Long Term Memory
// ==========================================

import {
    remember,
    recall,
    getProfile,
    setProfile,
    getHistory,
    addHistory,
    exportMemory,
    importMemory
} from "../memory.js";

import { saveMemory } from "../sync.js";

export default class MemoryEngine {

    constructor() {

        this.profile = {};

        this.history = [];

        this.ready = false;

    }

    // ==========================
    // Init
    // ==========================

    async init() {

        this.profile = getProfile() || {};

        this.history = getHistory() || [];

        this.ready = true;

        console.log("🧠 Memory Engine Ready");

    }

    // ==========================
    // Remember
    // ==========================

    async remember(key, value) {

        remember(key, value);

        this.profile[key] = value;

        await saveMemory();

        return true;

    }

    // ==========================
    // Recall
    // ==========================

    recall(key) {

        return recall(key);

    }

    // ==========================
    // Update
    // ==========================

    async update(key, value) {

        return await this.remember(key, value);

    }

    // ==========================
    // Forget
    // ==========================

    async forget(key) {

        delete this.profile[key];

        setProfile(this.profile);

        await saveMemory();

        return true;

    }

    // ==========================
    // Search
    // ==========================

    search(keyword) {

        keyword = String(keyword).toLowerCase();

        const result = {};

        Object.entries(this.profile).forEach(([k, v]) => {

            if (

                k.toLowerCase().includes(keyword) ||

                String(v).toLowerCase().includes(keyword)

            ) {

                result[k] = v;

            }

        });

        return result;

    }

    // ==========================
    // Profile
    // ==========================

    getProfile() {

        return this.profile;

    }

    // ==========================
    // History
    // ==========================

    getHistory() {

        return this.history;

    }

    async addHistory(user, assistant) {

        addHistory(user, assistant);

        this.history = getHistory();

        await saveMemory();

    }

    // ==========================
    // Export
    // ==========================

    export() {

        return exportMemory();

    }

    // ==========================
    // Import
    // ==========================

    async import(data) {

        importMemory(data);

        this.profile = getProfile();

        this.history = getHistory();

        await saveMemory();

    }

    // ==========================
    // Exists
    // ==========================

    has(key) {

        return this.recall(key) !== undefined;

    }

    // ==========================
    // Clear
    // ==========================

    async clear() {

        this.profile = {};

        this.history = [];

        setProfile({});

        importMemory({});

        await saveMemory();

    }

}