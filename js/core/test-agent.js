import { pipeline } from "./pipeline.js";
import { loadMemory } from "./sync.js";
import { getProfile } from "./memory.js";

await loadMemory();

console.log("PROFILE:", getProfile());

const result = await pipeline(
    "Bạn nhớ tên tôi không?"
);

console.log("========================");
console.log(result.reply);
console.log("========================");