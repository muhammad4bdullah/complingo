"use strict";

/* =========================================================
   CODEQUEST — APPLICATION ENGINE
   ========================================================= */

const CodeQuest = (() => {

    const STORAGE_KEY = "codequest.student.v1";

    const $ = (selector, root = document) =>
        root.querySelector(selector);

    const $$ = (selector, root = document) =>
        [...root.querySelectorAll(selector)];

    const escapeHTML = value =>
        String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);


    /* =====================================================
       STARTER CODE
       ===================================================== */

    const starterCode = {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Project</title>
</head>
<body>
  <h1>Hello, Programmer!</h1>
  <p>I am learning to build websites.</p>

  <button id="helloButton">Click me</button>

  <script>
    document.getElementById("helloButton")
      .addEventListener("click", function () {
        alert("Great job! Your JavaScript works.");
      });
  <\/script>
</body>
</html>`,

        css: `body {
  font-family: system-ui, sans-serif;
  padding: 30px;
  background: #f3f0ff;
  color: #25233b;
}

h1 {
  color: #7255d9;
}

button {
  padding: 12px 18px;
  border: none;
  border-radius: 9px;
  background: #7255d9;
  color: white;
  cursor: pointer;
}`,

        js: `console.log("Hello from JavaScript!");

const student = "Programmer";

console.log("Welcome, " + student);`
    };


    /* =====================================================
       CURRICULUM DATA
       Replace or extend this array with real practicals.
       ===================================================== */

    const lessons = [

        {
            id: "html-foundations",
            number: "01",
            title: "Your First Web Page",
            category: "HTML",
            icon: "🌐",
            difficulty: "Beginner",
            duration: "8 min",
            xp: 50,
            description:
                "Understand HTML documents, headings, paragraphs, and elements.",

            objective:
                "Create a basic HTML page and identify the purpose of its elements.",

            explanation:
                "HTML stands for HyperText Markup Language. It describes the structure of a web page. Browsers read HTML elements and use them to display headings, paragraphs, images, buttons, and other content.",

            example: `<h1>My First Page</h1>
<p>I am learning HTML.</p>
<button>Click me</button>`,

            callout:
                "Remember: HTML describes the content and structure of a page. CSS controls its appearance, while JavaScript adds behaviour.",

            steps: [
                {
                    heading: "1. The heading element",
                    text:
                        "The <h1> element represents the main heading. HTML also has <h2> through <h6> for different heading levels."
                },
                {
                    heading: "2. The paragraph element",
                    text:
                        "The <p> element represents a paragraph of text. Browsers normally display paragraphs as separate blocks."
                },
                {
                    heading: "3. Opening and closing tags",
                    text:
                        "Many HTML elements have an opening tag, content, and a closing tag. For example, <p>Hello</p>. Some elements, such as <img>, are void elements and do not have closing tags."
                }
            ],

            question: {
                prompt:
                    "Which HTML element is normally used for the main heading of a page?",

                options: [
                    "<paragraph>",
                    "<h1>",
                    "<heading>",
                    "<title-text>"
                ],

                correct: 1,

                explanation:
                    "Correct! The <h1> element represents the main heading in the page content. The <title> element serves a different purpose: it sets the document's title."
            },

            starter: {
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <h1>My First Page</h1>
  <p>I am learning HTML.</p>
</body>
</html>`,

                css: `body {
  font-family: system-ui, sans-serif;
  padding: 25px;
  color: #25233b;
}

h1 {
  color: #7255d9;
}`,

                js: `console.log("My first HTML lesson!");`
            }
        },


        {
            id: "css-styling",
            number: "02",
            title: "Make It Look Amazing",
            category: "CSS",
            icon: "🎨",
            difficulty: "Beginner",
            duration: "10 min",
            xp: 60,
            description:
                "Use CSS selectors, colours, spacing, and borders.",

            objective:
                "Style a web page by selecting elements and changing their appearance.",

            explanation:
                "CSS stands for Cascading Style Sheets. It controls how HTML content looks. A CSS rule contains a selector and a declaration block. Declarations contain property-value pairs.",

            example: `h1 {
  color: purple;
  font-size: 32px;
}

p {
  line-height: 1.8;
}`,

            callout:
                "A CSS declaration needs a property, a colon, a value, and usually a semicolon. Curly braces contain the declarations for a rule.",

            steps: [
                {
                    heading: "1. Select an element",
                    text:
                        "The selector h1 targets heading elements. The selector .card targets elements whose class includes card. The selector #main targets the element with the ID main."
                },
                {
                    heading: "2. Change a property",
                    text:
                        "The color property controls text colour. The background-color property controls the background. Properties such as padding and margin control spacing."
                },
                {
                    heading: "3. Read the rule",
                    text:
                        "In h1 { color: purple; }, h1 is the selector, color is the property, and purple is its value."
                }
            ],

            question: {
                prompt:
                    "Which CSS property changes the colour of text?",

                options: [
                    "font-background",
                    "text-style",
                    "color",
                    "foreground"
                ],

                correct: 2,

                explanation:
                    "Correct! The color property sets text colour. The background-color property controls the background instead."
            },

            starter: {
                html: `<main class="card">
  <h1>My Project</h1>
  <p>CSS makes websites beautiful.</p>
  <button>Explore</button>
</main>`,

                css: `body {
  font-family: system-ui, sans-serif;
  background: #f1efff;
  padding: 35px;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 15px;
}

h1 {
  color: #7255d9;
}`,

                js: `console.log("Ready to style!");`
            }
        },


        {
            id: "javascript-basics",
            number: "03",
            title: "Bring Pages to Life",
            category: "JavaScript",
            icon: "⚡",
            difficulty: "Beginner",
            duration: "12 min",
            xp: 70,
            description:
                "Learn variables, values, expressions, and console output.",

            objective:
                "Create variables, perform a calculation, and display a result.",

            explanation:
                "JavaScript is a programming language used to make web pages interactive. It can calculate values, respond to events, update HTML, and communicate with services.",

            example: `const firstNumber = 10;
const secondNumber = 5;

const total = firstNumber + secondNumber;

console.log(total);`,

            callout:
                "Use const when a variable binding will not be reassigned. Use let when it needs to be reassigned. Avoid var in new beginner examples unless you are studying older code.",

            steps: [
                {
                    heading: "1. Create a variable",
                    text:
                        "const firstNumber = 10; creates a binding named firstNumber with the value 10."
                },
                {
                    heading: "2. Calculate a result",
                    text:
                        "The + operator adds numbers. When used with strings, + can concatenate text instead."
                },
                {
                    heading: "3. Display the result",
                    text:
                        "console.log(total) writes the value to the developer console. In CodeQuest, the playground captures supported console output for learning."
                }
            ],

            question: {
                prompt:
                    "What will console.log(7 + 3) display?",

                options: [
                    "73",
                    "10",
                    "7 + 3",
                    "undefined"
                ],

                correct: 1,

                explanation:
                    "Correct! Both operands are numbers, so the + operator adds them to produce 10."
            },

            starter: {
                html: `<h1>JavaScript Lab</h1>
<p>Open the console in the playground to see your program's output.</p>`,

                css: `body {
  font-family: system-ui, sans-serif;
  padding: 25px;
  background: #f5f2ff;
}`,

                js: `const firstNumber = 7;
const secondNumber = 3;

const total = firstNumber + secondNumber;

console.log("The answer is:", total);`
            }
        },


        {
            id: "dom-events",
            number: "04",
            title: "Make Buttons Work",
            category: "JavaScript",
            icon: "🖱️",
            difficulty: "Beginner",
            duration: "12 min",
            xp: 80,
            description:
                "Learn DOM selection, event listeners, and interactive elements.",

            objective:
                "Make a button respond to a click and update page content.",

            explanation:
                "The Document Object Model, or DOM, represents the structure of a web page as objects that JavaScript can access and modify.",

            example: `const button = document.querySelector("#myButton");

button.addEventListener("click", function () {
  document.querySelector("#message").textContent =
    "You clicked the button!";
});`,

            callout:
                "An event listener waits for an event, such as a click. Its callback function runs when that event occurs.",

            steps: [
                {
                    heading: "1. Select an element",
                    text:
                        "document.querySelector() selects the first element matching a CSS selector. It returns null when no matching element exists."
                },
                {
                    heading: "2. Listen for a click",
                    text:
                        "addEventListener('click', callback) registers a function that runs when the element is clicked."
                },
                {
                    heading: "3. Change text safely",
                    text:
                        "textContent changes an element's text without interpreting that text as HTML markup."
                }
            ],

            question: {
                prompt:
                    "Which method registers a function to respond to a click event?",

                options: [
                    "document.changeClick()",
                    "element.addEventListener()",
                    "element.makeButton()",
                    "console.click()"
                ],

                correct: 1,

                explanation:
                    "Correct! addEventListener() registers an event handler for events such as click, input, and submit."
            },

            starter: {
                html: `<h1>Interactive Button</h1>

<p id="message">Press the button below.</p>

<button id="myButton">Click me</button>`,

                css: `body {
  font-family: system-ui, sans-serif;
  padding: 25px;
}

button {
  padding: 10px 15px;
  cursor: pointer;
}`,

                js: `const button = document.querySelector("#myButton");

button.addEventListener("click", function () {
  document.querySelector("#message").textContent =
    "You clicked the button!";
});`
            }
        },


        {
            id: "conditions",
            number: "05",
            title: "Teach Your Code to Decide",
            category: "JavaScript",
            icon: "🧠",
            difficulty: "Beginner",
            duration: "12 min",
            xp: 80,
            description:
                "Use conditions to make programs respond differently to different values.",

            objective:
                "Use if, else if, and else to choose between possible outcomes.",

            explanation:
                "Conditional statements let a program choose which code to run based on a condition. Comparisons such as ===, >, and < produce Boolean results.",

            example: `const marks = 75;

if (marks >= 50) {
  console.log("Pass");
} else {
  console.log("Try again");
}`,

            callout:
                "The comparison operator === checks strict equality. It is generally preferred over == because it does not perform the same implicit type conversions.",

            steps: [
                {
                    heading: "1. Check a condition",
                    text:
                        "if (marks >= 50) checks whether marks is greater than or equal to 50."
                },
                {
                    heading: "2. Choose the matching branch",
                    text:
                        "If the condition is true, the first block executes. Otherwise, the else block executes."
                },
                {
                    heading: "3. Test boundary values",
                    text:
                        "Try 49, 50, and 51. Boundary tests help confirm that the comparison matches the intended rule."
                }
            ],

            question: {
                prompt:
                    "If marks is 40, what does this program display? if (marks >= 50) { console.log('Pass'); } else { console.log('Try again'); }",

                options: [
                    "Pass",
                    "Try again",
                    "Both messages",
                    "Nothing"
                ],

                correct: 1,

                explanation:
                    "Correct! 40 is not greater than or equal to 50, so the else branch runs."
            },

            starter: {
                html: `<h1>Result Checker</h1>
<p>Change the marks variable in JavaScript to test different results.</p>`,

                css: `body {
  font-family: system-ui, sans-serif;
  padding: 25px;
}`,

                js: `const marks = 40;

if (marks >= 50) {
  console.log("Pass");
} else {
  console.log("Try again");
}`
            }
        },


        {
            id: "loops",
            number: "06",
            title: "Repeat Without Repeating Yourself",
            category: "JavaScript",
            icon: "🔁",
            difficulty: "Beginner",
            duration: "14 min",
            xp: 90,
            description:
                "Use loops to execute instructions repeatedly.",

            objective:
                "Write a for loop and predict how many times its body runs.",

            explanation:
                "Loops repeat code. A for loop is useful when you can express the starting condition, continuation condition, and update step.",

            example: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,

            callout:
                "A loop needs a sensible stopping condition. If the condition never becomes false, the loop can continue indefinitely.",

            steps: [
                {
                    heading: "1. Initialize",
                    text:
                        "let i = 1 creates the counter."
                },
                {
                    heading: "2. Check the condition",
                    text:
                        "i <= 5 means the loop continues while i is at most 5."
                },
                {
                    heading: "3. Update the counter",
                    text:
                        "i++ increases i by one after each iteration. The body therefore runs for i values 1, 2, 3, 4, and 5."
                }
            ],

            question: {
                prompt:
                    "How many times does for (let i = 0; i < 4; i++) run its body?",

                options: [
                    "3 times",
                    "4 times",
                    "5 times",
                    "It never runs"
                ],

                correct: 1,

                explanation:
                    "Correct! The values are 0, 1, 2, and 3. When i becomes 4, the condition i < 4 is false."
            },

            starter: {
                html: `<h1>Loop Lab</h1>
<p>Inspect the console output to see each iteration.</p>`,

                css: `body {
  font-family: system-ui, sans-serif;
  padding: 25px;
}`,

                js: `for (let i = 0; i < 4; i++) {
  console.log("Iteration:", i);
}`
            }
        }

    ];


    /* =====================================================
       CHALLENGE LIBRARY
       ===================================================== */

    const challenges = [

        {
            id: "challenge-heading",
            title: "Fix the Missing Heading",
            icon: "🐛",
            difficulty: "Easy",
            category: "Debugging",
            xp: 35,

            description:
                "The page should display a heading, but the HTML element is malformed.",

            question:
                "Repair the HTML so the heading appears correctly.",

            initial:
                `<h1>Welcome to CodeQuest</h2>`,

            solution:
                `<h1>Welcome to CodeQuest</h1>`,

            hint:
                "The opening and closing heading tags must match.",

            explanation:
                "The opening tag is h1, but the closing tag is h2. Change the closing tag to </h1>."
        },


        {
            id: "challenge-css",
            title: "Repair the CSS Rule",
            icon: "🎨",
            difficulty: "Easy",
            category: "Debugging",
            xp: 35,

            description:
                "A heading should be purple, but the CSS declaration contains an error.",

            question:
                "Fix the CSS so the h1 text becomes purple.",

            initial:
                `h1 {
  color purple;
}`,

            solution:
                `h1 {
  color: purple;
}`,

            hint:
                "A CSS declaration separates the property and value with a colon.",

            explanation:
                "CSS declarations use property: value;. The missing colon prevents the intended declaration from being parsed correctly."
        },


        {
            id: "challenge-js",
            title: "Repair the Calculation",
            icon: "⚡",
            difficulty: "Medium",
            category: "Debugging",
            xp: 45,

            description:
                "The program should add two numbers, but the expression is incomplete.",

            question:
                "Make the program calculate and print 15.",

            initial:
                `const a = 10;
const b = 5;

console.log(a - b);`,

            solution:
                `const a = 10;
const b = 5;

console.log(a + b);`,

            hint:
                "The subtraction operator produces 5. Which operator adds numbers?",

            explanation:
                "Replace - with +. The result of 10 + 5 is 15."
        }

    ];


    /* =====================================================
       ASSESSMENT BANK
       ===================================================== */

    const assessmentQuestions = [

        {
            id: "a1",
            type: "mcq",
            topic: "HTML",
            marks: 2,

            prompt:
                "Which element contains the visible content of an ordinary HTML page?",

            options: [
                "<head>",
                "<body>",
                "<meta>",
                "<title>"
            ],

            answer: 1,

            explanation:
                "The body element contains the document's main visible content."
        },

        {
            id: "a2",
            type: "mcq",
            topic: "CSS",
            marks: 2,

            prompt:
                "Which selector targets an element with id=\"main\"?",

            options: [
                ".main",
                "main",
                "#main",
                "*main"
            ],

            answer: 2,

            explanation:
                "The # selector targets an ID. The . selector targets a class."
        },

        {
            id: "a3",
            type: "output",
            topic: "JavaScript",
            marks: 2,

            prompt:
                "What does console.log(4 + 6 * 2) print?",

            options: [
                "20",
                "16",
                "14",
                "40"
            ],

            answer: 1,

            explanation:
                "Multiplication has higher precedence than addition. 6 × 2 = 12, then 4 + 12 = 16."
        },

        {
            id: "a4",
            type: "mcq",
            topic: "JavaScript",
            marks: 2,

            prompt:
                "Which operator checks strict equality?",

            options: [
                "=",
                "==",
                "===",
                "!="
            ],

            answer: 2,

            explanation:
                "=== checks equality without the implicit type conversion associated with ==."
        },

        {
            id: "a5",
            type: "output",
            topic: "JavaScript",
            marks: 2,

            prompt:
                "What is printed by this code?\n\nlet total = 0;\nfor (let i = 1; i <= 3; i++) total += i;\nconsole.log(total);",

            options: [
                "3",
                "5",
                "6",
                "123"
            ],

            answer: 2,

            explanation:
                "The loop adds 1, then 2, then 3. The total is 6."
        },

        {
            id: "a6",
            type: "mcq",
            topic: "HTML",
            marks: 2,

            prompt:
                "Which attribute supplies alternative text for an image?",

            options: [
                "title",
                "alt",
                "src",
                "label"
            ],

            answer: 1,

            explanation:
                "The alt attribute provides a text alternative for an image."
        },

        {
            id: "a7",
            type: "mcq",
            topic: "CSS",
            marks: 2,

            prompt:
                "Which property adds space inside an element's border?",

            options: [
                "margin",
                "padding",
                "outline",
                "gap"
            ],

            answer: 1,

            explanation:
                "Padding is space inside the border. Margin is space outside the border."
        },

        {
            id: "a8",
            type: "output",
            topic: "JavaScript",
            marks: 2,

            prompt:
                "What is printed by console.log(typeof 42)?",

            options: [
                "\"integer\"",
                "\"number\"",
                "\"string\"",
                "\"object\""
            ],

            answer: 1,

            explanation:
                "JavaScript's typeof operator returns the string \"number\" for the numeric value 42."
        },

        {
            id: "a9",
            type: "mcq",
            topic: "JavaScript",
            marks: 2,

            prompt:
                "Which method safely changes the text content of a selected DOM element?",

            options: [
                "element.textContent",
                "element.console()",
                "element.clickText()",
                "element.printHTML()"
            ],

            answer: 0,

            explanation:
                "The textContent property reads or changes an element's text."
        },

        {
            id: "a10",
            type: "mcq",
            topic: "JavaScript",
            marks: 2,

            prompt:
                "What is the main purpose of addEventListener()?",

            options: [
                "Create CSS files",
                "Register an event handler",
                "Declare a constant",
                "Compile HTML"
            ],

            answer: 1,

            explanation:
                "addEventListener() registers a function to respond to a particular event."
        }

    ];


    /* =====================================================
       INITIAL STUDENT STATE
       ===================================================== */

    function createDefaultState() {
        return {
            name: "Explorer",
            xp: 0,
            streak: 0,
            lastVisit: null,

            completedLessons: [],
            lessonBest: {},

            completedChallenges: [],
            challengeBest: {},

            achievements: [],
            quizBest: null,
            quizHistory: [],

            skills: {
                HTML: { correct: 0, total: 0 },
                CSS: { correct: 0, total: 0 },
                JavaScript: { correct: 0, total: 0 },
                Debugging: { correct: 0, total: 0 },
                Assessment: { correct: 0, total: 0 }
            },

            dailyDate: null,
            dailyCompleted: [],

            sessionStarted: false
        };
    }


    function normalizeState(saved) {
        const defaults = createDefaultState();

        const state = {
            ...defaults,
            ...saved
        };

        state.skills = {
            ...defaults.skills,
            ...(saved.skills || {})
        };

        for (const key of Object.keys(defaults.skills)) {
            state.skills[key] = {
                ...defaults.skills[key],
                ...(saved.skills?.[key] || {})
            };
        }

        state.completedLessons =
            Array.isArray(saved.completedLessons)
                ? saved.completedLessons
                : [];

        state.completedChallenges =
            Array.isArray(saved.completedChallenges)
                ? saved.completedChallenges
                : [];

        state.achievements =
            Array.isArray(saved.achievements)
                ? saved.achievements
                : [];

        state.quizHistory =
            Array.isArray(saved.quizHistory)
                ? saved.quizHistory
                : [];

        state.lessonBest = saved.lessonBest || {};
        state.challengeBest = saved.challengeBest || {};

        state.dailyCompleted =
            Array.isArray(saved.dailyCompleted)
                ? saved.dailyCompleted
                : [];

        state.xp = Math.max(0, Number(state.xp) || 0);
        state.streak = Math.max(0, Number(state.streak) || 0);

        return state;
    }


    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);

            if (!raw) {
                return createDefaultState();
            }

            return normalizeState(JSON.parse(raw));

        } catch (error) {
            console.warn("CodeQuest could not load saved progress.", error);
            return createDefaultState();
        }
    }


    let state = loadState();

    let currentView = "dashboard";
    let currentLesson = null;
    let currentChallenge = null;

    let lessonAnswered = false;
    let challengeChecked = false;

    let activeAssessment = null;
    let assessmentIndex = 0;
    let assessmentAnswers = {};

    let currentEditorTab = "html";

    let editorCode = { ...starterCode };

    let challengeAttempts = 0;


    /* =====================================================
       PERSISTENCE
       ===================================================== */

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

            return true;

        } catch (error) {
            console.warn("CodeQuest could not save progress.", error);

            return false;
        }
    }


    /* =====================================================
       DATE AND PROGRESS UTILITIES
       ===================================================== */

    function localDateKey(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    function daysBetween(first, second) {
        const a = new Date(`${first}T12:00:00`);
        const b = new Date(`${second}T12:00:00`);

        return Math.round((b - a) / 86400000);
    }


    function initializeVisit() {
        const today = localDateKey();

        if (state.lastVisit !== today) {
            if (state.lastVisit) {
                const difference = daysBetween(state.lastVisit, today);

                if (difference === 1) {
                    state.streak += 1;
                } else if (difference > 1) {
                    state.streak = 1;
                }
            } else {
                state.streak = 1;
            }

            state.lastVisit = today;
        }

        if (state.dailyDate !== today) {
            state.dailyDate = today;
            state.dailyCompleted = [];
        }

        saveState();
    }


    function completedLessonCount() {
        return lessons.filter(lesson =>
            state.completedLessons.includes(lesson.id)
        ).length;
    }


    function completedChallengeCount() {
        return challenges.filter(challenge =>
            state.completedChallenges.includes(challenge.id)
        ).length;
    }


    function levelForXP(xp = state.xp) {
        return Math.floor(Math.max(0, xp) / 200) + 1;
    }


    function levelProgress() {
        return state.xp % 200;
    }


    function mastery(topic) {
        const skill = state.skills[topic];

        if (!skill || skill.total === 0) {
            return 0;
        }

        return Math.round((skill.correct / skill.total) * 100);
    }


    function trackAnswer(topic, correct) {
        if (!state.skills[topic]) {
            state.skills[topic] = { correct: 0, total: 0 };
        }

        state.skills[topic].total += 1;

        if (correct) {
            state.skills[topic].correct += 1;
        }

        saveState();
    }


    function dailyProgress() {
        return Math.min(100, state.dailyCompleted.length * 50);
    }


    function completeDailyTask(taskId) {
        if (!state.dailyCompleted.includes(taskId)) {
            state.dailyCompleted.push(taskId);
            saveState();
        }
    }


    /* =====================================================
       NOTIFICATIONS
       ===================================================== */

    function toast(message, type = "success") {
        const container = $("#toastContainer");

        const item = document.createElement("div");

        item.className = `toast ${type}`;
        item.textContent = message;

        container.appendChild(item);

        window.setTimeout(() => {
            item.remove();
        }, 3600);
    }


    function celebrate(title, message, icon = "🏆") {
        const overlay = $("#celebrationOverlay");

        overlay.replaceChildren();

        const banner = document.createElement("div");

        banner.className = "celebration-banner";

        const symbol = document.createElement("div");
        symbol.className = "celebration-icon";
        symbol.textContent = icon;

        const heading = document.createElement("h2");
        heading.textContent = title;

        const description = document.createElement("p");
        description.textContent = message;

        banner.append(symbol, heading, description);
        overlay.appendChild(banner);

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const colors = [
                "#a78bfa",
                "#65d9ee",
                "#65dfa6",
                "#f5cb70",
                "#f38ab9"
            ];

            for (let i = 0; i < 38; i++) {
                const piece = document.createElement("span");

                piece.className = "confetti-piece";
                piece.style.left = `${Math.random() * 100}%`;
                piece.style.background =
                    colors[Math.floor(Math.random() * colors.length)];

                piece.style.animationDelay = `${Math.random() * 0.7}s`;

                overlay.appendChild(piece);
            }
        }

        window.setTimeout(() => {
            overlay.replaceChildren();
        }, 3000);
    }


    /* =====================================================
       XP AND ACHIEVEMENTS
       ===================================================== */

    const achievementDefinitions = [

        {
            id: "first-step",
            title: "First Steps",
            icon: "🌱",
            description: "Complete your first lesson.",
            condition: () => state.completedLessons.length >= 1
        },

        {
            id: "html-explorer",
            title: "HTML Explorer",
            icon: "🌐",
            description: "Complete the HTML foundations lesson.",
            condition: () =>
                state.completedLessons.includes("html-foundations")
        },

        {
            id: "style-artist",
            title: "Style Artist",
            icon: "🎨",
            description: "Complete the CSS lesson.",
            condition: () =>
                state.completedLessons.includes("css-styling")
        },

        {
            id: "javascript-initiate",
            title: "JavaScript Initiate",
            icon: "⚡",
            description: "Complete the JavaScript fundamentals lesson.",
            condition: () =>
                state.completedLessons.includes("javascript-basics")
        },

        {
            id: "bug-hunter",
            title: "Bug Hunter",
            icon: "🐛",
            description: "Successfully fix a coding challenge.",
            condition: () => state.completedChallenges.length >= 1
        },

        {
            id: "three-lessons",
            title: "Knowledge Builder",
            icon: "📚",
            description: "Complete three different lessons.",
            condition: () => state.completedLessons.length >= 3
        },

        {
            id: "assessment-ready",
            title: "Assessment Ready",
            icon: "📝",
            description: "Finish a complete assessment.",
            condition: () => state.quizHistory.length >= 1
        },

        {
            id: "perfect-quiz",
            title: "Perfect Run",
            icon: "💎",
            description: "Earn full marks on an assessment.",
            condition: () =>
                state.quizBest !== null &&
                state.quizBest.percentage === 100
        },

        {
            id: "xp-500",
            title: "Rising Star",
            icon: "🚀",
            description: "Earn 500 XP.",
            condition: () => state.xp >= 500
        }

    ];


    function awardXP(amount, reason) {
        const previousLevel = levelForXP();

        state.xp += amount;

        saveState();

        updateTopbar();

        const newLevel = levelForXP();

        toast(`+${amount} XP · ${reason}`);

        if (newLevel > previousLevel) {
            celebrate(
                `Level ${newLevel}!`,
                "Your programming journey keeps growing.",
                "🚀"
            );
        }

        checkAchievements();
    }


    function checkAchievements() {
        let changed = false;

        for (const definition of achievementDefinitions) {
            if (
                !state.achievements.includes(definition.id) &&
                definition.condition()
            ) {
                state.achievements.push(definition.id);

                changed = true;

                celebrate(
                    "Achievement unlocked!",
                    definition.title,
                    definition.icon
                );
            }
        }

        if (changed) {
            saveState();
        }
    }


    /* =====================================================
       TOPBAR
       ===================================================== */

    const viewNames = {
        dashboard: "Dashboard",
        learn: "Learning path",
        lesson: "Lesson",
        playground: "Code playground",
        challenges: "Challenges",
        challenge: "Challenge",
        assessment: "PBA assessment",
        achievements: "Achievements"
    };


    function updateTopbar() {
        $("#topXP").textContent = `${state.xp} XP`;
        $("#streakValue").textContent = state.streak;

        $("#profileButton").textContent =
            state.name.trim().slice(0, 2).toUpperCase() || "CQ";

        $("#breadcrumbCurrent").textContent =
            viewNames[currentView] || "Dashboard";
    }


    function updateNavigation() {
        $$(".nav-item").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.view === currentView ||
                (currentView === "lesson" && button.dataset.view === "learn") ||
                (currentView === "challenge" && button.dataset.view === "challenges")
            );
        });
    }


    /* =====================================================
       VIEW ROUTER
       ===================================================== */

    function navigate(view) {
        currentView = view;

        $("#sidebar").classList.remove("open");

        $("#menuToggle").setAttribute("aria-expanded", "false");

        updateTopbar();
        updateNavigation();

        switch (view) {
            case "dashboard":
                renderDashboard();
                break;

            case "learn":
                renderLearningPath();
                break;

            case "lesson":
                renderLesson();
                break;

            case "playground":
                renderPlayground();
                break;

            case "challenges":
                renderChallenges();
                break;

            case "challenge":
                renderChallenge();
                break;

            case "assessment":
                renderAssessment();
                break;

            case "achievements":
                renderAchievements();
                break;

            default:
                currentView = "dashboard";
                renderDashboard();
        }

        updateTopbar();

        $("#viewContainer").scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            block: "start"
        });
    }


    /* =====================================================
       DASHBOARD
       ===================================================== */

    function renderDashboard() {
        const completed = completedLessonCount();

        const progress = Math.round(
            (completed / lessons.length) * 100
        );

        const nextLesson =
            lessons.find(lesson =>
                !state.completedLessons.includes(lesson.id)
            ) || lessons[lessons.length - 1];

        const skillTopics = ["HTML", "CSS", "JavaScript", "Debugging"];

        $("#viewContainer").innerHTML = `

            <section class="welcome-row">

                <div>
                    <div class="eyebrow">YOUR PROGRAMMING ADVENTURE</div>

                    <h1 class="page-heading">
                        Welcome back, ${escapeHTML(state.name)} 👋
                    </h1>

                    <p class="page-description">
                        Every great developer started somewhere.
                        Today is another chance to build something brilliant.
                    </p>
                </div>

                <button class="button button-ghost" data-action="open-profile">
                    ✎ Edit profile
                </button>

            </section>


            <section class="hero-banner">

                <div class="hero-content">

                    <div class="eyebrow">YOUR NEXT QUEST AWAITS</div>

                    <h1>
                        Learn to code.<br>
                        <span>One quest at a time.</span>
                    </h1>

                    <p>
                        Master HTML, CSS and JavaScript through interactive
                        lessons, real code, debugging and practical challenges.
                    </p>

                    <div class="hero-actions">

                        <button
                            class="button button-primary"
                            data-action="open-next-lesson"
                        >
                            ${completed === lessons.length
                                ? "Review lessons →"
                                : "Continue learning →"}
                        </button>

                        <button
                            class="button button-ghost"
                            data-view="playground"
                        >
                            &lt;/&gt; Open playground
                        </button>

                    </div>

                </div>

                <div class="hero-art" aria-hidden="true">
                    <div class="orbit"></div>
                    <div class="hero-code-symbol">&lt;/&gt;</div>
                </div>

            </section>


            <section class="stats-grid">

                <article class="stat-card">
                    <div class="stat-top">
                        <span class="stat-icon">✦</span>
                        <span class="badge badge-accent">
                            LEVEL ${levelForXP()}
                        </span>
                    </div>

                    <div class="stat-number">${state.xp}</div>
                    <div class="stat-label">Total experience points</div>

                    <div class="progress-track" style="margin-top:13px">
                        <div
                            class="progress-fill"
                            style="width:${levelProgress() / 2}%"
                        ></div>
                    </div>

                    <div class="stat-footnote">
                        ${200 - levelProgress()} XP until next level
                    </div>
                </article>


                <article class="stat-card">
                    <div class="stat-top">
                        <span class="stat-icon">📚</span>
                        <span class="badge">${progress}%</span>
                    </div>

                    <div class="stat-number">${completed}/${lessons.length}</div>
                    <div class="stat-label">Lessons completed</div>

                    <div class="progress-track" style="margin-top:13px">
                        <div
                            class="progress-fill"
                            style="width:${progress}%"
                        ></div>
                    </div>

                    <div class="stat-footnote">Your learning journey</div>
                </article>


                <article class="stat-card">
                    <div class="stat-top">
                        <span class="stat-icon">🔥</span>
                        <span class="badge badge-yellow">Consistency</span>
                    </div>

                    <div class="stat-number">${state.streak}</div>
                    <div class="stat-label">Day learning streak</div>

                    <div class="stat-footnote">
                        Come back tomorrow to keep learning
                    </div>
                </article>


                <article class="stat-card">
                    <div class="stat-top">
                        <span class="stat-icon">🏆</span>
                        <span class="badge">
                            ${achievementDefinitions.length} available
                        </span>
                    </div>

                    <div class="stat-number">${state.achievements.length}</div>
                    <div class="stat-label">Achievements unlocked</div>

                    <div class="stat-footnote">
                        ${completedChallengeCount()} challenges completed
                    </div>
                </article>

            </section>


            <section class="section dashboard-grid">

                <div>

                    <div class="section-heading">
                        <div>
                            <h2>Your learning path</h2>
                            <p>Build your skills step by step.</p>
                        </div>

                        <button class="button button-small button-ghost"
                            data-view="learn">
                            View all →
                        </button>
                    </div>

                    <div class="card">
                        <div class="lesson-list">

                            ${lessons.slice(0, 4).map((lesson, index) => {

                                const done =
                                    state.completedLessons.includes(lesson.id);

                                return `

                                    <button
                                        class="lesson-list-item"
                                        data-action="open-lesson"
                                        data-id="${lesson.id}"
                                        style="width:100%;text-align:left;cursor:pointer"
                                    >

                                        <div class="lesson-number">
                                            ${done ? "✓" : lesson.icon}
                                        </div>

                                        <div class="lesson-item-content">
                                            <strong>${escapeHTML(lesson.title)}</strong>

                                            <span>
                                                ${escapeHTML(lesson.category)}
                                                · ${lesson.duration}
                                                · ${lesson.xp} XP
                                            </span>
                                        </div>

                                        <span class="lesson-item-action">
                                            ${done ? "✓" : "→"}
                                        </span>

                                    </button>

                                `;
                            }).join("")}

                        </div>
                    </div>

                </div>


                <div>

                    <div class="section-heading">
                        <div>
                            <h2>Today's quest</h2>
                            <p>Small steps, real progress.</p>
                        </div>
                    </div>

                    <div class="card daily-quest">

                        <div class="quest-icon-large">🎯</div>

                        <h3 class="card-title">Earn your daily XP</h3>

                        <p class="card-description">
                            Complete a lesson and solve a challenge to
                            finish today's learning quest.
                        </p>

                        <div class="quest-progress-label">
                            <span>Daily progress</span>
                            <strong>
                                ${state.dailyCompleted.length}/2
                            </strong>
                        </div>

                        <div class="progress-track">
                            <div
                                class="progress-fill"
                                style="width:${dailyProgress()}%"
                            ></div>
                        </div>

                        <div class="divider"></div>

                        <button
                            class="button button-primary button-full"
                            data-action="open-next-lesson"
                        >
                            Start learning →
                        </button>

                    </div>

                </div>

            </section>


            <section class="section">

                <div class="section-heading">
                    <div>
                        <h2>Your skill map</h2>
                        <p>Based on answers recorded during your practice.</p>
                    </div>
                </div>

                <div class="card">

                    <div class="skill-list">

                        ${skillTopics.map(topic => {

                            const value = mastery(topic);

                            return `

                                <div class="skill-row">

                                    <div class="skill-row-header">
                                        <span>${topic}</span>

                                        <span>
                                            ${state.skills[topic].total
                                                ? `${value}%`
                                                : "Not assessed yet"}
                                        </span>
                                    </div>

                                    <div class="progress-track">
                                        <div
                                            class="progress-fill"
                                            style="width:${value}%"
                                        ></div>
                                    </div>

                                </div>

                            `;
                        }).join("")}

                    </div>

                    <p class="stat-footnote">
                        Skill percentages use recorded questions only.
                        An unassessed topic is not automatically treated
                        as mastered or failed.
                    </p>

                </div>

            </section>

        `;
    }


    /* =====================================================
       LEARNING PATH
       ===================================================== */

    function renderLearningPath() {
        const completed = completedLessonCount();

        $("#viewContainer").innerHTML = `

            <section class="path-header">

                <div class="eyebrow">YOUR CURRICULUM</div>

                <h1 class="page-heading">Learning path</h1>

                <p class="page-description">
                    Progress from your first HTML element to interactive
                    JavaScript programs. Each lesson introduces a concept,
                    explains the code, and gives you a chance to test yourself.
                </p>

                <div class="path-summary">

                    <div class="stat-icon">🗺️</div>

                    <div>
                        <strong>
                            ${completed} of ${lessons.length} lessons completed
                        </strong>

                        <p>
                            ${Math.round(completed / lessons.length * 100)}%
                            of the current curriculum
                        </p>
                    </div>

                    <div style="width:100px">
                        <div class="progress-track">
                            <div
                                class="progress-fill"
                                style="width:${completed / lessons.length * 100}%"
                            ></div>
                        </div>
                    </div>

                </div>

            </section>


            <section class="path-world">

                ${lessons.map((lesson, index) => {

                    const done =
                        state.completedLessons.includes(lesson.id);

                    const previousDone =
                        index === 0 ||
                        state.completedLessons.includes(lessons[index - 1].id);

                    const locked = !done && !previousDone;

                    const nodeClass = done
                        ? "completed"
                        : locked
                            ? "locked"
                            : "current";

                    return `

                        <article class="path-node ${nodeClass}">

                            <div class="path-node-marker">
                                ${done ? "✓" : locked ? "🔒" : lesson.icon}
                            </div>

                            <div class="path-node-card">

                                <div class="path-node-title">

                                    <div>
                                        <div class="eyebrow">
                                            LEVEL ${lesson.number}
                                        </div>

                                        <h3>${escapeHTML(lesson.title)}</h3>
                                    </div>

                                    <span class="badge ${
                                        done
                                            ? "badge-green"
                                            : locked
                                                ? ""
                                                : "badge-accent"
                                    }">

                                        ${done
                                            ? "COMPLETED"
                                            : locked
                                                ? "LOCKED"
                                                : "AVAILABLE"}

                                    </span>

                                </div>

                                <p>${escapeHTML(lesson.description)}</p>

                                <div class="path-node-meta">

                                    <span class="badge">
                                        ${escapeHTML(lesson.category)}
                                    </span>

                                    <span class="badge">
                                        ⏱ ${lesson.duration}
                                    </span>

                                    <span class="badge badge-accent">
                                        ✦ ${lesson.xp} XP
                                    </span>

                                    <button
                                        class="button button-small ${
                                            locked
                                                ? "button-ghost"
                                                : "button-primary"
                                        }"
                                        data-action="open-lesson"
                                        data-id="${lesson.id}"
                                        ${locked ? "disabled" : ""}
                                    >
                                        ${done ? "Review lesson" : "Start lesson →"}
                                    </button>

                                </div>

                            </div>

                        </article>

                    `;
                }).join("")}

            </section>

        `;
    }


    /* =====================================================
       LESSON ENGINE
       ===================================================== */

    function openLesson(id) {
        const lesson = lessons.find(item => item.id === id);

        if (!lesson) {
            toast("Lesson not found.", "error");
            return;
        }

        const index = lessons.indexOf(lesson);

        if (
            index > 0 &&
            !state.completedLessons.includes(lesson.id) &&
            !state.completedLessons.includes(lessons[index - 1].id)
        ) {
            toast("Complete the previous lesson to unlock this one.", "error");
            return;
        }

        currentLesson = lesson;
        lessonAnswered = false;

        navigate("lesson");
    }


    function renderLesson() {
        if (!currentLesson) {
            navigate("learn");
            return;
        }

        const lesson = currentLesson;

        const completed =
            state.completedLessons.includes(lesson.id);

        const index = lessons.indexOf(lesson);

        const progress = Math.round(
            ((index + 1) / lessons.length) * 100
        );

        $("#viewContainer").innerHTML = `

            <section class="lesson-shell">

                <div class="lesson-topline">

                    <button
                        class="icon-button"
                        data-view="learn"
                        aria-label="Back to learning path"
                    >←</button>

                    <div>

                        <div class="eyebrow">
                            LEVEL ${lesson.number} · ${escapeHTML(lesson.category)}
                        </div>

                        <div class="progress-track">
                            <div
                                class="progress-fill"
                                style="width:${progress}%"
                            ></div>
                        </div>

                    </div>

                    <span class="badge badge-accent">
                        ✦ ${lesson.xp} XP
                    </span>

                </div>


                <div class="lesson-layout">

                    <article class="card lesson-main-card">

                        <div class="eyebrow">
                            ${lesson.icon} LEARN SOMETHING NEW
                        </div>

                        <h1>${escapeHTML(lesson.title)}</h1>

                        <p>${escapeHTML(lesson.explanation)}</p>

                        <div class="lesson-callout">
                            <strong>Remember this:</strong><br>
                            ${escapeHTML(lesson.callout)}
                        </div>

                        <div class="lesson-step">

                            <h3>Today's goal</h3>

                            <p>${escapeHTML(lesson.objective)}</p>

                        </div>

                        <div class="lesson-step">

                            <h3>Explore the code</h3>

                            <pre class="lesson-code"><code>${escapeHTML(lesson.example)}</code></pre>

                        </div>

                        ${lesson.steps.map(step => `

                            <div class="lesson-step">

                                <h3>${escapeHTML(step.heading)}</h3>

                                <p>${escapeHTML(step.text)}</p>

                            </div>

                        `).join("")}

                        <div class="divider"></div>

                        <button
                            class="button button-primary button-full"
                            data-action="load-lesson-code"
                        >
                            &lt;/&gt; Open this lesson in the playground
                        </button>

                    </article>


                    <aside class="card lesson-practice-card">

                        <div class="eyebrow">QUICK KNOWLEDGE CHECK</div>

                        <h2>Test your understanding.</h2>

                        <p>
                            Choose an answer. If you make a mistake,
                            read the explanation and try again.
                        </p>

                        <div class="lesson-question">

                            <h3>${escapeHTML(lesson.question.prompt)}</h3>

                            <div class="answer-options">

                                ${lesson.question.options.map((option, i) => `

                                    <button
                                        class="answer-option"
                                        data-action="lesson-answer"
                                        data-index="${i}"
                                    >
                                        <span>
                                            ${String.fromCharCode(65 + i)}.
                                        </span>

                                        <span>${escapeHTML(option)}</span>
                                    </button>

                                `).join("")}

                            </div>

                            <div
                                id="lessonFeedback"
                                aria-live="polite"
                            ></div>

                        </div>


                        <div class="divider"></div>

                        <div class="eyebrow">LESSON REWARD</div>

                        <h3 class="card-title">
                            ${completed ? "Lesson completed ✓" : "Complete the knowledge check"}
                        </h3>

                        <p class="card-description">
                            ${completed
                                ? "You can review this lesson any time."
                                : `Earn ${lesson.xp} XP by answering correctly.`}
                        </p>

                        <button
                            class="button ${
                                completed
                                    ? "button-success"
                                    : "button-primary"
                            } button-full"
                            data-action="complete-lesson"
                            ${!lessonAnswered && !completed ? "disabled" : ""}
                        >
                            ${completed ? "Lesson completed ✓" : "Complete lesson"}
                        </button>

                        <div style="margin-top:12px">

                            <button
                                class="button button-ghost button-full"
                                data-action="next-lesson"
                            >
                                ${index < lessons.length - 1
                                    ? "Next lesson →"
                                    : "Back to learning path"}
                            </button>

                        </div>

                    </aside>

                </div>

            </section>

        `;

        if (completed) {
            lessonAnswered = true;
            $("[data-action='complete-lesson']").disabled = false;
        }
    }


    function answerLesson(index) {
        if (!currentLesson) return;

        const lesson = currentLesson;
        const correct = index === lesson.question.correct;

        const feedback = $("#lessonFeedback");

        const buttons = $$(".answer-option");

        buttons.forEach((button, i) => {
            button.disabled = true;

            if (i === lesson.question.correct) {
                button.classList.add("correct");
            } else if (i === index && !correct) {
                button.classList.add("incorrect");
            }
        });

        trackAnswer(lesson.category, correct);

        feedback.innerHTML = `

            <div class="feedback-box ${correct ? "success" : "error"}">

                <strong>
                    ${correct ? "Correct! 🎉" : "Not quite — let's learn from it."}
                </strong>

                <br>

                ${escapeHTML(lesson.question.explanation)}

            </div>

            ${correct ? "" : `

                <button
                    class="button button-small button-ghost"
                    data-action="retry-lesson-question"
                    style="margin-top:10px"
                >
                    Try again
                </button>

            `}

        `;

        if (correct) {
            lessonAnswered = true;

            $("[data-action='complete-lesson']").disabled = false;

        } else {
            lessonAnswered = false;
        }
    }


    function retryLessonQuestion() {
        if (!currentLesson) return;

        const lesson = currentLesson;

        $("#lessonFeedback").innerHTML = "";

        $$(".answer-option").forEach(button => {
            button.disabled = false;
            button.classList.remove("correct", "incorrect");
        });
    }


    function completeLesson() {
        if (!currentLesson) return;

        const id = currentLesson.id;

        if (state.completedLessons.includes(id)) {
            toast("You've already completed this lesson.");
            return;
        }

        if (!lessonAnswered) {
            toast("Answer the knowledge check correctly first.", "error");
            return;
        }

        state.completedLessons.push(id);

        completeDailyTask("lesson");

        saveState();

        awardXP(currentLesson.xp, currentLesson.title);

        checkAchievements();

        renderLesson();

        toast("Lesson completed! Your progress is saved.");
    }


    /* =====================================================
       CODE PLAYGROUND
       ===================================================== */

    function setEditorCode(code) {
        editorCode = {
            html: code.html ?? "",
            css: code.css ?? "",
            js: code.js ?? ""
        };
    }


    function renderPlayground() {
        $("#viewContainer").innerHTML = `

            <section class="playground-header">

                <div>
                    <div class="eyebrow">YOUR CREATIVE WORKSPACE</div>

                    <h1 class="page-heading">Code playground</h1>

                    <p class="page-description">
                        Write HTML, style it with CSS, add JavaScript,
                        and see your page update in the preview.
                    </p>
                </div>

                <div class="playground-actions">

                    <button
                        class="button button-primary"
                        data-action="run-code"
                    >
                        ▶ Run code
                    </button>

                    <button
                        class="button button-ghost"
                        data-action="reset-code"
                    >
                        ↺ Reset
                    </button>

                </div>

            </section>


            <section class="editor-workspace">

                <div class="editor-toolbar">

                    <div class="editor-tabs">

                        <button
                            class="editor-tab ${
                                currentEditorTab === "html" ? "active" : ""
                            }"
                            data-action="editor-tab"
                            data-lang="html"
                        >
                            ◇ HTML
                        </button>

                        <button
                            class="editor-tab ${
                                currentEditorTab === "css" ? "active" : ""
                            }"
                            data-action="editor-tab"
                            data-lang="css"
                        >
                            ◇ CSS
                        </button>

                        <button
                            class="editor-tab ${
                                currentEditorTab === "js" ? "active" : ""
                            }"
                            data-action="editor-tab"
                            data-lang="js"
                        >
                            ◇ JavaScript
                        </button>

                    </div>

                    <span class="badge badge-green">Live preview</span>

                </div>


                <div class="editor-body">

                    <section class="editor-pane">

                        <div class="pane-header">
                            <span id="editorFileName">index.html</span>
                            <span>Editable source</span>
                        </div>

                        <textarea
                            id="codeEditor"
                            class="code-editor"
                            spellcheck="false"
                            autocomplete="off"
                            autocapitalize="off"
                            aria-label="Code editor"
                            wrap="off"
                        >${escapeHTML(editorCode[currentEditorTab])}</textarea>

                    </section>


                    <section class="editor-pane">

                        <div class="pane-header">
                            <span>Preview</span>
                            <span>Isolated sandbox</span>
                        </div>

                        <iframe
                            id="codePreview"
                            class="preview-frame"
                            title="Web page preview"
                            sandbox="allow-scripts"
                            referrerpolicy="no-referrer"
                        ></iframe>

                    </section>

                </div>


                <div class="console-panel">

                    <div class="console-heading">
                        <span>OUTPUT CONSOLE</span>

                        <button
                            class="button button-small button-ghost"
                            data-action="clear-console"
                        >
                            Clear
                        </button>
                    </div>

                    <div
                        class="console-output"
                        id="consoleOutput"
                        aria-live="polite"
                    >Run your code to see console output.</div>

                </div>

            </section>


            <div class="playground-note">

                <strong>💡 How it works:</strong>

                Edit the HTML to change the structure, CSS to change the
                appearance, and JavaScript to add behaviour. Select
                <strong>Run code</strong> to refresh the preview.

                Your code runs in a sandboxed iframe. The preview can display
                your page and report supported console messages, but this
                editor is not a full professional IDE or a complete JavaScript
                debugging environment.

            </div>


            <section class="section">

                <div class="section-heading">
                    <div>
                        <h2>Try a mini challenge</h2>
                        <p>Make a small improvement to your project.</p>
                    </div>
                </div>

                <div class="card">

                    <h3 class="card-title">
                        Challenge: Make your page interactive
                    </h3>

                    <p class="card-description">
                        Add a button to your HTML, then use JavaScript
                        addEventListener() to respond when someone clicks it.
                        Change an element's text using textContent.
                    </p>

                    <button
                        class="button button-primary"
                        data-action="load-dom-example"
                        style="margin-top:15px"
                    >
                        Load interactive example
                    </button>

                </div>

            </section>

        `;

        bindEditor();

        updateEditorTab();
    }


    function bindEditor() {
        const editor = $("#codeEditor");

        editor.addEventListener("input", () => {
            editorCode[currentEditorTab] = editor.value;
        });

        editor.addEventListener("keydown", event => {
            if (event.key === "Tab") {
                event.preventDefault();

                const start = editor.selectionStart;
                const end = editor.selectionEnd;

                editor.setRangeText("  ", start, end, "end");

                editorCode[currentEditorTab] = editor.value;
            }

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "enter"
            ) {
                event.preventDefault();
                runCode();
            }
        });
    }


    function updateEditorTab() {
        const editor = $("#codeEditor");

        if (!editor) return;

        editor.value = editorCode[currentEditorTab];

        $("#editorFileName").textContent = {
            html: "index.html",
            css: "style.css",
            js: "script.js"
        }[currentEditorTab];

        $$(".editor-tab").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.lang === currentEditorTab
            );
        });
    }


    function switchEditorTab(language) {
        const editor = $("#codeEditor");

        if (editor) {
            editorCode[currentEditorTab] = editor.value;
        }

        if (!["html", "css", "js"].includes(language)) {
            return;
        }

        currentEditorTab = language;

        updateEditorTab();
    }


    function consoleMessage(text, type = "") {
        const output = $("#consoleOutput");

        if (!output) return;

        const line = document.createElement("div");

        line.className = `console-line ${type}`;
        line.textContent = text;

        output.appendChild(line);

        output.scrollTop = output.scrollHeight;
    }


    function normalizeConsoleArguments(args) {
        return args.map(value => {
            if (typeof value === "string") {
                return value;
            }

            if (value === null) {
                return "null";
            }

            if (value === undefined) {
                return "undefined";
            }

            if (
                typeof value === "object" ||
                typeof value === "function"
            ) {
                try {
                    return JSON.stringify(value);
                } catch {
                    return String(value);
                }
            }

            return String(value);
        }).join(" ");
    }


    function runCode() {
        const editor = $("#codeEditor");

        if (!editor) return;

        editorCode[currentEditorTab] = editor.value;

        const preview = $("#codePreview");

        const output = $("#consoleOutput");

        output.replaceChildren();

        const sourceHTML = editorCode.html;
        const sourceCSS = editorCode.css;
        const sourceJS = editorCode.js;

        /*
         * This is a learning sandbox, not a security boundary for
         * untrusted server execution.
         *
         * The iframe has allow-scripts but not allow-same-origin.
         * Student code is not executed in the parent document.
         */

        const bridge = `
<script>
(function () {
    const send = function (type, args) {
        try {
            parent.postMessage({
                channel: "codequest-console",
                type: type,
                values: Array.from(args).map(function (value) {
                    if (typeof value === "string") return value;
                    if (value === null) return "null";
                    if (value === undefined) return "undefined";

                    try {
                        return JSON.stringify(value);
                    } catch (_) {
                        return String(value);
                    }
                })
            }, "*");
        } catch (_) {}
    };

    ["log", "info", "warn", "error"].forEach(function (type) {
        const original = console[type];

        console[type] = function () {
            send(type, arguments);
            original.apply(console, arguments);
        };
    });

    window.addEventListener("error", function (event) {
        send("error", [event.message || "Unknown runtime error"]);
    });

    window.addEventListener("unhandledrejection", function (event) {
        send("error", [
            "Unhandled promise rejection: " +
            String(event.reason)
        ]);
    });
})();
<\/script>`;

        let finalHTML = sourceHTML;

        const hasHTMLDocument =
            /<!doctype|<html[\s>]/i.test(sourceHTML);

        if (!hasHTMLDocument) {
            finalHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>${sourceCSS}</style>
</head>
<body>
${sourceHTML}
${bridge}
<script>
${sourceJS}
<\/script>
</body>
</html>`;
        } else {
            /*
             * For complete HTML documents, place the CSS and bridge
             * before the user's scripts when possible.
             */
            const cssBlock = `<style>${sourceCSS}</style>`;

            if (/<\/head\s*>/i.test(finalHTML)) {
                finalHTML = finalHTML.replace(
                    /<\/head\s*>/i,
                    `${cssBlock}${bridge}</head>`
                );
            } else {
                finalHTML = cssBlock + bridge + finalHTML;
            }

            /*
             * Append the separate JavaScript source to the end of
             * the document so body elements exist before it runs.
             */
            finalHTML = finalHTML.replace(
                /<\/body\s*>/i,
                `<script>${sourceJS}\n<\/script></body>`
            );

            if (!/<\/body\s*>/i.test(finalHTML)) {
                finalHTML += `<script>${sourceJS}\n<\/script>`;
            }
        }

        try {
            preview.srcdoc = finalHTML;

            consoleMessage("Preview updated.", "success");

            consoleMessage(
                "Tip: Ctrl + Enter runs the current editor contents."
            );

        } catch (error) {
            consoleMessage(
                `Unable to update preview: ${error.message}`,
                "error"
            );
        }
    }


    function handleConsoleMessage(event) {
        if (event.source !== $("#codePreview")?.contentWindow) {
            return;
        }

        const data = event.data;

        if (
            !data ||
            data.channel !== "codequest-console" ||
            !Array.isArray(data.values)
        ) {
            return;
        }

        const type = ["log", "info", "warn", "error"].includes(data.type)
            ? data.type
            : "log";

        consoleMessage(
            normalizeConsoleArguments(data.values),
            type === "error" ? "error" : ""
        );
    }


    function resetCode() {
        setEditorCode(starterCode);

        renderPlayground();

        toast("Starter project restored.");
    }


    function loadLessonCode() {
        if (!currentLesson || !currentLesson.starter) {
            return;
        }

        setEditorCode(currentLesson.starter);

        navigate("playground");

        toast("Lesson code loaded into the playground.");
    }


    function loadDOMExample() {
        setEditorCode({
            html: `<h1>Interactive Page</h1>

<p id="message">Click the button to change this message.</p>

<button id="myButton">Change message</button>`,

            css: `body {
  font-family: system-ui, sans-serif;
  padding: 30px;
  background: #f3f0ff;
  color: #25233b;
}

button {
  padding: 11px 15px;
  border: none;
  border-radius: 8px;
  background: #7255d9;
  color: white;
  cursor: pointer;
}`,

            js: `const button = document.querySelector("#myButton");

button.addEventListener("click", function () {
  document.querySelector("#message").textContent =
    "You did it! JavaScript changed the page.";
});`
        });

        renderPlayground();

        runCode();
    }


    /* =====================================================
       CHALLENGE ENGINE
       ===================================================== */

    function renderChallenges() {
        $("#viewContainer").innerHTML = `

            <section class="welcome-row">

                <div>
                    <div class="eyebrow">PRACTISE YOUR SKILLS</div>

                    <h1 class="page-heading">Challenge arena</h1>

                    <p class="page-description">
                        Debug broken code, understand why it fails,
                        and learn to recognise common programming mistakes.
                    </p>
                </div>

            </section>


            <section class="challenge-grid">

                ${challenges.map(challenge => {

                    const completed =
                        state.completedChallenges.includes(challenge.id);

                    return `

                        <article class="challenge-card">

                            <div class="challenge-icon">
                                ${challenge.icon}
                            </div>

                            <div class="challenge-meta">

                                <span class="badge badge-accent">
                                    ${escapeHTML(challenge.category)}
                                </span>

                                <span class="badge">
                                    ${escapeHTML(challenge.difficulty)}
                                </span>

                            </div>

                            <h3>${escapeHTML(challenge.title)}</h3>

                            <p>${escapeHTML(challenge.description)}</p>

                            <div class="challenge-meta">

                                <span class="badge">
                                    ✦ ${challenge.xp} XP
                                </span>

                                ${completed
                                    ? `<span class="badge badge-green">Completed ✓</span>`
                                    : ""}

                            </div>

                            <button
                                class="button ${
                                    completed
                                        ? "button-ghost"
                                        : "button-primary"
                                } button-full"
                                data-action="open-challenge"
                                data-id="${challenge.id}"
                            >
                                ${completed ? "Practise again" : "Start challenge →"}
                            </button>

                        </article>

                    `;
                }).join("")}

            </section>


            <section class="section">

                <div class="card">

                    <div class="eyebrow">NEXT STEP</div>

                    <h2 class="card-title">
                        Ready to write code yourself?
                    </h2>

                    <p class="card-description">
                        Open the playground to experiment with your own
                        HTML, CSS and JavaScript.
                    </p>

                    <button
                        class="button button-primary"
                        data-view="playground"
                        style="margin-top:15px"
                    >
                        Open playground →
                    </button>

                </div>

            </section>

        `;
    }


    function openChallenge(id) {
        const challenge = challenges.find(item => item.id === id);

        if (!challenge) {
            toast("Challenge not found.", "error");
            return;
        }

        currentChallenge = challenge;
        challengeChecked = false;
        challengeAttempts = 0;

        navigate("challenge");
    }


    function renderChallenge() {
        if (!currentChallenge) {
            navigate("challenges");
            return;
        }

        const challenge = currentChallenge;

        const completed =
            state.completedChallenges.includes(challenge.id);

        $("#viewContainer").innerHTML = `

            <section class="lesson-shell">

                <div class="lesson-topline">

                    <button
                        class="icon-button"
                        data-view="challenges"
                        aria-label="Back to challenges"
                    >←</button>

                    <div>
                        <div class="eyebrow">
                            DEBUGGING CHALLENGE
                        </div>

                        <strong>${escapeHTML(challenge.title)}</strong>
                    </div>

                    <span class="badge badge-accent">
                        ✦ ${challenge.xp} XP
                    </span>

                </div>


                <div class="card">

                    <div class="challenge-icon">
                        ${challenge.icon}
                    </div>

                    <h1 class="page-heading">
                        ${escapeHTML(challenge.title)}
                    </h1>

                    <p>${escapeHTML(challenge.description)}</p>

                    <div class="lesson-callout">
                        ${escapeHTML(challenge.question)}
                    </div>

                    <label for="challengeEditor" class="card-title">
                        Edit the code
                    </label>

                    <textarea
                        id="challengeEditor"
                        class="code-editor"
                        style="
                            min-height:220px;
                            margin-top:10px;
                            border:1px solid var(--border);
                            border-radius:12px;
                        "
                        spellcheck="false"
                        aria-label="Challenge code editor"
                    >${escapeHTML(challenge.initial)}</textarea>

                    <div
                        id="challengeFeedback"
                        aria-live="polite"
                        style="margin-top:15px"
                    ></div>

                    <div class="editor-split-controls" style="margin-top:17px">

                        <button
                            class="button button-primary"
                            data-action="check-challenge"
                        >
                            Check solution
                        </button>

                        <button
                            class="button button-ghost"
                            data-action="show-hint"
                        >
                            💡 Hint
                        </button>

                        <button
                            class="button button-ghost"
                            data-action="reset-challenge"
                        >
                            Reset code
                        </button>

                    </div>

                    <div class="divider"></div>

                    <div class="playground-note">
                        <strong>Important:</strong>
                        This starter challenge checks a known correction.
                        Real programming assessment requires more extensive
                        checks, including syntax, behaviour, and test cases.
                    </div>

                    ${completed ? `

                        <div class="feedback-box success">
                            You have already completed this challenge.
                            You can practise it again, but you will not earn
                            its completion reward twice.
                        </div>

                    ` : ""}

                </div>

            </section>

        `;
    }


    function normalizeCode(code) {
        return String(code)
            .replace(/\r\n/g, "\n")
            .replace(/[ \t]+$/gm, "")
            .trim();
    }


    function checkChallenge() {
        if (!currentChallenge) return;

        const challenge = currentChallenge;

        const editor = $("#challengeEditor");

        if (!editor) return;

        const answer = normalizeCode(editor.value);
        const solution = normalizeCode(challenge.solution);

        challengeAttempts += 1;

        /*
         * This is intentionally a narrowly defined comparison.
         * It does not claim to be a general-purpose code grader.
         */

        const correct = answer === solution;

        const feedback = $("#challengeFeedback");

        trackAnswer("Debugging", correct);

        if (correct) {
            challengeChecked = true;

            feedback.innerHTML = `

                <div class="feedback-box success">

                    <strong>Excellent debugging! 🎉</strong>

                    <br>

                    ${escapeHTML(challenge.explanation)}

                </div>

            `;

            if (!state.completedChallenges.includes(challenge.id)) {
                state.completedChallenges.push(challenge.id);

                state.challengeBest[challenge.id] = {
                    attempts: challengeAttempts,
                    completedAt: new Date().toISOString()
                };

                completeDailyTask("challenge");

                saveState();

                awardXP(challenge.xp, challenge.title);

                checkAchievements();
            }

        } else {
            challengeChecked = false;

            feedback.innerHTML = `

                <div class="feedback-box error">

                    <strong>Not quite. Keep investigating.</strong>

                    <br>

                    Compare the broken code with the intended result.
                    Look at punctuation, operators, and opening and
                    closing tags.

                </div>

            `;

            toast("Try another correction.", "error");
        }
    }


    function showChallengeHint() {
        if (!currentChallenge) return;

        const feedback = $("#challengeFeedback");

        const hint = document.createElement("div");

        hint.className = "feedback-box info";
        hint.textContent = currentChallenge.hint;

        feedback.appendChild(hint);
    }


    /* =====================================================
       ASSESSMENT ENGINE
       ===================================================== */

    function renderAssessment() {
        if (activeAssessment) {
            renderAssessmentQuestion();
            return;
        }

        const best = state.quizBest;

        $("#viewContainer").innerHTML = `

            <section class="welcome-row">

                <div>
                    <div class="eyebrow">CHECK YOUR UNDERSTANDING</div>

                    <h1 class="page-heading">PBA assessment</h1>

                    <p class="page-description">
                        Test what you know about HTML, CSS and JavaScript.
                        Read each question carefully and review the explanations
                        after completing the assessment.
                    </p>
                </div>

            </section>


            <section class="assessment-intro">

                <div class="assessment-overview">

                    <div class="eyebrow">KNOWLEDGE CHECK</div>

                    <h2>Show what you've learned.</h2>

                    <p>
                        This practice assessment contains multiple-choice
                        and output-prediction questions. It gives immediate
                        feedback after submission and records your result.
                    </p>

                    <div class="assessment-facts">

                        <div class="assessment-fact">
                            <span>✓</span>
                            <span>${assessmentQuestions.length} questions</span>
                        </div>

                        <div class="assessment-fact">
                            <span>✓</span>
                            <span>
                                ${assessmentQuestions.reduce(
                                    (sum, question) => sum + question.marks,
                                    0
                                )} total marks
                            </span>
                        </div>

                        <div class="assessment-fact">
                            <span>✓</span>
                            <span>HTML, CSS and JavaScript fundamentals</span>
                        </div>

                        <div class="assessment-fact">
                            <span>✓</span>
                            <span>Review answers and explanations</span>
                        </div>

                    </div>

                    <button
                        class="button button-primary"
                        data-action="start-assessment"
                        style="margin-top:25px"
                    >
                        Begin assessment →
                    </button>

                </div>


                <div class="assessment-stat-card">

                    <span class="badge badge-accent">
                        YOUR BEST RESULT
                    </span>

                    <div class="stat-number">
                        ${best ? `${best.percentage}%` : "—"}
                    </div>

                    <div class="stat-label">
                        ${best
                            ? `${best.score}/${best.total} marks`
                            : "Complete an assessment to get your first result."}
                    </div>

                    <div class="divider"></div>

                    <div class="stat-label">
                        Attempts completed:
                        <strong>${state.quizHistory.length}</strong>
                    </div>

                </div>

            </section>


            <section class="section">

                <div class="card">

                    <div class="eyebrow">A NOTE ABOUT THE CURRICULUM</div>

                    <h3 class="card-title">
                        This is the initial practice assessment.
                    </h3>

                    <p class="card-description">
                        It is not yet your official school PBA paper.
                        Once you provide the actual practical list and
                        marking scheme, we can create practical-specific
                        questions, output-prediction exercises, code-writing
                        tasks, and debugging assessments.
                    </p>

                </div>

            </section>

        `;
    }


    function shuffle(array) {
        const copy = [...array];

        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy;
    }


    function startAssessment() {
        activeAssessment = shuffle(assessmentQuestions);

        assessmentIndex = 0;
        assessmentAnswers = {};

        renderAssessmentQuestion();
    }


    function renderAssessmentQuestion() {
        if (!activeAssessment) {
            renderAssessment();
            return;
        }

        const question = activeAssessment[assessmentIndex];

        const total = activeAssessment.length;

        const selected = assessmentAnswers[question.id];

        $("#viewContainer").innerHTML = `

            <section class="assessment-session">

                <div class="assessment-session-top">

                    <div>
                        <div class="eyebrow">ASSESSMENT IN PROGRESS</div>

                        <strong>
                            Question ${assessmentIndex + 1} of ${total}
                        </strong>
                    </div>

                    <span class="badge badge-accent">
                        ${question.marks} marks
                    </span>

                </div>


                <div class="progress-track" style="margin-bottom:23px">
                    <div
                        class="progress-fill"
                        style="width:${(assessmentIndex + 1) / total * 100}%"
                    ></div>
                </div>


                <article class="assessment-question-card">

                    <div class="assessment-question-number">
                        ${escapeHTML(question.topic.toUpperCase())}
                        · ${escapeHTML(question.type.toUpperCase())}
                    </div>

                    <h2 style="margin-top:12px">
                        ${escapeHTML(question.prompt)}
                    </h2>

                    <p>
                        Select the best answer.
                        You can review your results when the assessment ends.
                    </p>

                    <div class="answer-options" style="margin-top:22px">

                        ${question.options.map((option, index) => `

                            <button
                                class="answer-option ${
                                    selected === index ? "selected" : ""
                                }"
                                data-action="assessment-answer"
                                data-index="${index}"
                            >

                                <span>
                                    ${String.fromCharCode(65 + index)}.
                                </span>

                                <span>${escapeHTML(option)}</span>

                            </button>

                        `).join("")}

                    </div>


                    <div class="assessment-footer">

                        <button
                            class="button button-ghost"
                            data-action="assessment-back"
                            ${assessmentIndex === 0 ? "disabled" : ""}
                        >
                            ← Previous
                        </button>

                        <span class="muted">
                            ${assessmentIndex + 1}/${total}
                        </span>

                        <button
                            class="button button-primary"
                            data-action="assessment-next"
                            ${selected === undefined ? "disabled" : ""}
                        >
                            ${assessmentIndex === total - 1
                                ? "Finish assessment"
                                : "Next question →"}
                        </button>

                    </div>

                </article>

            </section>

        `;
    }


    function chooseAssessmentAnswer(index) {
        if (!activeAssessment) return;

        const question = activeAssessment[assessmentIndex];

        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= question.options.length
        ) {
            return;
        }

        assessmentAnswers[question.id] = index;

        renderAssessmentQuestion();
    }


    function previousAssessmentQuestion() {
        if (assessmentIndex > 0) {
            assessmentIndex -= 1;

            renderAssessmentQuestion();
        }
    }


    function nextAssessmentQuestion() {
        if (!activeAssessment) return;

        const question = activeAssessment[assessmentIndex];

        if (assessmentAnswers[question.id] === undefined) {
            toast("Choose an answer before continuing.", "error");
            return;
        }

        if (assessmentIndex < activeAssessment.length - 1) {
            assessmentIndex += 1;

            renderAssessmentQuestion();

        } else {
            finishAssessment();
        }
    }


    function finishAssessment() {
        if (!activeAssessment) return;

        let score = 0;
        let total = 0;

        const breakdown = {};

        activeAssessment.forEach(question => {
            const correct =
                assessmentAnswers[question.id] === question.answer;

            total += question.marks;

            if (correct) {
                score += question.marks;
            }

            if (!breakdown[question.topic]) {
                breakdown[question.topic] = {
                    score: 0,
                    total: 0
                };
            }

            breakdown[question.topic].total += question.marks;

            if (correct) {
                breakdown[question.topic].score += question.marks;
            }

            trackAnswer("Assessment", correct);

            if (["HTML", "CSS", "JavaScript"].includes(question.topic)) {
                trackAnswer(question.topic, correct);
            }
        });

        const percentage = Math.round(score / total * 100);

        const result = {
            score,
            total,
            percentage,
            date: new Date().toISOString(),
            breakdown
        };

        state.quizHistory.push(result);

        if (
            !state.quizBest ||
            percentage > state.quizBest.percentage
        ) {
            state.quizBest = result;
        }

        activeAssessment = null;

        assessmentIndex = 0;

        assessmentAnswers = {};

        saveState();

        if (percentage === 100) {
            awardXP(100, "Perfect assessment");

        } else if (percentage >= 80) {
            awardXP(60, "Assessment completed");

        } else if (percentage >= 50) {
            awardXP(35, "Assessment completed");

        } else {
            awardXP(20, "Assessment completed");
        }

        completeDailyTask("assessment");

        checkAchievements();

        renderAssessmentResults(result);
    }


    function renderAssessmentResults(result) {
        const breakdown = result.breakdown;

        $("#viewContainer").innerHTML = `

            <section class="assessment-session">

                <div class="assessment-results">

                    <div class="eyebrow">ASSESSMENT COMPLETE</div>

                    <h1 class="page-heading">
                        ${result.percentage >= 80
                            ? "Brilliant work! 🎉"
                            : result.percentage >= 50
                                ? "Good effort. Keep going!"
                                : "Every attempt teaches you something."}
                    </h1>

                    <div class="result-circle">
                        ${result.percentage}%
                    </div>

                    <h2>${result.score} / ${result.total} marks</h2>

                    <p>
                        ${
                            result.percentage >= 80
                                ? "You demonstrated a strong understanding of this question set."
                                : "Review the explanations and practise the topics that need more attention."
                        }
                    </p>


                    <div class="result-breakdown">

                        ${Object.entries(breakdown).map(([topic, values]) => `

                            <div class="result-row">

                                <span>${escapeHTML(topic)}</span>

                                <strong>
                                    ${values.score}/${values.total} marks
                                </strong>

                            </div>

                        `).join("")}

                    </div>


                    <div class="divider"></div>


                    <h3 style="text-align:left">Review your answers</h3>

                    <div class="result-breakdown">

                        ${activeAssessmentForReview(result)}

                    </div>


                    <div class="editor-split-controls" style="justify-content:center">

                        <button
                            class="button button-primary"
                            data-action="retake-assessment"
                        >
                            Try again
                        </button>

                        <button
                            class="button button-ghost"
                            data-view="dashboard"
                        >
                            Return to dashboard
                        </button>

                    </div>

                </div>

            </section>

        `;
    }


    /*
     * The assessment question order and answers are preserved
     * separately when the result is displayed.
     */

    let lastAssessmentReview = null;


    function activeAssessmentForReview(result) {
        if (!lastAssessmentReview) {
            return `
                <p class="card-description">
                    Detailed answer review is unavailable for this session.
                </p>
            `;
        }

        return lastAssessmentReview.map(item => `

            <div class="card" style="text-align:left;padding:15px">

                <span class="badge ${
                    item.correct ? "badge-green" : "badge-yellow"
                }">
                    ${item.correct ? "Correct" : "Review"}
                </span>

                <h4 style="margin:10px 0">
                    ${escapeHTML(item.prompt)}
                </h4>

                <p style="font-size:11px;margin-bottom:8px">
                    Your answer:
                    <strong>
                        ${escapeHTML(item.selectedAnswer ?? "Not answered")}
                    </strong>
                </p>

                <p style="font-size:11px;margin-bottom:8px">
                    Correct answer:
                    <strong>
                        ${escapeHTML(item.correctAnswer)}
                    </strong>
                </p>

                <p style="font-size:11px;margin-bottom:0">
                    ${escapeHTML(item.explanation)}
                </p>

            </div>

        `).join("");
    }


    /*
     * Preserve the original finish implementation while adding
     * a full answer review.
     */

    const originalFinishAssessment = finishAssessment;


    finishAssessment = function () {
        if (!activeAssessment) return;

        lastAssessmentReview = activeAssessment.map(question => {

            const selectedIndex = assessmentAnswers[question.id];

            return {
                prompt: question.prompt,

                selectedAnswer:
                    selectedIndex === undefined
                        ? null
                        : question.options[selectedIndex],

                correctAnswer: question.options[question.answer],

                correct: selectedIndex === question.answer,

                explanation: question.explanation
            };
        });

        originalFinishAssessment();
    };


    /* =====================================================
       ACHIEVEMENT SCREEN
       ===================================================== */

    function renderAchievements() {
        $("#viewContainer").innerHTML = `

            <section class="welcome-row">

                <div>
                    <div class="eyebrow">REWARDS AND MILESTONES</div>

                    <h1 class="page-heading">Achievements</h1>

                    <p class="page-description">
                        Every milestone represents progress.
                        Learn, experiment, and unlock rewards as you go.
                    </p>
                </div>

                <span class="badge badge-accent">
                    ${state.achievements.length}/${achievementDefinitions.length} unlocked
                </span>

            </section>


            <section class="achievement-grid">

                ${achievementDefinitions.map(achievement => {

                    const unlocked =
                        state.achievements.includes(achievement.id);

                    return `

                        <article class="achievement-card ${
                            unlocked ? "" : "locked"
                        }">

                            <div class="achievement-symbol">
                                ${unlocked ? achievement.icon : "🔒"}
                            </div>

                            <h3>${escapeHTML(achievement.title)}</h3>

                            <p>${escapeHTML(achievement.description)}</p>

                            <span class="badge ${
                                unlocked ? "badge-green" : ""
                            }">
                                ${unlocked ? "UNLOCKED ✓" : "NOT YET"}
                            </span>

                        </article>

                    `;
                }).join("")}

            </section>

        `;
    }


    /* =====================================================
       PROFILE
       ===================================================== */

    function openProfile() {
        $("#playerName").value =
            state.name === "Explorer" ? "" : state.name;

        $("#profileLevel").textContent =
            `Level ${levelForXP()} Explorer`;

        $("#profileXP").textContent =
            `${state.xp} experience points`;

        $("#profileDialog").showModal();
    }


    function saveProfile(event) {
        event.preventDefault();

        const input = $("#playerName");

        const name = input.value.trim();

        if (!name) {
            toast("Enter a name first.", "error");
            return;
        }

        state.name = name.slice(0, 30);

        saveState();

        $("#profileDialog").close();

        updateTopbar();

        toast(`Welcome, ${state.name}!`);

        if (currentView === "dashboard") {
            renderDashboard();
        }
    }


    /* =====================================================
       GLOBAL EVENT DELEGATION
       ===================================================== */

    function handleClick(event) {
        const target = event.target.closest(
            "button, [data-view], [data-action]"
        );

        if (!target || target.disabled) return;

        if (target.dataset.view) {
            navigate(target.dataset.view);
            return;
        }

        const action = target.dataset.action;

        if (!action) return;

        switch (action) {

            case "open-profile":
                openProfile();
                break;

            case "close-profile":
                $("#profileDialog").close();
                break;

            case "continue":
            case "open-next-lesson": {
                const next =
                    lessons.find(lesson =>
                        !state.completedLessons.includes(lesson.id)
                    ) || lessons[0];

                openLesson(next.id);
                break;
            }

            case "open-lesson":
                openLesson(target.dataset.id);
                break;

            case "lesson-answer":
                answerLesson(Number(target.dataset.index));
                break;

            case "retry-lesson-question":
                retryLessonQuestion();
                break;

            case "complete-lesson":
                completeLesson();
                break;

            case "next-lesson": {
                if (!currentLesson) break;

                const index = lessons.indexOf(currentLesson);

                if (index < lessons.length - 1) {
                    openLesson(lessons[index + 1].id);
                } else {
                    navigate("learn");
                }

                break;
            }

            case "load-lesson-code":
                loadLessonCode();
                break;

            case "editor-tab":
                switchEditorTab(target.dataset.lang);
                break;

            case "run-code":
                runCode();
                break;

            case "reset-code":
                resetCode();
                break;

            case "clear-console":
                $("#consoleOutput").replaceChildren();
                break;

            case "load-dom-example":
                loadDOMExample();
                break;

            case "open-challenge":
                openChallenge(target.dataset.id);
                break;

            case "check-challenge":
                checkChallenge();
                break;

            case "show-hint":
                showChallengeHint();
                break;

            case "reset-challenge":
                if (currentChallenge) {
                    $("#challengeEditor").value =
                        currentChallenge.initial;

                    $("#challengeFeedback").replaceChildren();

                    challengeAttempts = 0;
                    challengeChecked = false;
                }

                break;

            case "start-assessment":
                startAssessment();
                break;

            case "assessment-answer":
                chooseAssessmentAnswer(Number(target.dataset.index));
                break;

            case "assessment-back":
                previousAssessmentQuestion();
                break;

            case "assessment-next":
                nextAssessmentQuestion();
                break;

            case "retake-assessment":
                startAssessment();
                break;

        }
    }


    function handleProfileSubmit(event) {
        if (event.target.id === "profileForm") {
            saveProfile(event);
        }
    }


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initialize() {
        initializeVisit();

        updateTopbar();

        document.addEventListener("click", handleClick);

        document.addEventListener("submit", handleProfileSubmit);

        window.addEventListener("message", handleConsoleMessage);

        $("#menuToggle").addEventListener("click", () => {
            const sidebar = $("#sidebar");

            sidebar.classList.toggle("open");

            $("#menuToggle").setAttribute(
                "aria-expanded",
                String(sidebar.classList.contains("open"))
            );
        });

        $("#profileDialog").addEventListener("click", event => {
            if (event.target === $("#profileDialog")) {
                $("#profileDialog").close();
            }
        });

        window.addEventListener("beforeunload", saveState);

        navigate("dashboard");
    }


    return {
        initialize,
        navigate,
        openLesson,
        runCode
    };

})();


document.addEventListener("DOMContentLoaded", () => {
    CodeQuest.initialize();
});