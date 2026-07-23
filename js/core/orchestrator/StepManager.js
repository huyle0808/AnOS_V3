// ==========================================
// AnOS V3.5
// Dynamic Step Manager
// Agent Pipeline Controller
// ==========================================



export default class StepManager {



constructor(){


    // lưu toàn bộ Agent Step

    this.steps = {};


}






// ==========================================
// Register Agent
// ==========================================


register(name, step){


    if(
        !name ||
        !step
    ){

        console.warn(
            "⚠ Cannot register invalid step:",
            name
        );

        return;

    }



    this.steps[name] = step;



    console.log(
        "➕ Registered Step:",
        name
    );


}






// ==========================================
// Get Step
// ==========================================


get(name){


    return this.steps[name];


}








// ==========================================
// Execute Dynamic Plan
// ==========================================


async execute(state){



    if(
        !state ||
        !Array.isArray(state.plan) ||
        state.plan.length === 0
    ){


        console.log(
            "⚠ No execution plan"
        );


        return state;


    }





    console.log(
        "🧠 EXECUTE PLAN:",
        state.plan
    );






    for(
        const stepName of state.plan
    ){





        const step =
        this.get(stepName);





        // ==========================
        // Check Step
        // ==========================


        if(
            !step ||
            typeof step.run !== "function"
        ){



            console.warn(
                "⚠ Missing or Invalid Step:",
                stepName
            );



            continue;


        }





        console.log(
            "▶ Running:",
            stepName
        );




        const startTime =
        Date.now();





        try{





            state =
            await step.run(state);





            // ======================
            // Save Trace
            // ======================


            if(
                typeof state.addStep === "function"
            ){


                state.addStep(
                    stepName
                );


            }





            const duration =
            Date.now() - startTime;





            console.log(
                "✔ Completed:",
                stepName,
                "|",
                duration,
                "ms"
            );





        }
        catch(error){





            console.error(
                "❌ Step Failed:",
                stepName,
                error
            );






            if(
                typeof state.fail === "function"
            ){


                state.fail(error);


            }
            else{


                state.error =
                error.message;


            }






            break;



        }




    }






    return state;



}







}