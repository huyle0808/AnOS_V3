export const rules = [

    {
        when: p =>
            p.favorite?.includes("AI"),

        fact: "Bạn rất hứng thú với AI."
    },

    {
        when: p =>
            p.favorite?.includes("lập trình"),

        fact: "Bạn có tư duy lập trình."
    },

    {
        when: p =>
            p.favorite?.includes("đọc sách"),

        fact: "Bạn ham học hỏi."
    },

    {
        when: p =>
            p.favorite?.includes("AI") &&
            p.favorite?.includes("lập trình"),

        fact: "Bạn phù hợp phát triển phần mềm AI."
    },

    {
        when: p =>
            p.favorite?.includes("AI") &&
            p.favorite?.includes("đọc sách"),

        fact: "Bạn có khả năng tự học AI rất tốt."
    }

];