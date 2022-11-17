import BIRDS_DATA from "../data/data.js";
import BIRD_DATA_EN from "../data/dataEn.js";
import { STATE, MAIN_SECTIONS } from "../data/globals.js";
import { headerScore } from "../router.js";
import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import { getRundomNum } from "../utils/getRundomNum.js";
import { getDataFromStorage } from "../utils/local-storage.js";
import { setActiveSection } from "../utils/setActiveItem.js";
import { startTimer, stopTimer, timer } from "../utils/timer.js";
import { createAudio } from "./audio.js";
import { createQuestions } from "./questions.js";

const lang = getDataFromStorage('lang') == 'EN' ? BIRD_DATA_EN : BIRDS_DATA;
const currentlang = getDataFromStorage('lang') == 'EN' ? "EN" : "RU";
const gameWrapper = createElement({ eClass: "game__wrapper" });
export const mainSections = createElements({
  arrLength: BIRDS_DATA.length,
  parent: gameWrapper,
  callback: (_item, index) =>
  createElement({
    eClass: "game__section",
    inner: currentlang === 'EN' ? MAIN_SECTIONS[1].title[index] : MAIN_SECTIONS[0].title[index],
    parent: gameWrapper,
  }),
});
export const questionsWrapper = createElement({ eClass: "questions__wrapper" });
const questionsContainer = createElement({ eClass: "questions__container" });
const questionsDescription = createElement({ eClass: "questions__descr" });
const correctAnswer = new Audio('./assets/audio/correct-answer.mp3');
const incorrectAnswer = new Audio('./assets/audio/incorrect-answer.mp3');

export const questionsBtn = createElement({
  tag: "button",
  eClass: "game__btn",
  inner: currentlang == 'EN' ? "Next level": "Следующий уровень",
  attr: { disabled: true },
});
const questionsDescr = createElement({
  eClass: "questions__text",
  inner: currentlang == 'EN' ? "Next level": "Listen to the player",
});
const questionsSecondDescr = createElement({
  eClass: "questions__text",
  inner: currentlang == 'EN' ? "Select a bird from the list": "Выберите птицу из списка",
});
let clicks = 0;
setActiveSection(mainSections, STATE.currentStep);
const inputs = [];
const questionsLabels = createElements({
  arrLength: BIRDS_DATA.length,
  parent: questionsWrapper,
  callback: (_item, index) => {
    const label = createElement({
      tag: "label",
      eClass: "questions__label",
      inner: `${lang[STATE.currentStep][index].name}`,
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
  },
});

function handleInputClick(input, parentNode) {
  const currentNum = input.value;
  questionsContainer.innerHTML = "";
  createDescription(questionsContainer, currentNum);
  if (STATE.currentAnswer === +currentNum) {
    if (STATE.isGetAnswer === false) {
      STATE.isGetAnswer = true;
      clicks--;
      STATE.score = STATE.score + ((BIRDS_DATA.length - 2) - clicks);
      printScore(STATE.score);
      clicks = 0;
      showAnswer(true);
      inputs.forEach((e) => {
        e.parentNode.classList.add("false");
      });
    }
    parentNode.classList.add("true");
    parentNode.classList.remove("false");
    questionsBtn.removeAttribute("disabled");
  } else {
    if (
      STATE.isGetAnswer === false &&
      parentNode.classList.contains("false") === false
    ) {
      clicks++;
      parentNode.classList.add("false");
      incorrectAnswer.currentTime = 0;
      incorrectAnswer.play();
    }
  }
}
createQuestion();
const player = new Audio(
  BIRDS_DATA[STATE.currentStep][STATE.currentAnswer - 1].audio
);

player.setAttribute("preload", "metadata");

/* audio */
const audioTitle = createElement({
  tag: "h2",
  eClass: "descr__title",
  inner: "***",
});
const audioImg = createElement({
  eClass: "audio__img",
});
const audioBtn = createElement({
  tag: "button",
  eClass: "audio__btn",
});
const audioProgress = createElement({
  tag: "input",
  eClass: "audio__progress",
  attr: { type: "range", min: 0, max: ``, value: "0", step: "0.1" },
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
  tag: "input",
  eClass: "audio__progress",
  attr: { type: "range", min: 0, max: ``, value: "0", step: "0.1" },
});
const audioQCurrentTime = createElement({
  eClass: "audio__time",
  inner: "00:00",
});
const audioQFullTime = createElement({
  eClass: "audio__time",
  inner: `${BIRDS_DATA[STATE.currentStep][STATE.currentAnswer - 1].duration}`,
});

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
    inner: `${lang[STATE.currentStep][number - 1].name}`,
    parent: descrContent,
  });
  const descrSubTitle = createElement({
    tag: "h3",
    eClass: "descr__suptitle",
    inner: `${lang[STATE.currentStep][number - 1].species}`,
    parent: descrContent,
  });
  const descrText = createElement({
    tag: "p",
    eClass: "descr__text",
    inner: `${lang[STATE.currentStep][number - 1].description}`,
    parent: wrapper,
  });
}

