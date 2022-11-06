import BIRDS_DATA from "../data/data.js";
import { STATE } from "../data/globals.js";
import { mainSections, questionsBtn } from "../index.js";
import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import { getRundomNum } from "../utils/getRundomNum.js";
import { createAudio } from "./audio.js";
import { createQuestions } from "./questions.js";

export const questionsWrapper = createElement({eClass: 'questions__wrapper'});
const questionsContainer = createElement({ eClass: 'questions__container'});
const questionsDescription = createElement({ eClass: 'questions__descr'});

const questionsLabels = createElements({
    arrLength: BIRDS_DATA.length,
    parent: questionsWrapper,
    callback: (_item, index) =>
      createElement({
        tag: "label",
        eClass: "questions__label",
        data: { 'birdId': `${index + 1}` },
        inner: `${BIRDS_DATA[STATE.currentStep][index].name}`,
        parent: questionsWrapper,
    }),
});

const inputs = createInputs(questionsLabels);
createSpans(questionsLabels);

function createInputs(arr) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        const newInput = (createElement({        
            tag: "input",
            eClass: "questions__input",
            attr: { 'type': 'checkbox', 'value': `${i + 1}`},
            parent: questionsWrapper,}));
            arr[i].appendChild(newInput);
            newArr.push(newInput);
    }
    return newArr;
}

function createSpans(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].appendChild(createElement({        
        tag: "span",
        eClass: "questions__checkbox",
        parent: questionsWrapper,}));
    }
}

function createDescription(wrapper, number) {
    const descrContainer = createElement({eClass: 'descr__container', parent: wrapper});
    const descrImg = createElement({tag: 'img', eClass: 'descr__img', attr: {'src': `${BIRDS_DATA[STATE.currentStep][number - 1].image}`}, parent: descrContainer});
    const descrContent = createElement({eClass: 'descr__content', parent: descrContainer});
    const descrTitle = createElement({tag: 'h2', eClass: 'descr__title', inner: `${BIRDS_DATA[STATE.currentStep][number - 1].name}`, parent: descrContent});
    const descrSubTitle = createElement({tag: 'h3', eClass: 'descr__suptitle', inner: `${BIRDS_DATA[STATE.currentStep][number - 1].species}`, parent: descrContent});
    const descrText = createElement({tag: 'p', eClass: 'descr__text', inner: `${BIRDS_DATA[STATE.currentStep][number - 1].description}`, parent: wrapper});
}

export function createMain(wrapper, btn) {
    const main = createElement({tag: 'main', eClass: 'main'});
    const game = createElement({tag: 'section', eClass: 'game', parent: main});
    const container = createElement({eClass: 'container', parent: game});
    container.append(wrapper, createAudio(), createQuestions(questionsWrapper, questionsContainer, questionsDescription));
    container.appendChild(btn);
    return main;
}

function createQuestion() {
    STATE.currentAnswer = getRundomNum(1, BIRDS_DATA.length);
}

createQuestion();

inputs.forEach((e) => {
    e.addEventListener('click', (e) => {
        const currentNum = e.target.value;
        questionsContainer.innerHTML = '';
        createDescription(questionsContainer, currentNum);
        if (STATE.currentAnswer === +currentNum) {
            STATE.currentStep++;
            questionsBtn.removeAttribute('disabled');
        }
    });    
});
