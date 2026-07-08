export default class Brain {

    async think(text) {

        text = text.toLowerCase();

        if (text.includes("chào")) {
            return "Xin chào 👋";
        }

        if (text.includes("trời đẹp")) {
            return "Đúng rồi, hôm nay thời tiết khá đẹp.";
        }

        if (text.includes("bạn là ai")) {
            return "Mình là AnOS V3.";
        }

        return null;
    }

}
