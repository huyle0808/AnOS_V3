// ==========================================
// AnOS V3
// Pipeline State
// ==========================================


export default class PipelineState {


    constructor(message){


        // Input người dùng

        this.input = message || "";



        // Context hệ thống

        this.context = {

            lastMessage:"",
            lastReply:"",
            lastIntent:"",
            user:{}

        };



        // Emotion

        this.emotion = {

            score:0,
            emotion:""

        };


        this.emotionReply = "";



        // Planner

        this.plan = [];



        // Intent

        this.intent = null;

        // Confidence AI

this.confidence={

    intent:0,

    plan:0,

    response:0

};



// Goals / Objectives

this.goals=[];



// Agent runtime

this.agent={

    current:"",

    history:[]

};

        // Router

        this.route = null;



        // AI Response cuối

        this.reply = "";



        // Memory

        this.memory = {

            profile:{},
            history:[],
            tasks:[]

        };



        // Error

        this.error = null;



        // Metadata

        this.metadata = {


            startTime:
                new Date(),


            status:
                "running",


            steps:[]


        };


    }





    addStep(name){


        this.metadata.steps.push({

            name:name,

            time:
                new Date()

        });


    }





    fail(error){


        this.error =
            error?.message || error;


        this.metadata.status =
            "error";


        this.metadata.endTime =
            new Date();


    }





    finish(){


        if(this.metadata.status !== "error"){


            this.metadata.status =
                "completed";


        }


        this.metadata.endTime =
            new Date();


    }


}