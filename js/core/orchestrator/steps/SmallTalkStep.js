// ==========================================
// AnOS V3.5
// Small Talk Step
// ==========================================


export default class SmallTalkStep {


async run(state){


state.reply =
`
Chào Huy! 👋

Mình là AnOS.

Mình có thể giúp Huy:
- 💡 Sáng tạo ý tưởng
- 🎵 Viết bài hát
- 💻 Xây dựng ứng dụng
- 📋 Lập kế hoạch công việc
- 🤖 Phát triển AI Agent

Hôm nay Huy muốn làm gì?
`;



return state;


}


}