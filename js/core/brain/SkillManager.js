// ==========================================
// AnOS V4
// Skill Manager
// ==========================================

export default class SkillManager {

    constructor() {

        this.skills = new Map();

    }

    register(name, skill) {

        this.skills.set(name, skill);

        console.log("🧩 Skill:", name);

    }

    get(name) {

        return this.skills.get(name);

    }

    has(name) {

        return this.skills.has(name);

    }

    remove(name) {

        this.skills.delete(name);

    }

    all() {

        return [...this.skills.keys()];

    }

    async execute(name, payload) {

        const skill = this.skills.get(name);

        if (!skill) {

            throw new Error(`Skill "${name}" not found`);

        }

        if (typeof skill.execute !== "function") {

            throw new Error(`Skill "${name}" has no execute()`);

        }

        return await skill.execute(payload);

    }

}