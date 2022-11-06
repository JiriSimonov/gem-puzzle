import { createElement } from "./utils/createElement.js";
import { createElements } from "./utils/createElements.js";
import { STATE } from "./data/globals.js";
import { createHeader } from "./components/header.js";
import { createFooter } from "./components/footer.js";
import { createMain } from "./components/main.js";
import BIRDS_DATA from "./data/data.js";

export const app = document.getElementById("app");
export const headerScore = createElement({
  eClass: "header__score",
  inner: "Счёт: 0",
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

app.appendChild(createHeader(headerScore));
app.appendChild(createMain());
app.appendChild(createFooter());