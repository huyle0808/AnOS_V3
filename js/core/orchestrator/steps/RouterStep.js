// ==========================================
// AnOS V3.5
// Agent Router Step
// Decide Agent Pipeline
// ==========================================


export default class RouterStep {



async run(state){



console.log(
"🧭 Router analyzing:",
state.intent
);





switch(state.intent){



// =======================
// Creative Agent
// =======================

case "creative":


state.plan=[

"creative",

"ai",

"review",

"memory"

];


break;





// =======================
// Software Agent
// =======================

case "create_application":


state.plan=[

"requirement",

"architecture",

"code",

"ai",

"review"

];


break;






// =======================
// Memory Agent
// =======================

case "memory":


state.plan=[

"memory"

];


break;






// =======================
// Planning Agent
// =======================

case "planning":


state.plan=[

"task",

"ai",

"review"

];


break;






// =======================
// Default
// =======================

default:


state.plan=[

"ai",

"review"

];


}





console.log(
"🧠 Agent Plan:",
state.plan
);



return state;



}


}