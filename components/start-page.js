import { createElement } from "../utils/createElement.js";
import { createFooter } from "./footer.js";
import { createHeader } from "./header.js";

export default function createStartPage() {
  const el = document.createElement("div");
  el.classList.add("start-page");
  el.append(createHeader());
  const main = createElement({
    tag: "main",
    eClass: "main",
    parent: el,
  });
  el.append(createFooter());
  return el;
}
