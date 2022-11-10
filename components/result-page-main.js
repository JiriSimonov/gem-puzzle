import { createElement } from "../utils/createElement.js";

export function createMainResults() {
  const main = createElement({
    tag: "main",
    eClass: "main",
  });
  const container = createElement({
    eClass: 'container',
    parent: main,
  });
  const mainWrapper = createElement({
    eClass: 'main__wrapper',
    parent: container,
  });
  const mainTitle = createElement({
    tag: 'h2',
    eClass: 'main__title',
    inner: 'Поздравляем!',
    parent: mainWrapper,
  });
  const mainDescr = createElement({
    tag: 'p',
    eClass: 'main__descr',
    inner: 'Вы прошли викторину и набрали 20 из 30 возможных баллов :)',
    parent: mainWrapper,
  });
  const mainBtn = createElement({
    tag: 'button',
    eClass: 'main__btn',
    inner: 'Сыграть еще',
    parent: mainWrapper,
  });
  return main;
}
