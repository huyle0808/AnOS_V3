const aliases = {
    "khả năng tự học rất tốt": "Tự học",
    "khả năng tự học": "Tự học",

    "nhà nghiên cứu": "Nghiên cứu viên",
    "nghiên cứu": "Nghiên cứu viên",

    "lập trình viên ai": "AI Software Engineer",
    "kỹ sư ai": "AI Software Engineer",

    "machine learning engineer": "AI Software Engineer"
};

export function normalize(text) {

    if (!text) return text;

    const key = text.trim().toLowerCase();

    return aliases[key] || text;

}