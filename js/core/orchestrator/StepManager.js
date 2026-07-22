// ==========================================
// AnOS V3
// Step Manager
// ==========================================


export default class StepManager {



    constructor(){


        this.steps = [];


    }





    add(step){


        this.steps.push(step);


    }





    async execute(state){



        for(
            const step of this.steps
        ){



            const stepName =
                step.constructor.name;



            console.log(
                "▶ Running:",
                stepName
            );



            try {



                state =
                await step.run(state);



                // lưu trace

                if(
                    typeof state.addStep === "function"
                ){

                    state.addStep(
                        stepName
                    );

                }



                console.log(
                    "✔ Completed:",
                    stepName
                );



            } catch(error){



                console.error(

                    "❌ Step Error:",
                    stepName,

                    error

                );



                state.error = {

                    step:
                    stepName,


                    message:
                    error.message,


                    time:
                    new Date()

                };



                break;


            }



        }



        return state;


    }





}