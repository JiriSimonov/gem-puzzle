import { createElement } from "../utils/createElement.js";

export function createHeader(score) {
    const header = createElement({ 
        tag: "header",
        eClass: "header" 
    });
    const container = createElement({eClass: 'container', parent: header});
    const headerWrapper = createElement({
      eClass: "header__wrapper",
      parent: header,
    });
    const headerLogo = createElement({
      eClass: "header__logo",
      parent: headerWrapper,
    });
    const headerLink = createElement({
      tag: "a",
      eClass: "header__link",
      inner: "main",
      parent: headerWrapper,
      attr: { href: "/" },
    });
    headerWrapper.appendChild(score);
    return header;
}

