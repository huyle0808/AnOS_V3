import { emotionKnowledge } from "./emotionKnowledge.js";
import { emotionScore } from "./emotionScore.js";
import { applyEmotionRules } from "./emotionRules.js";
import { normalize } from "./emotionNormalize.js";

export function analyzeEmotion(text){

    text = normalize(text);

    let best = {
        emotion: "😐 Bình thường",
        score: 0,
        keywords:[]
    };

    for(const item of Object.values(emotionKnowledge)){

        let count = 0;
        let found = [];

        for(const word of item.keywords){

            if(text.includes(word)){

                count++;
                found.push(word);

            }

        }

        if(count > 0){

            const score = emotionScore(count);

            if(score > best.score){

                best = {

                    emotion:item.emotion,
                    score,
                    keywords:found

                };

            }

        }

    }

    applyEmotionRules(best);

    return best;

}