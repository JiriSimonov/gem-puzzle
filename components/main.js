import BIRDS_DATA from "../data/data.js";
import { STATE, MAIN__SECTIONS } from "../data/globals.js";
import { headerScore } from "../index.js";
import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import { getRundomNum } from "../utils/getRundomNum.js";
import { setActiveSection } from "../utils/setActiveItem.js";
import { startTimer, stopTimer, timer} from "../utils/timer.js";
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
export const questionsWrapper = createElement({ eClass: "questions__wrapper" });
const questionsContainer = createElement({ eClass: "questions__container" });
const questionsDescription = createElement({ eClass: "questions__descr" });
export const questionsBtn = createElement({
  tag: "button",
  eClass: "game__btn",
  inner: "Следующий уровень",
  attr: { disabled: true },
});
const inputs = [];
const questionsLabels = createElements({
  arrLength: BIRDS_DATA.length,
  parent: questionsWrapper,
  callback: (_item, index) => {
    const label = createElement({
      tag: "label",
      eClass: "questions__label",
      inner: `${BIRDS_DATA[STATE.currentStep][index].name}`,
      parent: questionsWrapper,
    });
    const input = createElement({
      tag: "input",
      eClass: "questions__input",
      attr: { type: "checkbox", value: `${index + 1}` },
      parent: label,
    });
    input.addEventListener("click", () => {
      handleInputClick(input, label);
    });
    const span = createElement({
      tag: "span",
      eClass: "questions__checkbox",
      parent: label,
    });
    inputs.push(input);
    return label;
  }
});

function handleInputClick(input, parentNode) {
  const currentNum = input.value;
  questionsContainer.innerHTML = "";
  console.log(questionsContainer.closest('questions__descr'));
  createDescription(questionsContainer, currentNum);
  if (STATE.currentAnswer === +currentNum) {
    if (STATE.isGetAnswer === false) {
      STATE.isGetAnswer = true;
      clicks--;
      STATE.score = STATE.score + (BIRDS_DATA.length - 1 - clicks);
      clicks = 0;
      printScore(STATE.score);
      inputs.forEach((e) => {
        e.parentNode.classList.add("false");
      });
    }
    parentNode.classList.add("true");
    parentNode.classList.remove("false");
    questionsBtn.removeAttribute("disabled");
  } else {;
    if (STATE.isGetAnswer === false && parentNode.classList.contains('false') === false) {
      clicks++;
      parentNode.classList.add("false");
    }
  }
}
createQuestion();
const player = new Audio(BIRDS_DATA[STATE.currentStep][STATE.currentAnswer - 1].audio);
player.setAttribute('preload', 'metadata');
console.log(player);
/* audio */
const audioBtn = createElement({
    tag: "button",
    eClass: "audio__btn",
  });
  const audioProgress = createElement({
    tag: 'input',
    eClass: 'audio__progress',
    attr: {'type': 'range', 'min': 0, 'max': ``, 'value': '0', 'step': '0.1'},
  });
  const audioCurrentTime = createElement({
    eClass: "audio__time",
    inner: "00:00",
  });
  const audioFullTime = createElement({
    eClass: "audio__time",
    inner: `${BIRDS_DATA[STATE.currentStep][STATE.currentAnswer - 1].duration}`,
  });
  const audioQBtn = createElement({
    tag: "button",
    eClass: "audio__btn",
  });
  const audioQProgress = createElement({
    tag: 'input',
    eClass: 'audio__progress',
    attr: {'type': 'range', 'min': 0, 'max': ``, 'value': '0', 'step': '0.1'},
  });
  const audioQCurrentTime = createElement({
    eClass: "audio__time",
    inner: "00:00",
  });
  const audioQFullTime = createElement({
    eClass: "audio__time",
    inner: `${BIRDS_DATA[STATE.currentStep][STATE.currentAnswer - 1].duration}`,
  });
let clicks = 0;
setActiveSection(mainSections, STATE.currentStep);

function createInputs(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const newInput = createElement({
      tag: "input",
      eClass: "questions__input",
      attr: { type: "checkbox", value: `${i + 1}` },
      parent: questionsWrapper,
    });
    arr[i].appendChild(newInput);
    newArr.push(newInput);
  }
  return newArr;
}

function createSpans(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].appendChild(
      createElement({
        tag: "span",
        eClass: "questions__checkbox",
        parent: questionsWrapper,
      })
    );
  }
}

