import { HEADER_LINKS, STATE } from "../data/globals.js";
import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";

export function createHeader(score = "") {
  const header = createElement({
    tag: "header",
    eClass: "header",
  });
  const headerWrapper = createElement({
    eClass: "container header__wrapper",
    parent: header,
  });
  const headerLogo = createElement({
    tag: "a",
    eClass: "header__logo",
    attr: { href: "#start" },
    parent: headerWrapper,
  });
  const controls = createElement({
    eClass: "controls",
    parent: headerWrapper,
  });
  const changeLang = createElement({
    tag: "input",
    eClass: "controls__input controls__input_lang",
    attr: { type: "checkbox", name: "toggle-lang" },
    parent: controls,
  });
  const changeLangLabel = createElement({
    tag: "label",
    eClass: "controls__label controls__label_lang",
    attr: { for: "toggle-lang" },
    parent: controls,
  });
  const changeBg = createElement({
    tag: "input",
    eClass: "controls__input",
    attr: { type: "checkbox", id: "toggle-theme" },
    parent: controls,
  });
  const changeBgLabel = createElement({
    tag: "label",
    eClass: "controls__label",
    attr: { for: "toggle-theme" },
    parent: controls,
  });
  const headerNavWrapper = createElement({
    eClass: "container game__wrapper",
    parent: header,
  });
  const headerLinks = createElements({
    arrLength: HEADER_LINKS.length,
    parent: headerNavWrapper,
    callback: (_item, index) => {
      const link = createElement({
        tag: "a",
        eClass: "header__link game__section",
        inner: `${HEADER_LINKS[index].text}`,
        attr: { href: HEADER_LINKS[index].link },
        parent: headerNavWrapper,
      });
      if (window.location.hash === link.hash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
      return link;
    },
  });
  changeBg.addEventListener("click", (e) => {
    STATE.theme = !STATE.theme;
    document.body.classList.toggle("dark");
  });
  if (STATE.theme === false) changeBg.checked = true;
  if (score) controls.appendChild(score);
  return header;
}
