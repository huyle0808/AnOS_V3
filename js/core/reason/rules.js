export const rules = [

    {
        when(profile) {

            const f = Array.isArray(profile.favorite)
                ? profile.favorite.map(x => x.toLowerCase())
                : [];

            return f.includes("ai") &&
                   f.includes("lập trình");
        },

        facts: [
            {
                id: "ai-software",
                text: "Bạn có thiên hướng phát triển AI và phần mềm.",
                score: 10
            }
        ],

        jobs: [
            {
                id: "ai-software-engineer",
                text: "AI Software Engineer",
                score: 10
            }
        ],

        strengths: [
            {
                id: "ai-programming",
                text: "Khả năng kết hợp giữa AI và lập trình.",
                score: 8
            }
        ],

        suggestions: [
            {
                id: "build-ai-project",
                text: "Nên xây dựng các dự án AI thực tế.",
                score: 6
            }
        ]
    },

    {
        when(profile) {

            const f = Array.isArray(profile.favorite)
                ? profile.favorite.map(x => x.toLowerCase())
                : [];

            return f.includes("đọc sách") &&
                   f.includes("nghiên cứu");
        },

        facts: [
            {
                id: "deep-learning",
                text: "Bạn có xu hướng học tập chuyên sâu.",
                score: 10
            }
        ],

        jobs: [
            {
                id: "researcher",
                text: "Nhà nghiên cứu",
                score: 9
            }
        ],

        strengths: [
            {
                id: "self-learning",
                text: "Khả năng tự học rất tốt.",
                score: 8
            }
        ],

        suggestions: [
            {
                id: "research-project",
                text: "Nên tham gia các đề tài nghiên cứu.",
                score: 6
            }
        ]
    },

    {
        when(profile) {

            const f = Array.isArray(profile.favorite)
                ? profile.favorite.map(x => x.toLowerCase())
                : [];

            return f.includes("bác sĩ") &&
                   f.includes("thẩm mỹ");
        },

        facts: [
            {
                id: "cosmetic-doctor",
                text: "Bạn có thể phù hợp với lĩnh vực bác sĩ thẩm mỹ.",
                score: 10
            }
        ],

        jobs: [
            {
                id: "cosmetic-surgeon",
                text: "Bác sĩ thẩm mỹ",
                score: 10
            }
        ],

        strengths: [
            {
                id: "medical-aesthetic",
                text: "Có khả năng kết hợp chuyên môn và thẩm mỹ.",
                score: 8
            }
        ],

        suggestions: [
            {
                id: "study-cosmetic",
                text: "Nên học thêm về phẫu thuật thẩm mỹ.",
                score: 6
            }
        ]
    }

];