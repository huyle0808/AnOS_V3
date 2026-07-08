export function calculator(message) {

    const text = message.trim();

    const match = text.match(/^(\d+)\s*([\+\-\*\/])\s*(\d+)$/);

    if (!match) {
        return null;
    }

    const a = Number(match[1]);
    const op = match[2];
    const b = Number(match[3]);

    switch (op) {
        case "+":
            return `${a} + ${b} = ${a + b}`;
        case "-":
            return `${a} - ${b} = ${a - b}`;
        case "*":
            return `${a} × ${b} = ${a * b}`;
        case "/":
            if (b === 0) {
                return "Không thể chia cho 0.";
            }
            return `${a} ÷ ${b} = ${a / b}`;
    }

    return null;
}