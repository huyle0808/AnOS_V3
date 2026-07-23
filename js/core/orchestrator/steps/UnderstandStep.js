// ==========================================
// AnOS V3.5
// Understand Step
// ==========================================


export default class UnderstandStep {


async run(state){


console.log(
"🧠 Understand Request"
);



state.analysis={


summary:
state.input,


ready:true


};



return state;


}



}