import { STATE } from "../data/globals.js";
import { createElement } from "../utils/createElement.js";

export function createMainResults() {
  const main = createElement({
    tag: "main",
    eClass: "main",
  });
  const container = createElement({
    eClass: "container",
    parent: main,
  });
  const mainWrapper = createElement({
    eClass: "main__wrapper",
    parent: container,
  });
  const mainTitle = createElement({
    tag: "h2",
    eClass: "main__title",
    inner: "Поздравляем!",
    parent: mainWrapper,
  });
  const mainDescr = createElement({
    tag: "p",
    eClass: "main__descr",
    inner: `Вы прошли викторину и набрали <span class='results__bold'>${STATE.score}</span> из <span class='results__bold'>30</span> возможных баллов :)`,
    parent: mainWrapper,
  });
  const mainBtn = createElement({
    tag: "button",
    eClass: "main__btn",
    inner: "Сыграть еще",
    parent: mainWrapper,
  });
  mainBtn.addEventListener("click", () => {
    STATE.score = 0;
    STATE.currentStep = 0;
    STATE.isGameEnd = true;
    window.location.hash = "#quiz";
  });
  return main;
}
