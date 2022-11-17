import { HEADER_LINKS, STATE } from "./data/globals.js";
import { createElement } from "./utils/createElement.js";
import { createElements } from "./utils/createElements.js";
import { getDataFromStorage, setStateToStorage } from "./utils/local-storage.js";

export function createHeader(score = "", lang = getDataFromStorage("lang")) {
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
    eClass: 'header__lang-container',
    parent: controls,
  });
  const ruLang = createElement({
    eClass: 'header__lang header__lang_ru',
    parent: changeLang,
    inner: 'RU',
  });
  ruLang.addEventListener('click', () => {
    setStateToStorage('lang', 'RU');
    ruLang.classList.add('lang');
    enLang.classList.remove('lang');
    location.reload();
  });
  const enLang = createElement({
    eClass: 'header__lang header__lang_en',
    parent: changeLang,
    inner: 'EN',
  });
  enLang.addEventListener('click', () => {    
    setStateToStorage('lang', 'EN');
    enLang.classList.add('lang');
    ruLang.classList.remove('lang');
    location.reload();
  })
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
    eClass: "game__wrapper",
    parent: header,
  });
  const headerLinks = createElements({
    arrLength: HEADER_LINKS.length,
    parent: headerNavWrapper,
    callback: (_item, index) => {
      const link = createElement({
        tag: "a",
        eClass: "header__link game__section",
        inner: lang === 'EN' ? HEADER_LINKS[index].textEn : HEADER_LINKS[index].text,
        attr: { href: HEADER_LINKS[index].link},
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
    setStateToStorage('theme', STATE.theme);
    document.body.classList.toggle("dark");
  });
  if (getDataFromStorage('theme') === false) {
    changeBg.checked = true;
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  if (getDataFromStorage('lang') === 'EN') {
    console.log(getDataFromStorage('lang'));    
    enLang.classList.add('lang');
  } else {
    console.log(getDataFromStorage('lang'));      
    ruLang.classList.add('lang');
  }
  if (score) controls.appendChild(score);
  return header;
}
