// ==========================================
// AnOS V4
// Memory Answer Service
// ==========================================

import {
    getProfile
} from "../memory.js";

export default class MemoryAnswerService {

    answer(message) {

        if (!message) {

            return null;

        }

        const q = message
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

        
            const profile = getProfile();

console.log(
    "🧠 PROFILE:",
    profile
);
           

        // ======================
        // NAME
        // ======================

        if (

            q.includes("ten toi la gi") ||

            q.includes("ban con nho ten toi") ||

            q.includes("ban nho ten toi") ||

            q.includes("toi ten gi") ||

            q.includes("toi la ai")

        ) {

            if (profile.name) {

                return `Tên của bạn là ${profile.name}.`;

            }

            return "Mình chưa biết tên của bạn.";

        }

        // ======================
        // AGE
        // ======================

        if (

            q.includes("toi bao nhieu tuoi") ||

            q.includes("toi may tuoi") ||

            q.includes("tuoi toi") ||

            q.includes("bao nhieu tuoi")

        ) {

            if (profile.age) {

                return `Bạn ${profile.age} tuổi.`;

            }

            return "Mình chưa biết tuổi của bạn.";

        }

        // ======================
        // JOB
        // ======================

        if (

            q.includes("toi lam nghe gi") ||

            q.includes("toi lam gi") ||

            q.includes("nghe cua toi") ||

            q.includes("cong viec")

        ) {

            if (profile.job) {

                return `Bạn là ${profile.job}.`;

            }

            return "Mình chưa biết nghề nghiệp của bạn.";

        }

        // ======================
        // DRINK
        // ======================

        if (

            q.includes("toi thich uong gi") ||

            q.includes("do uong yeu thich")

        ) {

            if (profile.drink) {

                return `Bạn thích ${profile.drink}.`;

            }

            return "Mình chưa biết đồ uống yêu thích của bạn.";

        }

        // ======================
        // COLOR
        // ======================

        if (

            q.includes("thich mau gi") ||

            q.includes("mau yeu thich")

        ) {

            if (profile.color) {

                return `Bạn thích màu ${profile.color}.`;

            }

            return "Mình chưa biết màu yêu thích của bạn.";

        }

        return null;

    }

}