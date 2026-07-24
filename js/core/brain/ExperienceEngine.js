export default class ExperienceEngine{

    constructor(){

        this.logs=[];

    }

    learn(input,output){

        this.logs.push({

            input,

            output,

            time:new Date()

        });

    }

}