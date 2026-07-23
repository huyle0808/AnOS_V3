// ==========================================
// AnOS V3.5
// Task Planner Step
// ==========================================


export default class TaskPlannerStep {


async run(state){


console.log(
"📋 Create Task Steps"
);



state.tasks=[

"Phân tích mục tiêu",

"Chia nhỏ công việc",

"Xác định công cụ",

"Thực hiện",

"Kiểm tra kết quả"

];



return state;


}



}