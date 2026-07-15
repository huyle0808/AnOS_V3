import { skills } from "../skills/index.js";

export async function thinkStep(step, message) {

    console.log("🧠 Think:", step);

    const skill = skills[step];

    if (!skill) {
        return null;
    }

    return await skill(message);

}