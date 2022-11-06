import BIRDS_DATA from "../data/data.js";
import { STATE, MAIN__SECTIONS } from "../data/globals.js";
import { headerScore } from "../index.js";
import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import { getRundomNum } from "../utils/getRundomNum.js";
import { createAudio } from "./audio.js";
import { createQuestions } from "./questions.js";

const gameWrapper = createElement({ eClass: "game__wrapper" });
export const mainSections = createElements({
  arrLength: MAIN__SECTIONS.length,
  parent: gameWrapper,
  callback: (_item, index) =>
    createElement({
      eClass: "game__section",
      inner: `${MAIN__SECTIONS[index]}`,
      parent: gameWrapper,
    }),
});
export const questionsWrapper = createElement({eClass: 'questions__wrapper'});
const questionsContainer = createElement({ eClass: 'questions__container'});
const questionsDescription = createElement({ eClass: 'questions__descr'});
export const questionsBtn = createElement({
    tag: "button",
    eClass: "game__btn",
    inner: "Следующий уровень",
    attr: { disabled: true },
  });
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
let clicks = 0;

createSpans(questionsLabels);
createQuestion();
setActiveSection(mainSections, STATE.currentStep);

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

export function createMain() {
    const main = createElement({tag: 'main', eClass: 'main'});
    const game = createElement({tag: 'section', eClass: 'game', parent: main});
    const container = createElement({eClass: 'container', parent: game});
    container.append(gameWrapper, createAudio(), createQuestions(questionsWrapper, questionsContainer, questionsDescription), questionsBtn);
    return main;
}

function createQuestion() {
    STATE.currentAnswer = getRundomNum(1, BIRDS_DATA.length);
}

inputs.forEach((e) => {
    e.addEventListener('click', (event) => {
        if (STATE.isGetAnswer === false) clicks++;
        const currentNum = event.target.value;
        questionsContainer.innerHTML = '';
        createDescription(questionsContainer, currentNum);
        if (STATE.currentAnswer === +currentNum) {
            if (STATE.isGetAnswer === false) {
                STATE.isGetAnswer = true;
                clicks--;
                STATE.score =  STATE.score + (BIRDS_DATA.length - 1 - clicks);
                clicks = 0;
                printScore(STATE.score);
                inputs.forEach((e) => {
                    e.parentNode.classList.add('false');
                })
            }
            event.target.closest('.questions__label').classList.add('true');
            questionsBtn.removeAttribute('disabled');
        } else {
            event.target.closest('.questions__label').classList.add('false');
        }
    });    
});

questionsBtn.addEventListener('click', (e) => {
    STATE.currentStep++;
    setActiveSection(mainSections, STATE.currentStep);
    createQuestion();
    questionsWrapper.innerHTML = '';
    questionsContainer.innerHTML = '';
    questionsLabels.splice(0);
    questionsLabels.push(...createElements({
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
    }));
    inputs.splice(0);
    inputs.push(...createInputs(questionsLabels));
    createSpans(questionsLabels);
    questionsBtn.setAttribute('disabled', true);
    inputs.forEach((e) => {
        e.addEventListener('click', (event) => {
            if (STATE.isGetAnswer === false) clicks++;
            const currentNum = event.target.value;
            questionsContainer.innerHTML = '';
            createDescription(questionsContainer, currentNum);
            if (STATE.currentAnswer === +currentNum) {
                if (STATE.isGetAnswer === false) {
                    STATE.isGetAnswer = true;
                    clicks--;
                    STATE.score =  STATE.score + (BIRDS_DATA.length - 1 - clicks);
                    clicks = 0;
                    printScore(STATE.score);
                    inputs.forEach((e) => {
                        e.parentNode.classList.add('false');
                    })
                }
                event.target.closest('.questions__label').classList.add('true');
                questionsBtn.removeAttribute('disabled');
            } else {
                event.target.closest('.questions__label').classList.add('false');
            }
        });    
    });
    STATE.isGetAnswer = false;
});

function setActiveSection(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (i === num) {
      arr[i].classList.add("active");
    } else {
      arr[i].classList.remove("active");
    }
  }
}

function printScore(num) {
    headerScore.innerHTML = `Счёт: ${num}`;
}