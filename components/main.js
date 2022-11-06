import BIRDS_DATA from "../data/data.js";
import { STATE } from "../data/globals.js";
import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import { getRundomNum } from "../utils/getRundomNum.js";
import { createAudio } from "./audio.js";
import { createQuestions } from "./questions.js";


const questionsWrapper = createElement({eClass: 'questions__wrapper'});
const questionsLabels = createElements({
    arrLength: BIRDS_DATA.length,
    parent: questionsWrapper,
    callback: (_item, index) =>
      createElement({
        tag: "label",
        eClass: "questions__label",
        attr: { 'type': 'checkbox' },
        inner: `${BIRDS_DATA[STATE.currentStep][index].name}`,
        parent: questionsWrapper,
    }),
});

createInputs(questionsLabels);
createSpans(questionsLabels);

function createInputs(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].appendChild(createElement({        
        tag: "input",
        eClass: "questions__input",
        attr: { 'type': 'checkbox' },
        parent: questionsWrapper,}));
    }
}

function createSpans(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].appendChild(createElement({        
        tag: "span",
        eClass: "questions__checkbox",
        parent: questionsWrapper,}));
    }
}

export function createMain(wrapper, btn) {
    const main = createElement({tag: 'main', eClass: 'main'});
    const game = createElement({tag: 'section', eClass: 'game', parent: main});
    const container = createElement({eClass: 'container', parent: game});
    container.append(wrapper, createAudio(), createQuestions(questionsWrapper));
    container.appendChild(btn);
    return main;
}

function createQuestion() {
    STATE.currentAnswer = getRundomNum(1, BIRDS_DATA.length);
}

createQuestion();
console.log(STATE.currentAnswer);