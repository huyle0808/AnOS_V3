export function extractProfile(text) {

    const data = {};

    const patterns = [

        {
            key: "name",
            regex: /(?:tôi|mình|em|tớ)\s+tên\s+là\s+([A-Za-zÀ-ỹ\s]+)/i
        },

        {
            key: "age",
            regex: /(\d+)\s*tuổi/i
        },

        {
            key: "city",
            regex: /(?:tôi|mình|em)\s+(?:ở|sống ở)\s+([A-Za-zÀ-ỹ\s]+)/i
        },

        {
            key: "job",
            regex: /(?:tôi|mình|em)\s+làm\s+(.+)/i
        },

        {
            key: "like",
            regex: /(?:tôi|mình|em)\s+thích\s+(.+)/i
        }

    ];

    for (const item of patterns) {

        const m = text.match(item.regex);

        if (m) {

            data[item.key] = m[1].trim();

        }

    }

    return data;

}