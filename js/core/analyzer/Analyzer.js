export default class Analyzer {

    analyze(profile) {

        return {

            strengths: this.getStrengths(profile),

            jobs: this.getJobs(profile),

            personality: this.getPersonality(profile),

            suggestions: this.getSuggestions(profile)

        };

    }

    getStrengths(profile) {

        const list = [];

        if (profile.favorite?.includes("AI"))
            list.push("Đam mê AI");

        if (profile.favorite?.includes("lập trình"))
            list.push("Có tư duy lập trình");

        if (profile.favorite?.includes("nghiên cứu"))
            list.push("Khả năng nghiên cứu");

        return list;

    }

    getJobs(profile) {

        const jobs = [];

        if (profile.favorite?.includes("AI"))
            jobs.push("AI Software Engineer");

        if (profile.favorite?.includes("thẩm mỹ"))
            jobs.push("Chuyên gia thẩm mỹ");

        if (profile.favorite?.includes("bác sỹ"))
            jobs.push("Bác sĩ");

        return jobs;

    }

    getPersonality(profile) {

        return [

            "Ham học hỏi",

            "Tư duy logic",

            "Yêu công nghệ"

        ];

    }

    getSuggestions(profile) {

        return [

            "Nên học Machine Learning",

            "Nên xây dựng dự án AI",

            "Đọc thêm sách chuyên ngành"

        ];

    }

}