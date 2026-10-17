"use strict";

const schoolCurriculum = {
    units: [
        {
            id: "unit-1",
            title: "HTML and decisions",
            subtitle: "HTML practicals, arithmetic, if/else, and comparisons.",
            checkpointId: "checkpoint-1"
        },
        {
            id: "unit-2",
            title: "Loops and strings",
            subtitle: "Positive numbers, factorials, square sums, and text.",
            checkpointId: "checkpoint-2"
        },
        {
            id: "unit-3",
            title: "Arrays and nested loops",
            subtitle: "Even/odd values, sums, averages, and multiplication tables.",
            checkpointId: "checkpoint-3"
        },
        {
            id: "unit-4",
            title: "Forms, styling, and animation",
            subtitle: "HTML forms, CSS tables and forms, and simple animations.",
            checkpointId: "checkpoint-4"
        }
    ],

    lessons: [
        {
            id: "practical-html-structure-ssc",
            unitId: "unit-1",
            challengeId: "html-practical",
            title: "Build the practical HTML page",
            description: "Practice the headings, formatting, lists, links, and table from your HTML practical.",
            concept: "The practical uses HTML tags to structure a page. The body contains visible content. Lists group items, links navigate to a page or section, and tables arrange information in rows and columns.",
            exampleCode: `<html>
<head>
<title>PRACTICALS</title>
</head>
<body>
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<p>This <b>text is bold</b>, this <strong>text is strong</strong>, and this <u>text is underlined</u>.</p>
<p><i>8<sup>2</sup> = 64</i></p>
<small>Small text</small>
<ol><li>Football</li><li>Programming</li></ol>
<ul><li>Football</li><li>Programming</li></ul>
<dl><dt>HTML</dt><dd>The structure of a web page.</dd></dl>
<a href="#marks">Marks</a>
<table id="marks"><tr><th>Name</th><th>Marks</th></tr><tr><td>A learner</td><td>18</td></tr></table>
</body>
</html>`,
            question: "Which element contains the visible page content?",
            options: [
                { value: "head", label: "<head>" },
                { value: "body", label: "<body>" },
                { value: "title", label: "<title>" }
            ],
            answer: "body"
        },
        {
            id: "practical-operators-ssc",
            unitId: "unit-1",
            challengeId: "three-operations",
            title: "Sum, product, and average",
            description: "Use the practical's three numbers and its sum, product, and average functions.",
            concept: "The program reads three numbers. Its sum(), product(), and avg() functions each calculate a result and display it with alert().",
            exampleCode: `let n1 = Number(prompt("Enter number 1"));
let n2 = Number(prompt("Enter number 2"));
let n3 = Number(prompt("Enter number 3"));

function sum() {
    let sum = n1 + n2 + n3;
    alert("sum is:" + sum);
}

function product() {
    let product = n1 * n2 * n3;
    alert("product is:" + product);
}

function avg() {
    let avg = (n1 + n2 + n3) / 3;
    alert("avg is:" + avg);
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
            id: "practical-even-odd-ssc",
            unitId: "unit-1",
            challengeId: "even-odd",
            title: "Check even or odd",
            description: "Read a number and use if/else with the remainder operator.",
            concept: "The practical converts the prompt input to a number. If its remainder after division by 2 is 0, it is even; otherwise it is odd.",
            exampleCode: `let no1;
no1 = Number(prompt("Enter your number"));

if (no1 % 2 === 0) {
    alert(no1 + " is the even");
} else {
    alert(no1 + " is the odd");
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
            id: "practical-largest-three-ssc",
            unitId: "unit-1",
            challengeId: "largest-three",
            title: "Find the largest of three",
            description: "Read three numbers and compare them with if/else.",
            concept: "The practical compares the first number with the other two, then the second with the other two. The final else handles the remaining case.",
            exampleCode: `let no1, no2, no3;
no1 = Number(prompt("Enter your 1st number"));
no2 = Number(prompt("Enter your 2nd number"));
no3 = Number(prompt("Enter your 3rd number"));

if (no1 > no2 && no1 > no3) {
    alert(no1 + " is the largest");
} else if (no2 > no1 && no2 > no3) {
    alert(no2 + " is the largest");
} else {
    alert(no3 + " is largest");
}`,
            question: "Which values are compared in no1 > no2 && no1 > no3?",
            options: [
                { value: "no1", label: "no1 with both no2 and no3" },
                { value: "no2", label: "no2 with itself" },
                { value: "no3", label: "the sum of all three" }
            ],
            answer: "no1"
        },
        {
            id: "practical-positive-square-ssc",
            unitId: "unit-2",
            challengeId: "positive-square",
            title: "Square a positive number",
            description: "Use the square() practical and its positive-number condition.",
            concept: "The practical's square() function reads a number, checks if it is greater than 0, multiplies it by itself, and displays the result with alert().",
            exampleCode: `function square() {
    let n = Number(prompt("Enter your number:"));
    if (n > 0) {
        let n2 = n * n;
        alert("The square of the positive number is: " + n2);
    } else {
        alert("Your number is negative");
    }
}`,
            question: "Which condition checks that n is positive?",
            options: [
                { value: "n > 0", label: "n > 0" },
                { value: "n < 0", label: "n < 0" },
                { value: "n === 0", label: "n === 0" }
            ],
            answer: "n > 0"
        },
        {
            id: "practical-factorial-ssc",
            unitId: "unit-2",
            challengeId: "factorial",
            title: "Calculate a factorial",
            description: "Use a for loop to multiply from the entered number down to 1.",
            concept: "The practical starts fact at 1. The loop counts down from the entered number to 1 and multiplies each value into fact.",
            exampleCode: `let a, i, fact = 1;
a = Number(prompt("Enter the number you want factorial of"));

for (i = a; i >= 1; i = i - 1) {
    fact = fact * i;
}

document.write("Factorial of " + a + " is " + fact);`,
            question: "What is fact after the loop for input 4?",
            options: [
                { value: "10", label: "10" },
                { value: "24", label: "24" },
                { value: "16", label: "16" }
            ],
            answer: "24"
        },
        {
            id: "practical-sum-squares-ssc",
            unitId: "unit-2",
            challengeId: "sum-squares",
            title: "Add the squares from 1 to n",
            description: "Use a loop and add i * i to a running sum.",
            concept: "The practical asks for a number, counts down to 1, and adds each number multiplied by itself to sum.",
            exampleCode: `let i, a, sum = 0;
a = Number(prompt("Enter the total numbers you want to sum the squares of"));

for (i = a; i >= 1; i = i - 1) {
    sum = sum + (i * i);
}

alert("Sum of squares from 1-" + a + " is: " + sum);`,
            question: "What is 3 * 3?",
            options: [
                { value: "6", label: "6" },
                { value: "9", label: "9" },
                { value: "33", label: "33" }
            ],
            answer: "9"
        },
        {
            id: "practical-string-length-ssc",
            unitId: "unit-2",
            challengeId: "string-length",
            title: "Count characters in a string",
            description: "Read text and use its length property.",
            concept: "prompt() reads text. The .length property gives the number of characters, including spaces.",
            exampleCode: `let i, j;
i = prompt("Enter your text");
j = i.length;
document.write("THE number of characters is" + j);`,
            question: "How many characters are in \"CS practical\"?",
            options: [
                { value: "11", label: "11" },
                { value: "12", label: "12" },
                { value: "13", label: "13" }
            ],
            answer: "12"
        },
        {
            id: "practical-array-even-odd-ssc",
            unitId: "unit-3",
            challengeId: "array-even-odd",
            title: "Classify even and odd array values",
            description: "Read an array and display whether each value is even or odd.",
            concept: "The practical first asks for the array size, then reads each element in a loop. A second loop checks each value with % 2.",
            exampleCode: `let i;
let a = Number(prompt("Enter size of array"));
let arr = [a];

for (i = 0; i < a; i = i + 1) {
    arr[i] = Number(prompt("Enter element: ", i));
}

for (i = 0; i < a; i = i + 1) {
    if (arr[i] % 2 === 0) {
        document.write(arr[i] + ": EVEN <br>");
    } else {
        document.write(arr[i] + ": ODD <br>");
    }
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
            id: "practical-sum-array-ssc",
            unitId: "unit-3",
            challengeId: "sum-array",
            title: "Find the sum of an array",
            description: "Read ten numbers and add them to a running sum.",
            concept: "The practical starts sum at 0. Each pass through the for loop reads one number and adds it to sum.",
            exampleCode: `let i, sum = 0;
let arr = [];

for (i = 1; i <= 10; i = i + 1) {
    arr[i] = Number(prompt("Enter number " + i));
    sum = sum + arr[i];
}

document.write("the sum is " + sum);`,
            question: "What is the starting value of sum?",
            options: [
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "10", label: "10" }
            ],
            answer: "0"
        },
        {
            id: "practical-average-array-ssc",
            unitId: "unit-3",
            challengeId: "array-average",
            title: "Find the average of an array",
            description: "Add ten numbers and divide their sum by ten.",
            concept: "The average is the sum divided by the number of values. This practical reads ten values, so divide by 10.",
            exampleCode: `let i, sum = 0;
let arr = [];

for (i = 1; i <= 10; i = i + 1) {
    arr[i] = Number(prompt("Enter number " + i));
    sum = sum + arr[i];
}

let avg = sum / 10;
document.write("Average of numbers " + arr + " is " + avg);`,
            question: "If ten numbers have a sum of 50, what do you divide by?",
            options: [
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "50", label: "50" }
            ],
            answer: "10"
        },
        {
            id: "practical-nested-loops-ssc",
            unitId: "unit-3",
            challengeId: "multiplication-table",
            title: "Generate a multiplication table",
            description: "Use nested loops to print a table of rows and columns.",
            concept: "The outer loop selects a row. For each outer-loop pass, the inner loop calculates and displays the products for that row.",
            exampleCode: `let i, j;
document.write("In columns and rows<br><br>");

for (i = 1; i <= 5; i = i + 1) {
    for (j = 1; j <= 10; j = j + 1) {
        document.write(i * j + ", ");
    }
    document.write("<br>");
}`,
            question: "When does the inner loop run?",
            options: [
                { value: "once per outer-loop pass", label: "Once per outer-loop pass" },
                { value: "only before the outer loop", label: "Only before the outer loop" },
                { value: "only after the outer loop", label: "Only after the outer loop" }
            ],
            answer: "once per outer-loop pass"
        },
        {
            id: "html-forms-basics",
            unitId: "unit-4",
            challengeId: "checkpoint-4-form-ssc",
            title: "Create an HTML form",
            description: "Practice the HTML input types, labels, buttons, drop-downs, and text areas.",
            concept: "A form groups information a user can enter. Input types include text, password, email, number, radio, checkbox, dates/times, color, range, search, telephone, URL, file, and buttons. Select, textarea, and button are additional form elements.",
            exampleCode: `<form>
    <label for="student-name">Name:</label>
    <input id="student-name" name="student-name" type="text">

                <label for="student-email">Email:</label>
                <input id="student-email" name="student-email" type="email">

                <label for="student-password">Password:</label>
    <input id="student-password" name="student-password" type="password">

    <label for="student-age">Age:</label>
    <input id="student-age" name="student-age" type="number">

    <label><input type="radio" name="shift" value="morning"> Morning</label>
    <label><input type="checkbox" name="subject" value="html"> HTML</label>
    <label for="student-date">Date:</label>
    <input id="student-date" name="student-date" type="date">
    <input name="student-time" type="time">
    <input name="student-datetime" type="datetime-local">
    <input name="student-month" type="month">
    <input name="student-week" type="week">
    <input name="student-color" type="color">
    <input name="student-range" type="range">
    <input name="student-search" type="search">
    <input name="student-phone" type="tel">
    <input name="student-website" type="url">
    <input name="student-file" type="file">
    <input name="student-hidden" type="hidden" value="class10">

    <label for="student-class">Class:</label>
    <select id="student-class" name="student-class">
        <option>Class 10</option>
    </select>

    <label for="student-note">Note:</label>
    <textarea id="student-note" name="student-note"></textarea>

    <input type="submit" value="Submit">
    <input type="reset" value="Clear">
    <input type="button" value="Click">
    <input type="image" src="submit.png" alt="Submit image">
    <button type="submit">Submit with button</button>
    <button type="reset">Clear with button</button>
    <button type="button">Another button</button>
</form>`,
            question: "Which input type hides the characters as a password is typed?",
            options: [
                { value: "text", label: "text" },
                { value: "password", label: "password" },
                { value: "checkbox", label: "checkbox" }
            ],
            answer: "password"
        },
        {
            id: "css-forms-tables",
            unitId: "unit-4",
            challengeId: "checkpoint-4-style-ssc",
            title: "Style forms and tables with CSS",
            description: "Add readable borders, spacing, colors, and sizes to form controls and table cells.",
            concept: "CSS selectors choose which elements to style. Borders outline form controls and table cells; padding adds space inside them. border-collapse combines adjacent table borders.",
            exampleCode: `form {
    padding: 16px;
    border: 1px solid #64748b;
}

input, button, select, textarea {
    margin: 6px;
    padding: 8px;
}

table {
    border-collapse: collapse;
}

th, td {
    border: 1px solid #64748b;
    padding: 8px;
}

th {
    background-color: #dbeafe;
}`,
            question: "Which CSS property adds space inside a border?",
            options: [
                { value: "padding", label: "padding" },
                { value: "margin", label: "margin" },
                { value: "color", label: "color" }
            ],
            answer: "padding"
        },
        {
            id: "css-animation-basics",
            unitId: "unit-4",
            challengeId: "checkpoint-4-animation-ssc",
            title: "Blink text and move a rotating square",
            description: "Use @keyframes and animation to blink text and move a square through a full turn.",
            concept: "@keyframes describes the start and end of an animation. The animation property chooses the keyframes and duration. opacity can make text appear to blink, while transform can move and rotate a square.",
            exampleCode: `.blink-text {
    animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
    to {
        visibility: hidden;
    }
}

.moving-square {
    width: 70px;
    height: 70px;
    background-color: royalblue;
    animation: moveAndTurn 3s linear infinite;
}

@keyframes moveAndTurn {
    from {
        transform: translateX(0) rotate(0deg);
    }
    to {
        transform: translateX(180px) rotate(360deg);
    }
}`,
            question: "Which transform value makes one complete turn?",
            options: [
                { value: "rotate(90deg)", label: "rotate(90deg)" },
                { value: "rotate(180deg)", label: "rotate(180deg)" },
                { value: "rotate(360deg)", label: "rotate(360deg)" }
            ],
            answer: "rotate(360deg)"
        }
    ],

    challenges: {
        "checkpoint-4-form-ssc": {
            title: "Build a student information form",
            language: "html",
            questionType: "BUILD A FORM",
            assessmentTaskId: "checkpoint-4-form-ssc",
            description: "Create a form with common input types, labels, a selection list, text area, and buttons.",
            instructions: [
                "Add text, password, email, number, radio, checkbox, and date inputs.",
                "Add a select menu, textarea, and clear labels.",
                "Add submit, reset, and button controls."
            ],
            example: "Use type=\"text\" for a name and type=\"password\" for a password.",
            hint: "A select menu contains option elements. A textarea is a separate form control.",
            starterCode: `<!DOCTYPE html>
<html>
<head><title>Student form</title></head>
<body>
    <form>
        <!-- Add labeled form inputs and buttons -->
    </form>
</body>
</html>`,
            testCases: [
                { label: "Form and labels" },
                { label: "Text, password, email, and number" },
                { label: "Radio and checkbox" },
                { label: "Date, time, color, range, search, tel, URL, file, and hidden inputs" },
                { label: "Select menu and text area" },
                { label: "Submit, reset, image, and button controls" }
            ],
            validate(code) {
                const parsed = new DOMParser().parseFromString(code, "text/html");
                const form = parsed.querySelector("form");
                const checks = [
                    Boolean(form && form.querySelector("label")),
                    ["text", "password", "email", "number"]
                        .every(type => Boolean(form?.querySelector(`input[type="${type}"]`))),
                    ["radio", "checkbox"]
                        .every(type => Boolean(form?.querySelector(`input[type="${type}"]`))),
                    ["date", "time", "datetime-local", "month", "week", "color", "range", "search", "tel", "url", "file", "hidden"]
                        .every(type => Boolean(form?.querySelector(`input[type="${type}"]`))),
                    Boolean(form?.querySelector("select option")) &&
                        Boolean(form?.querySelector("textarea")),
                    ["submit", "reset", "button"]
                        .every(type => Boolean(form?.querySelector(`input[type="${type}"]`))) &&
                        Boolean(form?.querySelector('input[type="image"]')) &&
                        Boolean(form?.querySelector("button"))
                ];
                const failedTest = checks.findIndex(check => !check);
                return failedTest === -1
                    ? { success: true, passedTests: checks.length, message: "All form practical checks passed." }
                    : { success: false, passedTests: failedTest, failedTest, message: `Add the required ${this.testCases[failedTest].label.toLowerCase()}.` };
            }
        },
        "checkpoint-4-style-ssc": {
            title: "Style forms and tables",
            language: "css",
            questionType: "STYLE FORMS AND TABLES",
            assessmentTaskId: "checkpoint-4-style-ssc",
            description: "Style form controls and table cells with borders, padding, and basic colors.",
            instructions: [
                "Add spacing and borders to the form and its inputs.",
                "Collapse table borders.",
                "Add borders and padding to table headings and cells."
            ],
            example: "table { border-collapse: collapse; }",
            hint: "The CSS preview contains a form, inputs, button, and a two-row table.",
            starterCode: `/* Style the form and its controls */

/* Style the table, headings, and cells */`,
            testCases: [
                { label: "Form controls styled" },
                { label: "Table borders collapsed" },
                { label: "Table cells have borders and padding" }
            ],
            validate(code) {
                const checks = [
                    /form\s*\{[^}]*border/i.test(code) &&
                        /input[^{}]*\{[^}]*padding/i.test(code) &&
                        /button[^{}]*\{/i.test(code),
                    /table\s*\{[^}]*border-collapse\s*:\s*collapse/i.test(code),
                    /th\s*,?\s*td\s*\{[^}]*border/i.test(code) &&
                        /th\s*,?\s*td\s*\{[^}]*padding/i.test(code)
                ];
                const failedTest = checks.findIndex(check => !check);
                return failedTest === -1
                    ? { success: true, passedTests: checks.length, message: "Form and table styles passed." }
                    : { success: false, passedTests: failedTest, failedTest, message: `Complete the ${this.testCases[failedTest].label.toLowerCase()} requirement.` };
            }
        },
        "checkpoint-4-animation-ssc": {
            title: "Animate blinking text and a moving square",
            language: "css",
            questionType: "ADD THE ANIMATIONS",
            assessmentTaskId: "checkpoint-4-animation-ssc",
            description: "Make the preview heading blink and move the square horizontally through one full rotation.",
            instructions: [
                "Add a blink animation to .blink-text.",
                "Define the blink keyframes.",
                "Animate .moving-square with translateX() and rotate(360deg)."
            ],
            example: ".moving-square { animation: moveAndTurn 3s linear infinite; }",
            hint: "Use @keyframes and transform in the ending keyframe.",
            starterCode: `/* Make the preview text blink */

/* Move and rotate the square */

/* Define the keyframes */`,
            testCases: [
                { label: "Blinking text animation" },
                { label: "Moving square animation" },
                { label: "Full 360 degree rotation" }
            ],
            validate(code) {
                const checks = [
                    /\.blink-text\s*\{[^}]*animation\s*:/i.test(code) &&
                        /@keyframes\s+\w+[\s\S]*visibility\s*:\s*hidden|@keyframes\s+\w+[\s\S]*opacity\s*:\s*0/i.test(code),
                    /\.moving-square\s*\{[^}]*animation\s*:/i.test(code) &&
                        /@keyframes\s+\w+[\s\S]*translateX\s*\(/i.test(code),
                    /rotate\s*\(\s*360deg\s*\)/i.test(code)
                ];
                const failedTest = checks.findIndex(check => !check);
                return failedTest === -1
                    ? { success: true, passedTests: checks.length, message: "Both CSS animations passed." }
                    : { success: false, passedTests: failedTest, failedTest, message: `Complete the ${this.testCases[failedTest].label.toLowerCase()} requirement.` };
            }
        },
        "html-practical": {
            title: "Create a practical HTML page",
            language: "html",
            description: "Build the headings, formatting, lists, link, and table from your practical.",
            instructions: [
                "Add the html, head, and body elements.",
                "Add headings, a paragraph, and formatted text.",
                "Add ordered, unordered, and definition lists.",
                "Add a link and a table with headings and data."
            ],
            example: "A page with headings, formatted text, lists, a link, and a table.",
            hint: "A definition list uses <dl>, <dt>, and <dd>. A table uses <tr>, <th>, and <td>.",
            starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Practicals</title>
</head>
<body>
    <!-- Add the practical HTML elements -->
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
                const documentPreview = new DOMParser().parseFromString(markup, "text/html");
                const checks = [
                    /<html\b/i.test(markup) && /<head\b/i.test(markup) && /<body\b/i.test(markup),
                    Boolean(documentPreview.body.querySelector("h1,h2,h3,h4,h5,h6")) &&
                        Boolean(documentPreview.body.querySelector("p")),
                    Boolean(documentPreview.body.querySelector("ol")) &&
                        Boolean(documentPreview.body.querySelector("ul")) &&
                        Boolean(documentPreview.body.querySelector("dl dt")) &&
                        Boolean(documentPreview.body.querySelector("dl dd")),
                    Boolean(documentPreview.body.querySelector("b,strong,u,i,em,sup,sub,small")),
                    Boolean(documentPreview.body.querySelector("a[href]")),
                    Boolean(documentPreview.body.querySelector("table tr th")) &&
                        Boolean(documentPreview.body.querySelector("table tr td"))
                ];
                const failedTest = checks.findIndex(check => !check);
                return failedTest === -1
                    ? { success: true, passedTests: checks.length, message: "All HTML practical checks passed." }
                    : { success: false, passedTests: failedTest, failedTest, message: `Complete the ${this.testCases[failedTest].label.toLowerCase()} requirement.` };
            }
        },
        "three-operations": {
            title: "Calculate sum, product, and average",
            language: "javascript",
            lessonId: "practical-operators-ssc",
            description: "Use the three functions from the practical to display each result.",
            instructions: [
                "Read three numbers with prompt() and Number().",
                "Use sum(), product(), and avg() as in the practical.",
                "Display each result with alert()."
            ],
            example: "For 2, 3, 4: sum 9, product 24, average 3.",
            hint: "Use + for sum, * for product, and divide the sum by 3 for the average.",
            starterCode: `let n1 = Number(prompt("Enter number 1"));
let n2 = Number(prompt("Enter number 2"));
let n3 = Number(prompt("Enter number 3"));

function sum() {
    let sum = n1 + n2 + n3;
    alert("sum is:" + sum);
}

function product() {
    let product = n1 * n2 * n3;
    alert("product is:" + product);
}

function avg() {
    let avg = (n1 + n2 + n3) / 3;
    alert("avg is:" + avg);
}

sum();
product();
avg();`,
            testCases: [{ label: "2, 3, 4" }, { label: "1, 5, 9" }],
            programCases: [
                { input: ["2", "3", "4"], expectedOutput: ["sum is:9", "product is:24", "avg is:3"] },
                { input: ["1", "5", "9"], expectedOutput: ["sum is:15", "product is:45", "avg is:5"] }
            ]
        },
        "even-odd": {
            title: "Check whether a number is even or odd",
            language: "javascript",
            lessonId: "practical-even-odd-ssc",
            description: "Use the practical's if/else and remainder check.",
            instructions: [
                "Read a number using Number(prompt(...)).",
                "Check if no1 % 2 is 0.",
                "Display the even or odd message with alert()."
            ],
            example: "Input 8 displays: 8 is the even",
            hint: "The remainder after dividing an even number by 2 is 0.",
            starterCode: `let no1;
no1 = Number(prompt("Enter your number"));

if (// Check if no1 is even) {
    // Display the even message
} else {
    // Display the odd message
}`,
            testCases: [{ label: "Even number" }, { label: "Odd number" }, { label: "Zero" }],
            programCases: [
                { input: ["8"], expectedOutput: ["8 is the even"] },
                { input: ["7"], expectedOutput: ["7 is the odd"] },
                { input: ["0"], expectedOutput: ["0 is the even"] }
            ]
        },
        "largest-three": {
            title: "Find the largest of three numbers",
            language: "javascript",
            lessonId: "practical-largest-three-ssc",
            description: "Read and compare three numbers as in the practical.",
            instructions: [
                "Read three numbers with prompt() and Number().",
                "Use if, else if, and else with && comparisons.",
                "Display which number is largest."
            ],
            example: "For 9, 4, 2, display: 9 is the largest",
            hint: "Compare each number with the other two.",
            starterCode: `let no1, no2, no3;
no1 = Number(prompt("Enter your 1st number"));
no2 = Number(prompt("Enter your 2nd number"));
no3 = Number(prompt("Enter your 3rd number"));

if (no1 > no2 && no1 > no3) {
    // Display no1 as the largest
} else if (no2 > no1 && no2 > no3) {
    // Display no2 as the largest
} else {
    // Display no3 as the largest
}`,
            testCases: [{ label: "First number largest" }, { label: "Second number largest" }, { label: "Third number largest" }],
            programCases: [
                { input: ["9", "4", "2"], expectedOutput: ["9 is the largest"] },
                { input: ["2", "9", "5"], expectedOutput: ["9 is the largest"] },
                { input: ["2", "4", "9"], expectedOutput: ["9 is largest"] }
            ]
        },
        "positive-square": {
            title: "Square a positive number",
            language: "javascript",
            lessonId: "practical-positive-square-ssc",
            description: "Complete the square() practical and run it for a positive number.",
            instructions: [
                "Define the square() function.",
                "Read the number with Number(prompt(...)).",
                "If n > 0, calculate n * n and display it with alert()."
            ],
            example: "For input 5, display: The square of the positive number is: 25",
            hint: "The square is the number multiplied by itself.",
            starterCode: `function square() {
    let n = Number(prompt("Enter your number:"));
    if (n > 0) {
        let n2 = n * n;
        alert("The square of the positive number is: " + n2);
    } else {
        alert("Your number is negative");
    }
}

square();`,
            testCases: [{ label: "Positive input" }],
            programCases: [
                { input: ["5"], expectedOutput: ["The square of the positive number is: 25"] }
            ]
        },
        factorial: {
            title: "Calculate a factorial",
            language: "javascript",
            lessonId: "practical-factorial-ssc",
            description: "Complete the countdown loop and display the factorial.",
            instructions: [
                "Start fact at 1.",
                "Count down from the entered number to 1.",
                "Multiply fact by i on every loop pass."
            ],
            example: "For input 4, the factorial is 24.",
            hint: "Use i = i - 1 to count down.",
            starterCode: `let a, i, fact = 1;
a = Number(prompt("Enter the number you want factorial of"));

for (i = a; i >= 1; i = i - 1) {
    // Multiply fact by i
}

document.write("factorial of " + a + " is " + fact);`,
            testCases: [{ label: "Factorial of 4" }, { label: "Factorial of 5" }],
            programCases: [
                { input: ["4"], expectedOutput: ["factorial of 4 is 24"] },
                { input: ["5"], expectedOutput: ["factorial of 5 is 120"] }
            ]
        },
        "sum-squares": {
            title: "Add the squares from 1 to n",
            language: "javascript",
            lessonId: "practical-sum-squares-ssc",
            description: "Use the practical's countdown loop to add each square.",
            instructions: [
                "Read a with Number(prompt(...)).",
                "Count down from a to 1.",
                "Add i * i to sum and display the answer."
            ],
            example: "For a = 3: 9 + 4 + 1 = 14",
            hint: "Add i * i on each pass, not just i.",
            starterCode: `let i, a, sum = 0;
a = Number(prompt("Enter the total numbers you want to sum the squares of"));

for (i = a; i >= 1; i = i - 1) {
    // Add i squared to sum
}

alert("Sum of squares from 1-" + a + " is: " + sum);`,
            testCases: [{ label: "Squares from 1 to 3" }, { label: "Squares from 1 to 5" }],
            programCases: [
                { input: ["3"], expectedOutput: ["Sum of squares from 1-3 is: 14"] },
                { input: ["5"], expectedOutput: ["Sum of squares from 1-5 is: 55"] }
            ]
        },
        "string-length": {
            title: "Count the characters in a string",
            language: "javascript",
            lessonId: "practical-string-length-ssc",
            description: "Use the practical's prompt, .length, and document.write().",
            instructions: [
                "Read the text with prompt().",
                "Set j to the text's .length.",
                "Display the character count with document.write()."
            ],
            example: '"CS practical" has 12 characters.',
            hint: "Spaces are characters too.",
            starterCode: `let i, j;
i = prompt("Enter your text");
// Set j to the number of characters
document.write("THE number of characters is" + j);`,
            testCases: [{ label: "Text with a space" }, { label: "One word" }],
            programCases: [
                { input: ["CS practical"], expectedOutput: ["THE number of characters is12"] },
                { input: ["factorial"], expectedOutput: ["THE number of characters is9"] }
            ]
        },
        "array-even-odd": {
            title: "Classify even and odd array values",
            language: "javascript",
            lessonId: "practical-array-even-odd-ssc",
            description: "Read an array, then display EVEN or ODD for every value.",
            instructions: [
                "Ask for the array size and read that many elements.",
                "Use a second loop to visit the elements.",
                "Use if/else with % 2 and display each label."
            ],
            example: "For values 2 and 7, display 2: EVEN and 7: ODD.",
            hint: "Use the loop counter i to select arr[i].",
            starterCode: `let i;
let a = Number(prompt("Enter size of array"));
let arr = [a];

for (i = 0; i < a; i = i + 1) {
    arr[i] = Number(prompt("Enter element: ", i));
}

for (i = 0; i < a; i = i + 1) {
    // Check arr[i] and display EVEN or ODD
}`,
            testCases: [{ label: "Even, odd, even" }, { label: "One odd value" }],
            programCases: [
                { input: ["3", "2", "7", "4"], expectedOutput: ["2: EVEN <br>", "7: ODD <br>", "4: EVEN <br>"] },
                { input: ["1", "5"], expectedOutput: ["5: ODD <br>"] }
            ]
        },
        "sum-array": {
            title: "Find the sum of an array",
            language: "javascript",
            lessonId: "practical-sum-array-ssc",
            description: "Read ten numbers and add them to sum.",
            instructions: [
                "Start sum at 0.",
                "Use a loop from 1 to 10.",
                "Read each value and add it to sum."
            ],
            example: "The sum of 1 through 10 is 55.",
            hint: "Use sum = sum + arr[i] inside the loop.",
            starterCode: `let i, sum = 0;
let arr = [];

for (i = 1; i <= 10; i = i + 1) {
    arr[i] = Number(prompt("Enter number " + i));
    // Add this value to sum
}

document.write("the sum is " + sum);`,
            testCases: [{ label: "Numbers 1 through 10" }, { label: "Ten zeroes" }],
            programCases: [
                { input: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], expectedOutput: ["the sum is 55"] },
                { input: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], expectedOutput: ["the sum is 0"] }
            ]
        },
        "array-average": {
            title: "Find the average of ten numbers",
            language: "javascript",
            lessonId: "practical-average-array-ssc",
            description: "Read ten numbers, add them, and display their average.",
            instructions: [
                "Read ten values in a for loop and add them to sum.",
                "Divide sum by 10 to find avg.",
                "Display the average with document.write()."
            ],
            example: "The average of 1 through 10 is 5.5.",
            hint: "Average = sum divided by the count of numbers.",
            starterCode: `let i, sum = 0;
let arr = [];

for (i = 1; i <= 10; i = i + 1) {
    arr[i] = Number(prompt("Enter number " + i));
    sum = sum + arr[i];
}

let avg = sum / 10;
document.write("Average of numbers " + arr + " is " + avg);`,
            testCases: [{ label: "Numbers 1 through 10" }, { label: "Ten twos" }],
            programCases: [
                { input: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], expectedOutput: ["Average of numbers ,1,2,3,4,5,6,7,8,9,10 is 5.5"] },
                { input: ["2", "2", "2", "2", "2", "2", "2", "2", "2", "2"], expectedOutput: ["Average of numbers ,2,2,2,2,2,2,2,2,2,2 is 2"] }
            ]
        },
        "multiplication-table": {
            title: "Create a multiplication table",
            language: "javascript",
            lessonId: "practical-nested-loops-ssc",
            description: "Use nested loops to display products in rows and columns.",
            instructions: [
                "Use i for the row and j for the column.",
                "Place the j loop inside the i loop.",
                "Display i * j for each pair."
            ],
            example: "For row 2, columns 1 to 3 display 2, 4, 6.",
            hint: "The inner loop runs for every pass of the outer loop.",
            starterCode: `let i, j;

for (i = 1; i <= 2; i = i + 1) {
    for (j = 1; j <= 3; j = j + 1) {
        // Display i multiplied by j
    }
}`,
            testCases: [{ label: "Two rows, three columns" }],
            programCases: [
                { input: [], expectedOutput: ["1, ", "2, ", "3, ", "2, ", "4, ", "6, "] }
            ]
        },
        "checkpoint-1-predict-ssc": {
            title: "Predict a running total",
            language: "javascript",
            questionType: "PREDICT THE OUTPUT",
            assessmentTaskId: "checkpoint-1-predict-ssc",
            description: "Trace this practical-style loop and check the final value it displays.",
            instructions: ["sum starts at 0.", "The loop adds i from 1 through 4.", "Use document.write() to display sum."],
            example: "0 + 1 + 2 + 3 + 4 = 10",
            hint: "Follow the loop one value of i at a time.",
            starterCode: `let i, sum = 0;
for (i = 1; i <= 4; i = i + 1) {
    sum = sum + i;
}
document.write(sum);`,
            testCases: [{ label: "Final loop output" }],
            programCases: [{ input: [], expectedOutput: ["10"] }]
        },
        "checkpoint-1-debug-ssc": {
            title: "Fix the even/odd practical",
            language: "javascript",
            questionType: "FIX THE BUG",
            assessmentTaskId: "checkpoint-1-debug-ssc",
            description: "The program displays the wrong label for even numbers. Fix the if/else.",
            instructions: ["Keep the prompt and remainder check.", "Fix which message each branch displays.", "Check an even and an odd value."],
            example: "Input 4 should display: 4 is the even",
            hint: "A remainder of 0 means the number is even.",
            starterCode: `let no1 = Number(prompt("Enter your number"));
if (no1 % 2 === 0) {
    alert(no1 + " is the odd");
} else {
    alert(no1 + " is the even");
}`,
            testCases: [{ label: "Even number" }, { label: "Odd number" }],
            programCases: [
                { input: ["4"], expectedOutput: ["4 is the even"] },
                { input: ["7"], expectedOutput: ["7 is the odd"] }
            ]
        },
        "checkpoint-1-write-ssc": {
            title: "Write the largest-number practical",
            language: "javascript",
            questionType: "WRITE THE PRACTICAL",
            assessmentTaskId: "checkpoint-1-write-ssc",
            description: "Write a program that reads three numbers and displays the largest.",
            instructions: ["Read three numbers using prompt() and Number().", "Compare them with if/else if/else.", "Display the largest number with alert()."],
            example: "For 3, 9, 5, display: 9 is the largest",
            hint: "Compare each number with both of the others using &&.",
            starterCode: `// Read three numbers and display the largest`,
            testCases: [{ label: "First is largest" }, { label: "Second is largest" }, { label: "Third is largest" }],
            programCases: [
                { input: ["9", "4", "2"], expectedOutput: ["9 is the largest"] },
                { input: ["3", "9", "5"], expectedOutput: ["9 is the largest"] },
                { input: ["3", "5", "9"], expectedOutput: ["9 is largest"] }
            ]
        },
        "checkpoint-2-predict-ssc": {
            title: "Predict a factorial loop",
            language: "javascript",
            questionType: "PREDICT THE OUTPUT",
            assessmentTaskId: "checkpoint-2-predict-ssc",
            description: "Trace the factorial loop for input 4 and check what it displays.",
            instructions: ["fact starts at 1.", "The loop counts down from 4 to 1.", "Display fact with document.write()."],
            example: "1 * 4 * 3 * 2 * 1 = 24",
            hint: "Multiply fact by i on every loop pass.",
            starterCode: `let n = Number(prompt("Enter a number"));
let i, fact = 1;
for (i = n; i >= 1; i = i - 1) {
    fact = fact * i;
}
document.write("Factorial of " + n + " is " + fact);`,
            testCases: [{ label: "Factorial of 4" }],
            programCases: [{ input: ["4"], expectedOutput: ["Factorial of 4 is 24"] }]
        },
        "checkpoint-2-debug-ssc": {
            title: "Fix the sum-of-squares loop",
            language: "javascript",
            questionType: "FIX THE BUG",
            assessmentTaskId: "checkpoint-2-debug-ssc",
            description: "This practical adds i instead of i * i. Fix the loop.",
            instructions: ["Keep the countdown loop.", "Add the square of i to sum.", "Check the result when a is 3."],
            example: "For 3, the sum is 9 + 4 + 1 = 14",
            hint: "The term to add is i * i.",
            starterCode: `let i, a = Number(prompt("Enter a number")), sum = 0;
for (i = a; i >= 1; i = i - 1) {
    sum = sum + i;
}
alert("Sum of squares from 1-" + a + " is: " + sum);`,
            testCases: [{ label: "Squares from 1 to 3" }],
            programCases: [{ input: ["3"], expectedOutput: ["Sum of squares from 1-3 is: 14"] }]
        },
        "checkpoint-2-write-ssc": {
            title: "Write the positive-square practical",
            language: "javascript",
            questionType: "WRITE THE PRACTICAL",
            assessmentTaskId: "checkpoint-2-write-ssc",
            description: "Write the square() practical for a positive number.",
            instructions: ["Define square().", "Read the number and check if it is greater than 0.", "Display its square with alert()."],
            example: "For input 5, display: The square of the positive number is: 25",
            hint: "Use n * n inside the positive-number branch.",
            starterCode: `// Write square() and call it`,
            testCases: [{ label: "Positive number" }],
            programCases: [{ input: ["5"], expectedOutput: ["The square of the positive number is: 25"] }]
        },
        "checkpoint-3-predict-ssc": {
            title: "Predict a multiplication row",
            language: "javascript",
            questionType: "PREDICT THE OUTPUT",
            assessmentTaskId: "checkpoint-3-predict-ssc",
            description: "Trace the inner loop for row 3 and check the values it displays.",
            instructions: ["The row number i is 3.", "The column number j goes from 1 through 4.", "Display i * j on every pass."],
            example: "3, 6, 9, 12",
            hint: "Multiply 3 by each value of j.",
            starterCode: `let i = 3, j;
for (j = 1; j <= 4; j = j + 1) {
    document.write(i * j + ", ");
}`,
            testCases: [{ label: "Values in the row" }],
            programCases: [{ input: [], expectedOutput: ["3, ", "6, ", "9, ", "12, "] }]
        },
        "checkpoint-3-debug-ssc": {
            title: "Fix the array-sum practical",
            language: "javascript",
            questionType: "FIX THE BUG",
            assessmentTaskId: "checkpoint-3-debug-ssc",
            description: "The loop overwrites sum instead of adding each value. Fix the accumulation.",
            instructions: ["Read ten values.", "Add each value to the running sum.", "Display the final sum."],
            example: "The sum of 1 through 10 is 55.",
            hint: "Use sum = sum + arr[i] so earlier values are kept.",
            starterCode: `let i, sum = 0;
let arr = [];
for (i = 1; i <= 10; i = i + 1) {
    arr[i] = Number(prompt("Enter number " + i));
    sum = arr[i];
}
document.write("the sum is " + sum);`,
            testCases: [{ label: "Numbers 1 through 10" }],
            programCases: [{
                input: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                expectedOutput: ["the sum is 55"]
            }]
        },
        "checkpoint-3-write-ssc": {
            title: "Write the array-average practical",
            language: "javascript",
            questionType: "WRITE THE PRACTICAL",
            assessmentTaskId: "checkpoint-3-write-ssc",
            description: "Write the practical that reads ten numbers and displays their average.",
            instructions: ["Read ten numbers and add them to sum.", "Divide sum by 10.", "Display the average with document.write()."],
            example: "The average of 1 through 10 is 5.5.",
            hint: "Use a for loop and calculate avg = sum / 10.",
            starterCode: `// Read ten numbers, find their average, and display it`,
            testCases: [{ label: "Numbers 1 through 10" }],
            programCases: [{
                input: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                expectedOutput: ["Average of numbers ,1,2,3,4,5,6,7,8,9,10 is 5.5"]
            }]
        }
    },

    checkpoints: [
        {
            id: "checkpoint-1",
            unitId: "unit-1",
            title: "Checkpoint 1 — HTML and decisions",
            taskIds: ["checkpoint-1-predict-ssc", "checkpoint-1-debug-ssc", "checkpoint-1-write-ssc"]
        },
        {
            id: "checkpoint-2",
            unitId: "unit-2",
            title: "Checkpoint 2 — loops and strings",
            taskIds: ["checkpoint-2-predict-ssc", "checkpoint-2-debug-ssc", "checkpoint-2-write-ssc"]
        },
        {
            id: "checkpoint-3",
            unitId: "unit-3",
            title: "Checkpoint 3 — arrays and nested loops",
            taskIds: ["checkpoint-3-predict-ssc", "checkpoint-3-debug-ssc", "checkpoint-3-write-ssc"]
        },
        {
            id: "checkpoint-4",
            unitId: "unit-4",
            title: "Checkpoint 4 — forms and CSS",
            description: "Build a form, style form controls and a table, and create the requested animations.",
            taskIds: [
                "checkpoint-4-form-ssc",
                "checkpoint-4-style-ssc",
                "checkpoint-4-animation-ssc"
            ]
        }
    ]
};
