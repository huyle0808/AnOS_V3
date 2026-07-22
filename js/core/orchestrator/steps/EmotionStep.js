// ==========================================
// AnOS V3
// Emotion Step
// ==========================================


import {
    processEmotion
}
from "../../pipeline/emotion.js";



export default class EmotionStep {



async run(state){


    const result =
        processEmotion(
            state.input
        );



    state.emotion =
        result.emotion;



    state.emotionReply =
        result.emotionReply;



    return state;


}


}