export function createMain() {
  const main = createElement({ tag: "main", eClass: "main" });
  const game = createElement({ tag: "section", eClass: "game", parent: main });
  const container = createElement({ eClass: "container", parent: game });
  container.append(
    gameWrapper,
    createAudio(
      audioBtn,
      audioProgress,
      audioCurrentTime,
      audioFullTime,
      audioImg,
      audioTitle
    ),
    createQuestions(questionsWrapper, questionsContainer, questionsDescription),
    questionsBtn
  );
  if (STATE.isGameEnd === true) {
    STATE.isGameEnd = false;
    clearQuestions();
    createQuestion();
    STATE.isGetAnswer = false;
    STATE.score = 0;
    STATE.currentStep = 0;
    setActiveSection(mainSections, STATE.currentStep);
    printScore(STATE.score);
  }
  return main;
}
export function createQuestion() {
  STATE.currentAnswer = getRundomNum(1, BIRDS_DATA.length);
}

questionsBtn.addEventListener("click", (e) => {
  STATE.currentStep++;
  stopTimer();
  if (STATE.currentStep === BIRDS_DATA.length) {
    window.location.hash = "#results";
    STATE.isGameEnd = true;
    STATE.currentStep = 0;
    STATE.isGetAnswer = false;
  } else {
    setActiveSection(mainSections, STATE.currentStep);
    clearQuestions();
    createQuestion();
    questionsContainer.append(questionsDescr, questionsSecondDescr);
    STATE.isGetAnswer = false;
    showAnswer(false);
    stopTimer();
    player.src = BIRDS_DATA[STATE.currentStep][STATE.currentAnswer - 1].audio;
    player.currentTime = 0;
    audioFullTime.textContent =
      BIRDS_DATA[STATE.currentStep][STATE.currentAnswer - 1].duration;
    audioCurrentTime.textContent = "00:00";
    audioBtn.className = "audio__btn";
    audioProgress.value = 0;
  }
});

function printScore(num, lang = getDataFromStorage('lang')) {
  if (lang == 'RU') {
    headerScore.innerHTML = `Счёт: ${num}`;
  } else {
    headerScore.innerHTML = `Score: ${num}`;
  }
}

audioBtn.addEventListener("click", (e) => {
  if (audioCurrentTime.textContent === audioFullTime.textContent) {
    audioCurrentTime.textContent = "00:00";
  }
  if (audioBtn.classList.contains("is-play") === false) {
    audioBtn.classList.toggle("is-play");
    player.play();
    audioProgress.setAttribute("max", Math.floor(player.duration));
    STATE.isStartTimer = startTimer(
      audioCurrentTime,
      STATE.isStartTimer,
      audioProgress
    );
  } else {
    audioBtn.classList.toggle("is-play");
    player.pause();
    stopTimer();
  }
});

player.addEventListener("ended", () => {
  stopTimer();
  audioBtn.classList.toggle("is-play");
  timer.time = 0;
});

audioProgress.addEventListener("input", (e) => {
  stopTimer();
  player.currentTime = +audioProgress.value;
  timer.time = +audioProgress.value;
  audioBtn.classList.add("is-play");
  player.play();
  audioProgress.setAttribute("max", Math.floor(player.duration));
  STATE.isStartTimer = startTimer(
    audioCurrentTime,
    STATE.isStartTimer,
    audioProgress
  );
});

function clearQuestions() {
  showAnswer(false);
  if (currentlang == 'RU') {
    if (STATE.currentStep + 1 === BIRDS_DATA.length) {
      questionsBtn.textContent = "Узнать результат!";
    } else {
      questionsBtn.textContent = "Следующий уровень";
    }
  } else {
    if (STATE.currentStep + 1 === BIRDS_DATA.length) {
      questionsBtn.textContent = "Show results!";
    } else {
      questionsBtn.textContent = "Next level";
    }
  }
  questionsWrapper.innerHTML = ""; // вынести в функцию
  questionsContainer.innerHTML = "";
  questionsLabels.splice(0);
  inputs.splice(0);
  questionsLabels.push(
    ...createElements({
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
      },
    })
  );
  questionsBtn.setAttribute("disabled", true);
}

function showAnswer(boolean) {
  if (boolean) {  
    audioImg.style.backgroundImage = `url(${
      BIRDS_DATA[STATE.currentStep][STATE.currentAnswer - 1].image
    })`;
    correctAnswer.play();
    audioTitle.textContent =
      lang[STATE.currentStep][STATE.currentAnswer - 1].name;
  } else {
    audioImg.style.backgroundImage = `url("assets/images/unknown.png")`;
    audioTitle.textContent = "***";
  }
}
