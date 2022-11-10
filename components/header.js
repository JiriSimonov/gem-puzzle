import { createElement } from "../utils/createElement.js";

export function createHeader(score = '') {
  const header = createElement({
    tag: "header",
    eClass: "header",
  });
  const container = createElement({ eClass: "container", parent: header });
  const headerWrapper = createElement({
    eClass: "header__wrapper",
    parent: container,
  });
  const headerLogo = createElement({
    tag: "a",
    eClass: "header__logo",
    attr: { href: "/" },
    parent: headerWrapper,
  });
  const controls = createElement({
    eClass: 'controls',
    parent: headerWrapper,
  });
  const changeLang = createElement({
    tag: 'input',
    eClass: 'controls__input',
    attr: {'type': 'checkbox'},
    parent: controls,
  });
  const changeBg = createElement({
    tag: 'input',
    eClass: 'controls__input',
    attr: {'type': 'checkbox', 'id': 'toggle-theme'},
    parent: controls,
  });
  changeBg.addEventListener('click', (e) => {
    document.body.classList.toggle('dark');
  });
  const changeBgLabel = createElement({
    tag: 'label',
    eClass: 'controls__label',
    attr: {'for': 'toggle-theme'},
    parent: controls,
  });
  if(score) controls.appendChild(score);
  return header;
}
