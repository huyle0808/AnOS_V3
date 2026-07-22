// ============================================
// AnOS V4 Brain Engine
// Author : ChatGPT + Huy
// Version: 4.0
// ============================================

import Planner from "./Planner.js";
import Router from "./Router.js";
import Memory from "./Memory.js";
import Workflow from "./Workflow.js";
import { detectPersonality } from "./personality.js";

export default class Brain {

    constructor() {

        this.planner = new Planner();

        this.router = new Router();

        this.memory = new Memory();

        this.workflow = new Workflow();

    }

    async process(message, profile = {}) {

        console.log("🧠 Brain đang xử lý...");

        //----------------------------------
        // 1. Đọc trí nhớ
        //----------------------------------

        const history = await this.memory.load();

        //----------------------------------
        // 2. Phân tích tính cách
        //----------------------------------

        const personality =
            detectPersonality(profile);

        //----------------------------------
        // 3. Lập kế hoạch
        //----------------------------------

        const plan =
            await this.planner.create(

                message,

                history,

                personality

            );

        //----------------------------------
        // 4. Chọn Agent
        //----------------------------------

        const agent =
            this.router.select(plan);

        //----------------------------------
        // 5. Workflow
        //----------------------------------

        const steps =
            this.workflow.create(

                plan.intent

            );

        //----------------------------------
        // 6. Agent thực thi
        //----------------------------------

        const result =
            await agent.execute({

                message,

                plan,

                personality,

                history,

                steps

            });

        //----------------------------------
        // 7. Lưu Memory
        //----------------------------------

        await this.memory.save({

            question: message,

            answer: result.reply,

            intent: plan.intent

        });

        //----------------------------------
        // 8. Trả kết quả
        //----------------------------------

        return {

            success: true,

            reply: result.reply,

            intent: plan.intent,

            workflow: steps,

            personality,

            historyCount: history.length

        };

    }

}