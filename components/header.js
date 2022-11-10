import { createElement } from "../utils/createElement.js";

export function createHeader(score) {
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
  headerWrapper.appendChild(score);
  return header;
}
