import { createElement } from "./utils/createElement.js";
import { createElements } from "./utils/createElements.js";
import { MAIN__SECTIONS, STATE } from "./data/globals.js";
import { createHeader } from "./components/header.js";
import { createFooter } from "./components/footer.js";
import { createMain } from "./components/main.js";
import BIRDS_DATA from "./data/data.js";

export const app = document.getElementById("app");

const headerScore = createElement({
  eClass: "header__score",
  inner: "Счёт: 0",
});

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

const questionsWrapper = createElement({ eClass: "questions__wrapper" });
const questionsArr = createElements({
  arrLength: BIRDS_DATA.length,
  parent: questionsWrapper,
  callback: (_item, index) =>
    createElement({
      tag: "input",
      eClass: "footer__link",
      attr: { type: "checkbox" },
      inner: `${BIRDS_DATA[index.name]}`,
      parent: questionsWrapper,
    }),
});

export const questionsBtn = createElement({
  tag: "button",
  eClass: "game__btn",
  inner: "Следующий уровень",
  attr: { disabled: true },
});

app.appendChild(createHeader(headerScore));
app.appendChild(createMain(gameWrapper, questionsBtn));
app.appendChild(createFooter());

setActiveSection(mainSections, STATE.currentStep);

function setActiveSection(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (i === num) {
      arr[i].classList.add("active");
    } else {
      arr[i].classList.remove("active");
    }
  }
}


