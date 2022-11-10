import { createFooter } from "./footer.js";
import { createHeader } from "./header.js";
import { createMain } from "./main.js";

export default function createQuizPage(score) {
    const el = document.createElement('div');
    el.classList.add('quiz-page');
    el.innerHTML = `<h1>Quiz</h1>`;
    el.appendChild(createHeader(score));
    el.appendChild(createMain());
    el.appendChild(createFooter());
    return el;
}
