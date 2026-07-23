// ==========================================
// AnOS V3
// Creative Step
// Xử lý nhiệm vụ sáng tạo
// ==========================================


export default class CreativeStep {


async run(state){


const text = state.input.toLowerCase();



if(
text.includes("bài hát")
){

state.context.creative = {

type:"song",

structure:[
"Intro",
"Verse 1",
"Chorus",
"Verse 2",
"Bridge",
"Outro"
],

style:"cảm xúc, dễ hát"

};


}



if(
text.includes("truyện")
){

state.context.creative={

type:"story",

structure:[
"Mở đầu",
"Cao trào",
"Kết thúc"
]

};


}



console.log(
"🎨 Creative Context:",
state.context.creative
);



return state;


}


}