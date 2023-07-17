export const separators: string[] = ["+", "-", "x", "/"];

// Allowed keyboard inputs
export const validCharacters: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "x",
    "/",
    ".",
];

export type ButtonProps = {
    buttonData: {
        character: string;
        onClick: () => void;
        specification?: "equals" | "blue" | "reset" | undefined;
    };
};

/**
 * Puts a symbol on the screen. If it's an operator, then it
 * can be after a zero, but not after another operator. If
 * it's a number, then it cannot be after a zero.
 * @param {string} expression - The screen.
 * @param {string} value - The value to be inserted.
 * @returns {string} The result after all the verifications.
 */
export function putSymbol(expression: string, value: string): string {
    if (isValueOperator(value)) {
        if (isAfterZero(expression)) {
            return expression + value;
        } else {
            if (isAfterOperator(expression)) {
                return expression;
            } else {
                return expression + value;
            }
        }
    } else {
        if (isAfterZero(expression)) {
            return value;
        } else {
            return expression + value;
        }
    }
}

/**
 * Solves all the expressions, by order.
 * @param {string} expression - The array of expressions.
 * @returns {string} The result.
 */
export function solveExpression(expression: string): string {
    const expressions: string[] = separateExpressions(expression);

    for (let i = 3; expressions.length > 1; i + 3) {
        const nextExpression: string[] = getSingleExpression(expressions, i);
        expressions.unshift(
            calculate(
                parseFloat(nextExpression[0]),
                nextExpression[1],
                parseFloat(nextExpression[2]),
            ),
        );
    }

    return expressions[0];
}

/**
 * Removes the last symbol inserted on the screen. If there's
 * only one character, resets to 0. It also resets if the
 * screen is displaying NaN, Indeterminate, or Undefined.
 * @param {string} expression - The screen.
 * @returns {string} The expression that was on the screen,
 * minus the most recent character.
 */
export function removeSymbol(expression: string): string {
    if (
        expression.length === 1 ||
        expression === "NaN" ||
        expression === "Indeterminate" ||
        expression === "Undefined"
    ) {
        return "0";
    }
    return expression.slice(0, -1);
}

/**
 * Verifies if the last digit in the expression is a zero.
 * @param {string} expression - Which text should the function verify.
 * @returns {boolean} Whether is after zero or not.
 */
function isAfterZero(expression: string): boolean {
    return expression.charAt(expression.length - 1) === "0" &&
        expression.length === 1
        ? true
        : false;
}

/**
 * Verifies if the last digit in the expression is an operator.
 * @param {string} expression - Which text should the function verify.
 * @returns {boolean} Whether is after an operator or not.
 */
function isAfterOperator(expression: string): boolean {
    let isOperator = false;
    for (let i = 0; i < separators.length; i++) {
        if (expression.charAt(expression.length - 1) === separators[i]) {
            isOperator = true;
            break;
        } else {
            isOperator = false;
        }
    }
    return isOperator;
}

/**
 * Verifies if the value inserted is an operator.
 * @param {string} value - Which text should the function verify.
 * @returns {boolean} Whether is an operator or not.
 */
function isValueOperator(value: string): boolean {
    let isOperator = false;
    for (let i = 0; i < separators.length; i++) {
        if (value === separators[i]) {
            isOperator = true;
            break;
        } else {
            isOperator = false;
        }
    }
    return isOperator;
}

/**
 * Separates all the expressions on the screen in individual expressions.
 * This method does NOT account for operator preference, such as
 * x > +. It solves the expressions by order. It also adds an 0 to
 * the beginning of the expressions, case the first is a minus sign.
 * @param {string} expression - The expressions to be separated.
 * @returns {string[]} The collection of expressions.
 */
export function separateExpressions(expression: string): string[] {
    const substrings: string[] = [];
    let currentSubstring = "";

    for (let i = 0; i < expression.length; i++) {
        const character: string = expression[i];

        if (separators.includes(character)) {
            if (currentSubstring !== "") {
                substrings.push(currentSubstring);
                currentSubstring = "";
            }
            substrings.push(character);
            continue;
        }
        currentSubstring += character;
    }

    if (currentSubstring !== "") {
        substrings.push(currentSubstring);
    }

    if (substrings[0] === "-") {
        substrings.unshift("0");
    }

    return substrings;
}

/**
 * Takes out a single expression from the expression collection.
 * @param {string} expression - The array of expressions.
 * @param {number} interator - Which expression to take out.
 * @returns {string[]} The expression.
 */
function getSingleExpression(
    expression: string[],
    interator: number,
): string[] {
    return expression.splice(-3 + interator, interator);
}

/**
 * Calculates a sum, subtraction, multiplication or division of two numbers.
 * @param {number} number1 - The first number.
 * @param {string} operator - Which operation to make (+, -, * or /).
 * @param {number} number2 - The second number.
 * @returns {string} The result.
 */
function calculate(number1: number, operator: string, number2: number): string {
    switch (operator) {
        case "+":
            return String(number1 + number2);
        case "-":
            return String(number1 - number2);
        case "x":
            return String(number1 * number2);
        case "/":
            if (number1 === 0 && number2 === 0) {
                return "Indeterminate";
            }
            return number2 === 0 ? "Undefined" : String(number1 / number2);
        default:
            return "NaN";
    }
}
