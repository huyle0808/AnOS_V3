import { process } from "./brain/index.js";

export async function think(message) {

    return await process(message);

}