function createDescription(wrapper, number) {
  const descrContainer = createElement({
    eClass: "descr__container",
    parent: wrapper,
  });
  const descrImg = createElement({
    tag: "img",
    eClass: "descr__img",
    attr: { src: `${BIRDS_DATA[STATE.currentStep][number - 1].image}` },
    parent: descrContainer,
  });
  const descrContent = createElement({
    eClass: "descr__content",
    parent: descrContainer,
  });
  const descrTitle = createElement({
    tag: "h2",
    eClass: "descr__title",
    inner: `${BIRDS_DATA[STATE.currentStep][number - 1].name}`,
    parent: descrContent,
  });
  const descrSubTitle = createElement({
    tag: "h3",
    eClass: "descr__suptitle",
    inner: `${BIRDS_DATA[STATE.currentStep][number - 1].species}`,
    parent: descrContent,
  });
  const descrText = createElement({
    tag: "p",
    eClass: "descr__text",
    inner: `${BIRDS_DATA[STATE.currentStep][number - 1].description}`,
    parent: wrapper,
  });
}

export function createMain() {
  const main = createElement({ tag: "main", eClass: "main" });
  const game = createElement({ tag: "section", eClass: "game", parent: main });
  const container = createElement({ eClass: "container", parent: game });
  container.append(
    gameWrapper,
    createAudio(audioBtn, audioProgress, audioCurrentTime, audioFullTime),
    createQuestions(questionsWrapper, questionsContainer, questionsDescription),
    questionsBtn
  );
  return main;
}

function createQuestion() {
  STATE.currentAnswer = getRundomNum(1, BIRDS_DATA.length);
}

questionsBtn.addEventListener("click", (e) => {
  STATE.currentStep++;
  setActiveSection(mainSections, STATE.currentStep);
  createQuestion();
  questionsWrapper.innerHTML = "";
  questionsContainer.innerHTML = "";
  questionsLabels.splice(0);
  questionsLabels.push(
    ...createElements({
      arrLength: BIRDS_DATA.length,
      parent: questionsWrapper,
      callback: (_item, index) =>
        createElement({
          tag: "label",
          eClass: "questions__label",
          inner: `${BIRDS_DATA[STATE.currentStep][index].name}`,
          parent: questionsWrapper,
        }),
    })
  );
  inputs.splice(0);
  console.log(inputs, 'до пуша');
  console.log(inputs.length, 'до пуша');
  inputs.push(...createInputs(questionsLabels));
  console.log(inputs, 'после пуша');
  createSpans(questionsLabels);
  questionsBtn.setAttribute("disabled", true);
  inputs.forEach((e) => {
    e.addEventListener("click", (event) => {
      const currentNum = event.target.value;
      questionsContainer.innerHTML = "";
      createDescription(questionsContainer, currentNum);  
      console.log(questionsDescription);
      if (STATE.currentAnswer === +currentNum) {
        if (STATE.isGetAnswer === false) {
          STATE.isGetAnswer = true;
          clicks--;
          STATE.score = STATE.score + (BIRDS_DATA.length - 1 - clicks);
          clicks = 0;
          printScore(STATE.score);
          inputs.forEach((e) => {
            e.parentNode.classList.add("false");
          });
        }
        event.target.closest(".questions__label").classList.add("true");
        event.target.closest(".questions__label").classList.remove("false");
        questionsBtn.removeAttribute("disabled");
      } else {;
        if (STATE.isGetAnswer === false && e.closest(".questions__label").classList.contains('false') === false) {
          clicks++;
          event.target.closest(".questions__label").classList.add("false");
        }
      }
    });
  });
  STATE.isGetAnswer = false;
});

function printScore(num) {
  headerScore.innerHTML = `Счёт: ${num}`;
}

audioBtn.addEventListener('click', (e) => {
    if (audioCurrentTime.textContent === audioFullTime.textContent) {
        audioCurrentTime.textContent = '00:00';
    }
    if (audioBtn.classList.contains('is-play') === false) {
        audioBtn.classList.toggle('is-play');
        player.play();
        audioProgress.setAttribute('max', Math.floor(player.duration));
        STATE.isStartTimer = startTimer(audioCurrentTime, STATE.isStartTimer, audioProgress);
    } else {
        audioBtn.classList.toggle('is-play');
        player.pause();
        stopTimer();
    }
});

player.addEventListener('ended', () => {
    stopTimer();
    audioBtn.classList.toggle('is-play');
    timer.time = 0;
});

audioProgress.addEventListener('input', (e) => {
    stopTimer();
    player.currentTime = +audioProgress.value;
    console.log(audioProgress.value);
    timer.time = +audioProgress.value;
    audioBtn.classList.add('is-play');
    player.play();
    audioProgress.setAttribute('max', Math.floor(player.duration));
    STATE.isStartTimer = startTimer(audioCurrentTime, STATE.isStartTimer, audioProgress);
});