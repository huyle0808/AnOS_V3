export default class AttentionEngine{

    score(state){

        let score=0;

        if(state.intent==="memory"){

            score+=100;

        }

        if(state.intent==="planning"){

            score+=80;

        }

        if(state.intent==="chat"){

            score+=30;

        }

        return score;

    }

}