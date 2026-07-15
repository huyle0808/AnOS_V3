export function calculator(message) {

    const text = message.trim();

    // Chỉ xử lý nếu là biểu thức toán học
    if (!/^[0-9+\-*/().\s]+$/.test(text)) {
        return null;
    }

    try {

        const result = Function('"use strict"; return (' + text + ')')();

        return `${text} = ${result}`;

    } catch {

        return "Biểu thức không hợp lệ.";

    }

}