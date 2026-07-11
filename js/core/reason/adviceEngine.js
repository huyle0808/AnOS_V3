// js/core/reason/adviceEngine.js

const adviceDB = {

    "mất việc": [
        "Hãy dành thời gian ổn định tinh thần trước.",
        "Cập nhật CV và hồ sơ xin việc.",
        "Tìm kiếm các cơ hội việc làm mới.",
        "Học thêm kỹ năng để tăng lợi thế cạnh tranh."
    ],

    "công việc": [
        "Sắp xếp lại các công việc theo mức độ ưu tiên.",
        "Trao đổi với đồng nghiệp hoặc quản lý nếu cần.",
        "Đừng ôm quá nhiều việc cùng lúc."
    ],

    "tiền": [
        "Lập kế hoạch chi tiêu.",
        "Xem xét cắt giảm các khoản chưa cần thiết.",
        "Tìm thêm nguồn thu nhập nếu có thể."
    ],

    "học": [
        "Chia nhỏ mục tiêu học tập.",
        "Lập thời gian biểu hợp lý.",
        "Nghỉ ngơi đầy đủ để giữ hiệu quả."
    ]
};

export function getAdvice(cause = "") {

    const text = cause.toLowerCase();

    for (const key in adviceDB) {

        if (text.includes(key)) {
            return adviceDB[key];
        }

    }

    return [
        "Hãy bình tĩnh đánh giá tình hình.",
        "Từng bước giải quyết vấn đề.",
        "Nếu muốn, mình sẽ cùng bạn lập kế hoạch."
    ];
}