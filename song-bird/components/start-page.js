import { createElement } from "../utils/createElement.js";
import { createFooter } from "./footer.js";
import { createHeader } from "../song-bird/header.js";
import { getDataFromStorage } from "../utils/local-storage.js";

const startPageText = {
  title: 'Have fun...',
  titleEn: 'Веселись...',
  link: 'Начать',
  linkEn: 'Start',
}

export default function createStartPage(lang = getDataFromStorage('lang')) {
  const el = document.createElement("div");
  el.classList.add("start-page");
  el.append(createHeader());
  const main = createElement({
    tag: "main",
    eClass: "main",
    parent: el,
  });
  const container = createElement({
    eClass: "container",
    parent: main,
  });
  const mainTitle = createElement({
    tag: 'h1',
    eClass: 'title',
    inner: lang === 'EN' ? startPageText.title : startPageText.titleEn,
    parent: container,
  });
  const mainLink = createElement({
    tag: 'a',
    eClass: 'link',
    attr: {'href': '#quiz'},
    inner: lang === 'EN' ? startPageText.linkEn : startPageText.link,
    parent: container,
  });
  el.append(createFooter());
  return el;
}
