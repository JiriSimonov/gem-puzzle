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
  const headerLink = createElement({
    tag: "a",
    eClass: "header__link",
    inner: "На главную",
    parent: headerWrapper,
    attr: { href: "/" },
  });
  headerWrapper.appendChild(score);
  return header;
}
