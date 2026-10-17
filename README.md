# Complingo — school practicals edition

Complingo is a browser-based coding coach for one learner preparing for the
school's HTML and JavaScript practicals. The course is built around the
programs in the consolidated CS final-exam study pack rather than a general
HTML/CSS/JavaScript curriculum.

## Course structure

The learning path has three units of four lessons each:

1. **Foundations and decisions** — practical HTML structure, arithmetic
   functions, even/odd checks, and finding the largest of three values.
2. **Loops and strings** — positive-number squares, factorials, sums of
   squares, and string length.
3. **Arrays and nested loops** — array parity, array totals, averages, and
   multiplication tables.

Each lesson teaches the idea, asks a short understanding question, and then
opens a testable coding practical. Completing all four lessons in a unit
unlocks its checkpoint. Checkpoints mix output prediction, debugging
intentional mistakes, and writing a function; passing every task unlocks the
next unit.

Repeated versions of the parity, factorial, largest-number, square-sum, and
array exercises have been consolidated into one tested lesson or assessment
each. The array average has been made explicit as its own lesson because it
appears as a distinct extra exam practical in the study pack.

## Run locally

Open `index.html` in a modern browser. JavaScript practical tests use a
short-lived Web Worker so a learner's infinite loop can be stopped without
freezing the page. If the browser blocks workers when opening a local file,
serve this folder from a local HTTP server instead. Guest progress is saved in
local storage. Cloud sign-in and sync remain optional and require Supabase
credentials in `script.js`.
