"use strict";

const schoolCurriculum = {
    units: [
        {
            id: "unit-1",
            title: "Foundations and decisions",
            subtitle: "HTML structure, arithmetic, if/else, and comparisons.",
            checkpointId: "checkpoint-1"
        },
        {
            id: "unit-2",
            title: "Loops and strings",
            subtitle: "Positive-number checks, factorials, square sums, and text.",
            checkpointId: "checkpoint-2"
        },
        {
            id: "unit-3",
            title: "Arrays and nested loops",
            subtitle: "Classify, total, average, and generate multiplication tables.",
            checkpointId: "checkpoint-3"
        }
    ],

    lessons: [
        {
            id: "practical-html-structure",
            unitId: "unit-1",
            challengeId: "html-practical",
            title: "Build the practical HTML page",
            description: "Build the headings, formatting, lists, link, and marks table from your HTML practical.",
            concept: "HTML describes a page's structure. Use headings and paragraphs for text, lists for grouped items, tables for rows and columns, and links for navigation. The body contains visible page content.",
            exampleCode: `<h1>Student results</h1>
<p>Practical <strong>marks</strong> and 2<sup>3</sup></p>

<ol>
    <li>HTML</li>
    <li>JavaScript</li>
</ol>

<ul><li>HTML</li><li>JavaScript</li></ul>

<dl>
    <dt>HTML</dt>
    <dd>Structures a web page.</dd>
</dl>

<a href="#marks">View marks</a>
<table id="marks">
    <tr><th>Name</th><th>Score</th></tr>
    <tr><td>A learner</td><td>18</td></tr>
</table>`,
            question: "Which element contains the visible page content?",
            options: [
                { value: "head", label: "<head>" },
                { value: "body", label: "<body>" },
                { value: "title", label: "<title>" }
            ],
            answer: "body"
        },
        {
            id: "practical-operators",
            unitId: "unit-1",
            challengeId: "three-operations",
            title: "Sum, product, and average",
            description: "Use arithmetic operators and functions with three values.",
            concept: "The practical asks for three numbers, then uses + for the sum, * for the product, and division by 3 for the average. Number(prompt(...)) converts typed text to a number.",
            exampleCode: `const n1 = Number(prompt("Enter number 1"));
const n2 = Number(prompt("Enter number 2"));
const n3 = Number(prompt("Enter number 3"));

function sum() {
    return n1 + n2 + n3;
}

function average() {
    return (n1 + n2 + n3) / 3;
}`,
            question: "Which operator multiplies two numbers?",
            options: [
                { value: "+", label: "+" },
                { value: "*", label: "*" },
                { value: "%", label: "%" }
            ],
            answer: "*"
        },
        {
            id: "practical-even-odd",
            unitId: "unit-1",
            challengeId: "even-odd",
            title: "Check even or odd",
            description: "Use the remainder operator in an if/else decision.",
            concept: "Convert prompt text with Number, reject blank or non-numeric input, then check the remainder. Zero is a valid even number.",
            exampleCode: `function check(input) {
                if (input === null || String(input).trim() === "") return "INVALID";
    const number = Number(input);
    if (!Number.isFinite(number)) return "INVALID";
    if (number % 2 === 0) {
        return "EVEN";
    }
    return "ODD";
}`,
            question: "What is 7 % 2?",
            options: [
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "2", label: "2" }
            ],
            answer: "1"
        },
        {
            id: "practical-largest-three",
            unitId: "unit-1",
            challengeId: "largest-three",
            title: "Find the largest of three",
            description: "Compare three values and make sure ties still work.",
            concept: "Compare each value against the other two. Using >= handles equal values; a final else can cover the remaining case.",
            exampleCode: `function largest(a, b, c) {
    if (a >= b && a >= c) return a;
    if (b >= a && b >= c) return b;
    return c;
}`,
            question: "What should the program return for (8, 8, 3)?",
            options: [
                { value: "8", label: "8" },
                { value: "3", label: "3" },
                { value: "error", label: "An error" }
            ],
            answer: "8"
        },
        {
            id: "practical-positive-square",
            unitId: "unit-2",
            challengeId: "positive-square",
            title: "Square a positive number",
            description: "Combine a condition with multiplication.",
            concept: "The original practical squares a positive input and handles other values separately. This exercise returns null for zero or negative input so the behavior is easy to test.",
            exampleCode: `function squarePositive(number) {
    if (number > 0) {
        return number * number;
    }
    return null;
}`,
            question: "What is the square of 6?",
            options: [
                { value: "12", label: "12" },
                { value: "36", label: "36" },
                { value: "66", label: "66" }
            ],
            answer: "36"
        },
        {
            id: "practical-factorial",
            unitId: "unit-2",
            challengeId: "factorial",
            title: "Calculate a factorial",
            description: "Use a loop to multiply from n down to 1.",
            concept: "Factorial keeps a running product. Start at 1, multiply by each integer down to 1, and leave the result as 1 for 0!.",
            exampleCode: `function factorial(n) {
    let result = 1;
    for (let i = n; i >= 1; i--) {
        result *= i;
    }
    return result;
}`,
            question: "What is 0! (zero factorial)?",
            options: [
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "undefined", label: "undefined" }
            ],
            answer: "1"
        },
        {
            id: "practical-sum-squares",
            unitId: "unit-2",
            challengeId: "sum-squares",
            title: "Add the squares from 1 to n",
            description: "Accumulate i * i inside a counted loop.",
            concept: "The practical adds 1² + 2² + ... + 10². A loop counter starts at 1, the condition includes n, and the running total adds i * i on every pass.",
            exampleCode: `function sumSquares(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i * i;
    }
    return total;
}`,
            question: "Which condition includes n as the final value?",
            options: [
                { value: "i < n", label: "i < n" },
                { value: "i <= n", label: "i <= n" },
                { value: "i === n", label: "i === n" }
            ],
            answer: "i <= n"
        },
        {
            id: "practical-string-length",
            unitId: "unit-2",
            challengeId: "string-length",
            title: "Count characters in a string",
            description: "Read text and use its length property.",
            concept: "prompt() returns text. A string's .length property gives its character count, including spaces.",
            exampleCode: `const text = prompt("Enter your text");
const count = text.length;
document.write("Character count: " + count);`,
            question: "How many characters are in \"CS practical\"?",
            options: [
                { value: "11", label: "11" },
                { value: "12", label: "12" },
                { value: "13", label: "13" }
            ],
            answer: "12"
        },
        {
            id: "practical-array-even-odd",
            unitId: "unit-3",
            challengeId: "array-even-odd",
            title: "Classify even and odd array values",
            description: "Loop through an array and label every value.",
            concept: "First collect the array values, then loop from index 0 while index < array.length. Apply the same remainder check to each element.",
            exampleCode: `function classify(numbers) {
    const labels = [];
    for (let i = 0; i < numbers.length; i++) {
        labels.push(numbers[i] % 2 === 0 ? "EVEN" : "ODD");
    }
    return labels;
}`,
            question: "Which index is the first element of a JavaScript array?",
            options: [
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "-1", label: "-1" }
            ],
            answer: "0"
        },
        {
            id: "practical-sum-array",
            unitId: "unit-3",
            challengeId: "sum-array",
            title: "Find the sum of an array",
            description: "Use a zero-based loop and a running total.",
            concept: "Start the total at 0. Visit indices 0 through length - 1 exactly once, adding each element. Starting at 1 skips the first value.",
            exampleCode: `function sumArray(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}`,
            question: "What is the safest starting value for a sum?",
            options: [
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "numbers[0]", label: "numbers[0]" }
            ],
            answer: "0"
        },
        {
            id: "practical-average-array",
            unitId: "unit-3",
            challengeId: "array-average",
            title: "Average the values in an array",
            description: "Reuse the array sum and divide by the number of values.",
            concept: "Average = sum / count. The count is numbers.length, not the last index. An empty array has no average, so this course returns null for it.",
            exampleCode: `function average(numbers) {
    if (numbers.length === 0) return null;
    let total = 0;
    for (const number of numbers) total += number;
    return total / numbers.length;
}`,
            question: "For [4, 8, 12], what do you divide the sum by?",
            options: [
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "12", label: "12" }
            ],
            answer: "3"
        },
        {
            id: "practical-nested-loops",
            unitId: "unit-3",
            challengeId: "multiplication-table",
            title: "Generate a multiplication table",
            description: "Use nested loops to make rows and columns.",
            concept: "The outer loop controls the row. For every outer-loop pass, the inner loop visits each column. Small bounds make the table easier to inspect and test.",
            exampleCode: `function table(rows, columns) {
    const result = [];
    for (let row = 1; row <= rows; row++) {
        const values = [];
        for (let column = 1; column <= columns; column++) {
            values.push(row * column);
        }
        result.push(values);
    }
    return result;
}`,
            question: "How many times does the inner loop run for each row?",
            options: [
                { value: "once total", label: "Once total" },
                { value: "once per outer-loop pass", label: "Once per outer-loop pass" },
                { value: "only after the outer loop ends", label: "Only after the outer loop ends" }
            ],
            answer: "once per outer-loop pass"
        }
    ],

    challenges: {
        "html-practical": {
            title: "Create a practical results page",
            language: "html",
            description: "Build the structure, formatting, lists, link, and table from your HTML practical.",
            instructions: [
                "Add the html, head, and body elements.",
                "Add a heading, paragraph, and formatted text.",
                "Add ordered, unordered, and definition lists.",
                "Add a link and a table with headings and data."
            ],
            example: "A page with headings, formatted text, lists, a link, and a marks table.",
            hint: "A definition list uses <dl>, <dt>, and <dd>. A table uses <tr>, <th>, and <td>.",
            starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student results</title>
</head>
<body>
    <!-- Add your heading, paragraph, lists, and table -->
</body>
</html>`,
            testCases: [
                { label: "HTML page structure" },
                { label: "Heading and paragraph" },
                { label: "Ordered, unordered, and definition lists" },
                { label: "Text formatting" },
                { label: "Link" },
                { label: "Table with headings and data" }
            ],
            validate(code) {
                const markup = code.replace(/<!--[\s\S]*?-->/g, "");
                const documentPreview = new DOMParser().parseFromString(
                    markup,
                    "text/html"
                );
                const checks = [
                    /<html\b/i.test(markup) && /<head\b/i.test(markup) && /<body\b/i.test(markup),
                    Boolean(documentPreview.body.querySelector("h1,h2,h3,h4,h5,h6")) &&
                        Boolean(documentPreview.body.querySelector("p")),
                    Boolean(documentPreview.body.querySelector("ol")) &&
                        Boolean(documentPreview.body.querySelector("ul")) &&
                        Boolean(documentPreview.body.querySelector("dl dt")) &&
                        Boolean(documentPreview.body.querySelector("dl dd")),
                    Boolean(documentPreview.body.querySelector("strong,b,em,i,u,sup,sub,small")),
                    Boolean(documentPreview.body.querySelector("a[href]")),
                    Boolean(documentPreview.body.querySelector("table tr th")) &&
                        Boolean(documentPreview.body.querySelector("table tr td"))
                ];
                const passedTests = checks.findIndex(check => !check);
                return passedTests === -1
                    ? { success: true, passedTests: checks.length, message: "All HTML practical checks passed." }
                    : { success: false, passedTests, message: `Complete the ${this.testCases[passedTests].label.toLowerCase()} requirement.` };
            }
        },

        "three-operations": {
            title: "Calculate sum, product, and average",
            language: "javascript",
            functionName: "calculateValues",
            description: "Write calculateValues(a, b, c) and return an object with sum, product, and average.",
            instructions: [
                "Define calculateValues(a, b, c).",
                "Calculate the sum and product of all three values.",
                "Calculate their average by dividing the sum by 3.",
                "Return { sum, product, average }."
            ],
            example: "calculateValues(2, 3, 4) → { sum: 9, product: 24, average: 3 }",
            hint: "Keep the three arithmetic results in named properties of one returned object.",
            starterCode: `function calculateValues(a, b, c) {
    // Return an object with sum, product, and average
}`,
            testCases: [
                { label: "2, 3, 4" },
                { label: "1, 5, 9" },
                { label: "Negative input" }
            ],
            cases: [
                { input: [2, 3, 4], expected: { sum: 9, product: 24, average: 3 } },
                { input: [1, 5, 9], expected: { sum: 15, product: 45, average: 5 } },
                { input: [-2, 3, 4], expected: { sum: 5, product: -24, average: 5 / 3 } }
            ]
        },

        "even-odd": {
            title: "Check whether a number is even",
            language: "javascript",
            functionName: "classifyNumber",
            description: "Write classifyNumber(input), returning EVEN, ODD, or INVALID for blank or non-numeric input.",
            instructions: ["Use the remainder operator.", "Return EVEN for zero and other even integers.", "Return ODD for odd integers.", "Reject blank and non-numeric input."],
            example: 'classifyNumber("7") → "ODD"',
            hint: "Check for null, blank text, and non-finite numbers before using % 2.",
            starterCode: `function classifyNumber(input) {
    if (input === null || String(input).trim() === "") return "INVALID";
    const number = Number(input);
    if (!Number.isFinite(number)) return "INVALID";
    return number % 2 === 0 ? "EVEN" : "ODD";
}`,
            testCases: [
                { label: "Positive even" },
                { label: "Odd" },
                { label: "Zero" },
                { label: "Negative even" },
                { label: "Blank input" },
                { label: "Non-numeric input" },
                { label: "Cancelled input" }
            ],
            cases: [
                { input: [8], expected: "EVEN" },
                { input: [7], expected: "ODD" },
                { input: [0], expected: "EVEN" },
                { input: [-4], expected: "EVEN" },
                { input: [""], expected: "INVALID" },
                { input: ["not a number"], expected: "INVALID" },
                { input: [null], expected: "INVALID" }
            ]
        },

        "largest-three": {
            title: "Find the largest of three numbers",
            language: "javascript",
            functionName: "largestOfThree",
            description: "Write largestOfThree(a, b, c), including when two values tie.",
            instructions: ["Compare each value with the other two.", "Return the largest value.", "Use comparisons that handle ties."],
            example: "largestOfThree(8, 8, 3) → 8",
            hint: "Using >= instead of > makes equal maximum values work.",
            starterCode: `function largestOfThree(a, b, c) {
    // Return the largest value
}`,
            testCases: [{ label: "First number largest" }, { label: "Third number largest" }, { label: "Equal largest values" }, { label: "Negative numbers" }],
            cases: [
                { input: [9, 4, 2], expected: 9 },
                { input: [2, 4, 9], expected: 9 },
                { input: [8, 8, 3], expected: 8 },
                { input: [-2, -5, -1], expected: -1 }
            ]
        },

        "positive-square": {
            title: "Square a positive number",
            language: "javascript",
            functionName: "squarePositive",
            description: "Return n * n for positive n, and null for zero or negative input.",
            instructions: ["Check whether n is greater than zero.", "Return its square when positive.", "Return null otherwise."],
            example: "squarePositive(6) → 36",
            hint: "The positive check is n > 0; zero should take the other branch.",
            starterCode: `function squarePositive(n) {
    // Return n squared when positive; otherwise return null
}`,
            testCases: [{ label: "Positive input" }, { label: "Zero" }, { label: "Negative input" }],
            cases: [
                { input: [6], expected: 36 },
                { input: [0], expected: null },
                { input: [-3], expected: null }
            ]
        },

        factorial: {
            title: "Calculate a factorial",
            language: "javascript",
            functionName: "factorial",
            description: "Write factorial(n) for a non-negative integer.",
            instructions: ["Start a running product at 1.", "Multiply by every integer from n down to 1.", "Return 1 when n is 0."],
            example: "factorial(5) → 120",
            hint: "Use result = 1 so the loop naturally handles factorial(0).",
            starterCode: `function factorial(n) {
    // Multiply from n down to 1
}`,
            testCases: [{ label: "factorial(0)" }, { label: "factorial(1)" }, { label: "factorial(5)" }, { label: "factorial(6)" }],
            cases: [
                { input: [0], expected: 1 },
                { input: [1], expected: 1 },
                { input: [5], expected: 120 },
                { input: [6], expected: 720 }
            ],
            lessonId: "practical-factorial"
        },

        "sum-squares": {
            title: "Sum the squares from 1 to n",
            language: "javascript",
            functionName: "sumSquares",
            description: "Return 1² + 2² + ... + n² using a loop.",
            instructions: ["Start total at 0.", "Loop from 1 through n.", "Add i * i on each pass."],
            example: "sumSquares(3) → 14",
            hint: "For each i, add i * i (not just i).",
            starterCode: `function sumSquares(n) {
    let total = 0;
    // Add each square from 1 through n
    return total;
}`,
            testCases: [{ label: "sumSquares(0)" }, { label: "sumSquares(1)" }, { label: "sumSquares(3)" }, { label: "sumSquares(10)" }],
            cases: [
                { input: [0], expected: 0 },
                { input: [1], expected: 1 },
                { input: [3], expected: 14 },
                { input: [10], expected: 385 }
            ]
        },

        "string-length": {
            title: "Count the characters in a string",
            language: "javascript",
            functionName: "countCharacters",
            description: "Write countCharacters(text) using the string length property.",
            instructions: ["Accept a string named text.", "Return the number of characters.", "Spaces count as characters."],
            example: 'countCharacters("CS practical") → 12',
            hint: "Strings have a .length property.",
            starterCode: `function countCharacters(text) {
    // Return the number of characters
}`,
            testCases: [{ label: "Empty string" }, { label: "Word" }, { label: "Text with spaces" }, { label: "Punctuation" }],
            cases: [
                { input: [""], expected: 0 },
                { input: ["factorial"], expected: 9 },
                { input: ["CS practical"], expected: 12 },
                { input: ["a!?"], expected: 3 }
            ]
        },

        "array-even-odd": {
            title: "Classify every array value",
            language: "javascript",
            functionName: "classifyNumbers",
            description: "Return an array containing EVEN or ODD for each input value.",
            instructions: ["Visit every array element from index 0.", "Use % 2 to decide its label.", "Keep the labels in the original order."],
            example: 'classifyNumbers([2, 7, 0]) → ["EVEN", "ODD", "EVEN"]',
            hint: "The first array index is 0; loop while i < numbers.length.",
            starterCode: `function classifyNumbers(numbers) {
    const labels = [];
    // Add an EVEN or ODD label for every number
    return labels;
}`,
            testCases: [{ label: "Mixed values" }, { label: "Empty array" }, { label: "One value" }],
            cases: [
                { input: [[2, 7, 0, -3]], expected: ["EVEN", "ODD", "EVEN", "ODD"] },
                { input: [[]], expected: [] },
                { input: [[5]], expected: ["ODD"] }
            ]
        },

        "sum-array": {
            title: "Sum the values in an array",
            language: "javascript",
            functionName: "sumArray",
            description: "Write sumArray(numbers), adding every value exactly once.",
            instructions: ["Start total at 0.", "Loop from index 0 to numbers.length - 1.", "Return the total."],
            example: "sumArray([3, 4, 5]) → 12",
            hint: "Use i < numbers.length; do not start at index 1.",
            starterCode: `function sumArray(numbers) {
    let total = 0;
    // Add each value
    return total;
}`,
            testCases: [{ label: "Empty array" }, { label: "One value" }, { label: "Several values" }, { label: "Negative values" }],
            cases: [
                { input: [[]], expected: 0 },
                { input: [[7]], expected: 7 },
                { input: [[3, 4, 5]], expected: 12 },
                { input: [[-2, 5]], expected: 3 }
            ]
        },

        "array-average": {
            title: "Average the values in an array",
            language: "javascript",
            functionName: "averageArray",
            description: "Return the sum divided by the number of values; return null for an empty array.",
            instructions: ["Handle an empty array first.", "Add all values.", "Divide by numbers.length, not the last index."],
            example: "averageArray([4, 8, 12]) → 8",
            hint: "Three values have indices 0, 1, 2, but numbers.length is 3.",
            starterCode: `function averageArray(numbers) {
    // Return null for an empty array
    // Otherwise return the average
}`,
            testCases: [{ label: "Empty array" }, { label: "One value" }, { label: "Several values" }],
            cases: [
                { input: [[]], expected: null },
                { input: [[9]], expected: 9 },
                { input: [[4, 8, 12]], expected: 8 }
            ]
        },

        "multiplication-table": {
            title: "Create a multiplication table",
            language: "javascript",
            functionName: "multiplicationTable",
            description: "Return a 2D array for a table with the requested row and column counts.",
            instructions: ["Use an outer loop for rows.", "Use an inner loop for columns.", "Store each row as an array of products."],
            example: "multiplicationTable(2, 3) → [[1, 2, 3], [2, 4, 6]]",
            hint: "Create a fresh row array inside the outer loop.",
            starterCode: `function multiplicationTable(rows, columns) {
    const table = [];
    // Use nested loops to build the rows
    return table;
}`,
            testCases: [{ label: "2 rows by 3 columns" }, { label: "1 by 1" }, { label: "Empty dimensions" }],
            cases: [
                { input: [2, 3], expected: [[1, 2, 3], [2, 4, 6]] },
                { input: [1, 1], expected: [[1]] },
                { input: [0, 3], expected: [] }
            ]
        },

        "checkpoint-1-predict": {
            title: "Predict a running total",
            language: "javascript",
            functionName: "predictTotal",
            questionType: "PREDICT THE OUTPUT",
            assessmentTaskId: "checkpoint-1-predict",
            description: "Trace the loop and return the final value printed by the program.",
            instructions: ["Start total at 0.", "The loop adds i * 2 for i = 1, 2, 3, 4.", "Write predictTotal() so it returns the final total."],
            example: "0 + 2 + 4 + 6 + 8 → 20",
            hint: "Track both the loop counter and total on every pass.",
            starterCode: `function predictTotal() {
    // Return the value printed by:
    // let total = 0;
    // for (let i = 1; i <= 4; i++) total += i * 2;
}`,
            testCases: [{ label: "Final loop output" }],
            cases: [{ input: [], expected: 20 }]
        },
        "checkpoint-1-debug": {
            title: "Fix the even/odd practical",
            language: "javascript",
            functionName: "classifyNumber",
            questionType: "FIX THE BUG",
            assessmentTaskId: "checkpoint-1-debug",
            description: "The labels are reversed, and the input is not validated. Fix both issues.",
            instructions: ["Keep the function name.", "Correct the condition or returned labels.", "Check even, odd, zero, and invalid input."],
            example: 'classifyNumber(4) → "EVEN"',
            hint: "The branch for remainder 0 should return EVEN; blank and non-number input should be rejected.",
            starterCode: `function classifyNumber(n) {
    if (n === null || String(n).trim() === "") return "INVALID";
    const number = Number(n);
    if (!Number.isFinite(number)) return "INVALID";
    if (number % 2 === 0) {
        return "ODD"; // Bug: this label is wrong
    }
    return "EVEN";
}`,
            testCases: [{ label: "Even number" }, { label: "Odd number" }, { label: "Zero" }],
            cases: [
                { input: [4], expected: "EVEN" },
                { input: [7], expected: "ODD" },
                { input: [0], expected: "EVEN" },
                { input: [""], expected: "INVALID" },
                { input: ["not a number"], expected: "INVALID" }
            ]
        },
        "checkpoint-1-write": {
            title: "Write a largest-of-three function",
            language: "javascript",
            functionName: "largestOfThree",
            questionType: "WRITE A FUNCTION",
            assessmentTaskId: "checkpoint-1-write",
            description: "Write the practical from scratch. Return the largest of three values.",
            instructions: ["Define largestOfThree(a, b, c).", "Handle ties.", "Return the number, not a message."],
            example: "largestOfThree(3, 9, 5) → 9",
            hint: "Compare each candidate with both of the others.",
            starterCode: `function largestOfThree(a, b, c) {
    // Write your solution
}`,
            testCases: [{ label: "Largest first" }, { label: "Largest middle" }, { label: "Tie" }],
            cases: [
                { input: [9, 4, 2], expected: 9 },
                { input: [3, 9, 5], expected: 9 },
                { input: [7, 7, 2], expected: 7 }
            ]
        },
        "checkpoint-2-predict": {
            title: "Predict a factorial loop",
            language: "javascript",
            functionName: "predictFactorialOutput",
            questionType: "PREDICT THE OUTPUT",
            assessmentTaskId: "checkpoint-2-predict",
            description: "Trace the loop and return the final value of fact for n = 4.",
            instructions: ["fact starts at 1.", "The loop multiplies by 4, 3, 2, and 1.", "Write predictFactorialOutput() to return the final value."],
            example: "1 × 4 × 3 × 2 × 1 → 24",
            hint: "The first multiplication is 1 × 4; the loop stops after i reaches 1.",
            starterCode: `function predictFactorialOutput() {
    // Trace: for (let i = 4; i >= 1; i--) fact *= i;
}`,
            testCases: [{ label: "Final factorial output" }],
            cases: [{ input: [], expected: 24 }]
        },
        "checkpoint-2-debug": {
            title: "Fix the sum-of-squares loop",
            language: "javascript",
            functionName: "sumSquares",
            questionType: "FIX THE BUG",
            assessmentTaskId: "checkpoint-2-debug",
            description: "This loop adds i instead of i squared. Repair the practical.",
            instructions: ["Keep the function name.", "Add the square of every integer from 1 through n.", "Check the boundary values."],
            example: "sumSquares(3) → 1 + 4 + 9 = 14",
            hint: "The accumulated term should be i * i.",
            starterCode: `function sumSquares(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i; // Bug: add the square
    }
    return total;
}`,
            testCases: [{ label: "One term" }, { label: "Three terms" }, { label: "Ten terms" }],
            cases: [
                { input: [1], expected: 1 },
                { input: [3], expected: 14 },
                { input: [10], expected: 385 }
            ]
        },
        "checkpoint-2-write": {
            title: "Write the positive-square function",
            language: "javascript",
            functionName: "squarePositive",
            questionType: "WRITE A FUNCTION",
            assessmentTaskId: "checkpoint-2-write",
            description: "Write the practical function for squaring positive input.",
            instructions: ["Return n * n when n is positive.", "Return null for zero or negative input.", "Do not change the function name."],
            example: "squarePositive(5) → 25",
            hint: "Check n > 0 before multiplying.",
            starterCode: `function squarePositive(n) {
    // Write your solution
}`,
            testCases: [{ label: "Positive value" }, { label: "Zero" }, { label: "Negative value" }],
            cases: [
                { input: [5], expected: 25 },
                { input: [0], expected: null },
                { input: [-2], expected: null }
            ]
        },
        "checkpoint-3-predict": {
            title: "Predict a multiplication row",
            language: "javascript",
            functionName: "predictRow",
            questionType: "PREDICT THE OUTPUT",
            assessmentTaskId: "checkpoint-3-predict",
            description: "Trace the inner loop for row = 3 and return the values it prints for columns 1 through 4.",
            instructions: ["Each printed value is row * column.", "Return the values in order as an array.", "Write predictRow()."],
            example: "3 × 1, 3 × 2, 3 × 3, 3 × 4 → [3, 6, 9, 12]",
            hint: "The inner loop runs once for every column.",
            starterCode: `function predictRow() {
    // Return the four values printed for row 3
}`,
            testCases: [{ label: "Inner-loop output" }],
            cases: [{ input: [], expected: [3, 6, 9, 12] }]
        },
        "checkpoint-3-debug": {
            title: "Fix the array-sum practical",
            language: "javascript",
            functionName: "sumArray",
            questionType: "FIX THE BUG",
            assessmentTaskId: "checkpoint-3-debug",
            description: "The program skips the first value and overwrites the total. Fix both loop/accumulation mistakes.",
            instructions: ["Start at array index 0.", "Add each value to the running total.", "Return 0 for an empty array."],
            example: "sumArray([4, 5, 6]) → 15",
            hint: "Use i = 0, i < numbers.length, and total += numbers[i].",
            starterCode: `function sumArray(numbers) {
    let total = 0;
    for (let i = 1; i <= numbers.length; i++) {
        total =+ numbers[i]; // Two intentional bugs
    }
    return total;
}`,
            testCases: [{ label: "First element included" }, { label: "All values accumulated" }, { label: "Empty array" }],
            cases: [
                { input: [[4, 5, 6]], expected: 15 },
                { input: [[3, 10]], expected: 13 },
                { input: [[]], expected: 0 }
            ]
        },
        "checkpoint-3-write": {
            title: "Write the array-average practical",
            language: "javascript",
            functionName: "averageArray",
            questionType: "WRITE A FUNCTION",
            assessmentTaskId: "checkpoint-3-write",
            description: "Write a function that returns the average of the numbers in an array.",
            instructions: ["Return null for an empty array.", "Sum all values.", "Divide by the array length."],
            example: "averageArray([2, 4, 6]) → 4",
            hint: "After finding the total, divide it by numbers.length.",
            starterCode: `function averageArray(numbers) {
    // Write your solution
}`,
            testCases: [{ label: "Several values" }, { label: "One value" }, { label: "Empty array" }],
            cases: [
                { input: [[2, 4, 6]], expected: 4 },
                { input: [[9]], expected: 9 },
                { input: [[]], expected: null }
            ]
        }
    },

    checkpoints: [
        {
            id: "checkpoint-1",
            unitId: "unit-1",
            title: "Checkpoint 1 · Foundations",
            description: "Predict an output, fix an even/odd bug, and write a largest-number function.",
            taskIds: ["checkpoint-1-predict", "checkpoint-1-debug", "checkpoint-1-write"]
        },
        {
            id: "checkpoint-2",
            unitId: "unit-2",
            title: "Checkpoint 2 · Loops and strings",
            description: "Trace a factorial, repair a loop, and write a conditional function.",
            taskIds: ["checkpoint-2-predict", "checkpoint-2-debug", "checkpoint-2-write"]
        },
        {
            id: "checkpoint-3",
            unitId: "unit-3",
            title: "Checkpoint 3 · Arrays and nested loops",
            description: "Predict a nested-loop row, debug an array sum, and write an array average.",
            taskIds: ["checkpoint-3-predict", "checkpoint-3-debug", "checkpoint-3-write"]
        }
    ]
};
