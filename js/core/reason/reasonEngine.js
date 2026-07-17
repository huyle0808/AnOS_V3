import { getProfile } from "../memory.js";

export async function reasonAboutUser() {

    console.log("🧠 reasonAboutUser()");

    const profile = await getProfile();

    console.log("🧠 Profile:", profile);

    if (!profile) {
        return "Mình vẫn chưa biết nhiều về bạn.";
    }

    const result = [];

    // ===== Tên =====
    if (profile.name) {
        result.push(`Tên của bạn là ${profile.name}.`);
    }

    // ===== Tuổi =====
    const age = Number(profile.age);

    if (!isNaN(age)) {

        if (age < 18) {
            result.push("Bạn còn khá trẻ.");
        } else if (age < 40) {
            result.push("Bạn đang ở giai đoạn phát triển mạnh sự nghiệp.");
        } else {
            result.push("Bạn có nhiều kinh nghiệm sống.");
        }

    }

    // ===== Sở thích =====
    const favorites = profile.favorite || profile.like || [];

    if (favorites.length) {

        // Chuẩn hóa dữ liệu
        const fav = [...new Set(
            favorites
                .map(item => String(item).trim().toLowerCase())
                .filter(Boolean)
        )];

        result.push(`Bạn thích ${fav.join(", ")}.`);

        // ===== Phân tích từng sở thích =====

        if (fav.includes("lập trình")) {
            result.push("Bạn có xu hướng yêu thích công nghệ.");
        }

        if (fav.includes("ai")) {
            result.push("Bạn rất quan tâm đến trí tuệ nhân tạo.");
        }

        if (fav.includes("đọc sách")) {
            result.push("Bạn có tinh thần học hỏi.");
        }

        if (fav.includes("nghiên cứu")) {
            result.push("Bạn thích tìm tòi và khám phá kiến thức mới.");
        }

        if (
            fav.includes("làm bác sĩ") ||
            fav.includes("mổ xẻ bệnh nhân")
        ) {
            result.push("Bạn quan tâm đến lĩnh vực y khoa và chăm sóc sức khỏe.");
        }

        if (
            fav.includes("thẩm mỹ") ||
            fav.includes("làm đẹp")
        ) {
            result.push("Bạn cũng có hứng thú với lĩnh vực thẩm mỹ và làm đẹp.");
        }

        // ===== Suy luận kết hợp =====

        if (
            fav.includes("ai") &&
            fav.includes("lập trình")
        ) {
            result.push("Có thể bạn đang hướng tới việc phát triển hoặc nghiên cứu các ứng dụng AI.");
        }

        if (
            fav.includes("đọc sách") &&
            fav.includes("nghiên cứu")
        ) {
            result.push("Bạn là người thích tự học và khám phá kiến thức mới.");
        }

        if (
            (fav.includes("làm bác sĩ") || fav.includes("mổ xẻ bệnh nhân")) &&
            (fav.includes("thẩm mỹ") || fav.includes("làm đẹp"))
        ) {
            result.push("Bạn quan tâm đến cả y khoa và thẩm mỹ, có xu hướng kết hợp kiến thức chuyên môn với tính ứng dụng.");
        }

        if (
            fav.includes("ai") &&
            fav.includes("nghiên cứu")
        ) {
            result.push("Bạn có xu hướng tìm hiểu AI ở mức chuyên sâu thay vì chỉ sử dụng.");
        }

    }

    // ===== Kết luận =====

    result.push(
        "Đây là phân tích dựa trên những thông tin mình đang lưu. Khi có thêm dữ liệu về bạn, mình sẽ đưa ra những nhận xét chính xác và chi tiết hơn."
    );

    return result.join(" ");
}
