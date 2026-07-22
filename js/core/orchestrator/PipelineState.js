// ==========================================
// AnOS V3
// Pipeline State
// ==========================================


export default class PipelineState {


    constructor(message){


        // Người dùng nhập

        this.input = message;



        // Context hiện tại

        this.context = {};



        // Cảm xúc

        this.emotion = null;


        this.emotionReply = null;



        // Kế hoạch xử lý

        this.plan = [];



        // Ý định người dùng

        this.intent = null;



        // Router

        this.route = null;



        // Kết quả cuối

        this.reply = null;



        // Bộ nhớ phiên

        this.memory = [];



        // Lỗi nếu có

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

            name,

            time:
                new Date()

        });


    }





    finish(){


        this.metadata.status =
            "completed";


        this.metadata.endTime =
            new Date();


    }




}