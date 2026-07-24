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
    "hey",
    "good morning",
    "good afternoon",
    "good evening"

];




if (
    greetings.some(item => text === item)
)
{


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





// Memory Question
// ==========================================

const memoryQuestion =
/(tên tôi là gì|tôi tên gì|tôi là ai|bạn( còn)? nhớ tên tôi( không)?|bạn có nhớ tên tôi( không)?|tôi bao nhiêu tuổi|tôi mấy tuổi|tuổi tôi|bạn nhớ tuổi tôi|tôi làm nghề gì|tôi làm gì|nghề của tôi|tôi thích uống gì|đồ uống yêu thích|tôi thích màu gì|màu yêu thích)/i;
if (memoryQuestion.test(text)) {

    state.plan = [

        "understand",

        "memory",

        "ai",

        "review"

    ];

    state.route = "ai";

    state.intent = "chat";

    state.capability = "general_assistant";

    console.log("📋 Plan: memory question");

    return state;
}



// ==========================================
// ==========================================
// Memory Manager
// ==========================================

const memoryPattern =
/^(tên tôi là|tôi tên là|tôi là\s+\S+|tôi\s+(năm nay\s+)?\d+\s*tuổi|mình\s+\d+\s*tuổi|tôi làm|tôi thích|tôi sống|tôi ở|tôi sinh|tôi học|tôi yêu|tôi ghét|tôi có|tôi muốn|tôi cần|lưu thông tin|ghi nhớ)/i;

if (memoryPattern.test(text)) {

   state.plan=[
    "understand",
    "memory",
    
    "review"
];

    state.route = "memory";

    state.intent = "memory";

    state.capability = "memory_manager";

    console.log("📋 Plan: memory");

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

"memory",

"analyze_requirement",

"design_solution",

"generate_code",

"ai",

"review"

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



state.plan=


[
"memory",
"creative",
"ai",
"review"
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



state.plan=


[
"memory",
"analyze_task",
"create_steps",
"ai",
"review"
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



state.plan = 

    [
"memory",
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

    "memory",

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