export const rules = [

    {
        when(profile) {

            const f = Array.isArray(profile.favorite)
                ? profile.favorite.map(x => x.toLowerCase())
                : [];

            return f.includes("ai") &&
                   f.includes("lập trình");
        },

        fact: "Bạn có thiên hướng phát triển AI và phần mềm.",

        job: "AI Software Engineer",

        strength: "Khả năng kết hợp giữa AI và lập trình.",

        suggestion: "Nên xây dựng các dự án AI thực tế."
    },

    {
        when(profile) {

            const f = Array.isArray(profile.favorite)
                ? profile.favorite.map(x => x.toLowerCase())
                : [];

            return f.includes("đọc sách") &&
                   f.includes("nghiên cứu");
        },

        fact: "Bạn có xu hướng học tập chuyên sâu.",

        job: "Nhà nghiên cứu",

        strength: "Khả năng tự học rất tốt.",

        suggestion: "Nên tham gia các đề tài nghiên cứu."
    },

    {
        when(profile) {

            const f = Array.isArray(profile.favorite)
                ? profile.favorite.map(x => x.toLowerCase())
                : [];

            return f.includes("bác sĩ") &&
                   f.includes("thẩm mỹ");
        },

        fact: "Bạn có thể phù hợp với lĩnh vực bác sĩ thẩm mỹ.",

        job: "Bác sĩ thẩm mỹ",

        strength: "Có khả năng kết hợp chuyên môn và thẩm mỹ.",

        suggestion: "Nên học thêm về phẫu thuật thẩm mỹ."
    }

];