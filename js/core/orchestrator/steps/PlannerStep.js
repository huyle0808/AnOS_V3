// ==========================================
// AnOS V3.5
// Planner Step
// AI Agent Intent Planner
// Dynamic Pipeline Router
// ==========================================


export default class PlannerStep {



async run(state){



const text =
(state.input || "")
.toLowerCase()
.trim();




// ==========================================
// Initialize
// ==========================================


state.intent = "chat";

state.goal = {};

state.capability = "general";

state.priority = "normal";






// ==========================================
// Greeting
// ==========================================


const greetings = [

"chào",
"xin chào",
"hello",
"hi",
"alo",
"hey"

];



if(
greetings.includes(text)
){


state.plan=[

"smalltalk"

];


state.route="smalltalk";

state.intent="conversation";

state.capability=
"conversation";



console.log(
"📋 Plan: smalltalk"
);



return state;


}








// ==========================================
// Memory Manager
// ==========================================


if(
/(tên tôi|nhớ tôi|quên tôi|bạn biết tôi|lưu thông tin)/i
.test(text)
){


state.plan=[

"memory"

];


state.route="memory";

state.intent="memory";

state.capability=
"memory_manager";



console.log(
"📋 Plan: memory"
);



return state;


}








// ==========================================
// Software Engineer Agent
// ==========================================


if(
/(app|ứng dụng|website|web|code|lập trình|phần mềm|bug|lỗi|AI agent|ứng dụng AI)/i
.test(text)
){



state.plan=[


"analyze_requirement",


"design_solution",


"generate_code",


"ai",


"review",


"memory"


];



state.intent=
"create_application";


state.capability=
"software_engineer";



state.goal={


type:
"software",


action:
"build"


};




console.log(
"📋 Plan: software_engineer"
);



return state;


}









// ==========================================
// Creative Agent
// ==========================================


if(
/(bài hát|âm nhạc|truyện|kịch bản|nhân vật|sáng tác|lời bài hát|viết thơ|ý tưởng)/i
.test(text)
){



state.plan=[


"creative",


"ai",


"review",


"memory"


];



state.intent=
"creative";


state.capability=
"creative_writer";



state.goal={


type:
"content",


action:
"create"


};




console.log(
"📋 Plan: creative_writer"
);



return state;


}









// ==========================================
// Planning Agent
// ==========================================


if(
/(kế hoạch|lịch|công việc|dự án|mục tiêu|chiến lược|phân tích công việc)/i
.test(text)
){



state.plan=[


"analyze_task",


"create_steps",


"ai",


"review",


"memory"


];



state.intent=
"planning";


state.capability=
"planner";



state.goal={


type:
"task",


action:
"plan"


};




console.log(
"📋 Plan: planner"
);



return state;


}









// ==========================================
// Learning / Explanation Agent
// ==========================================


if(
/(học|giải thích|hướng dẫn|là gì|tại sao|như thế nào)/i
.test(text)
){



state.plan=[


"understand",


"ai",


"review"


];



state.intent=
"learning";


state.capability=
"teacher";



console.log(
"📋 Plan: learning"
);



return state;


}









// ==========================================
// Default General Assistant
// ==========================================


state.plan=[


"understand",


"ai",


"review"


];



state.route="ai";


state.intent="chat";


state.capability=
"general_assistant";




console.log(
"📋 Plan: general_chat"
);



return state;



}



}