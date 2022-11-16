import { createElement } from "../utils/createElement.js";
import { createFooter } from "./footer.js";
import { createHeader } from "../header.js";

export default function createStartPage() {
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
    inner: 'Have fun...',
    parent: container,
  });
  const mainLink = createElement({
    tag: 'a',
    eClass: 'link',
    attr: {'href': '#quiz'},
    inner: 'Start',
    parent: container,
  });
  el.append(createFooter());
  return el;
}
