import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import { FOOTER_INFO } from "../data/globals.js";

export function createFooter() {
  const footer = createElement({ tag: "footer", eClass: "footer" });
  const container = createElement({eClass: 'container', parent: footer});
  const footerWrapper = createElement({
    eClass: "footer__wrapper",
    parent: container,
  });
  const footerLinks = createElements({
    arrLength: FOOTER_INFO.text.length,
    parent: footerWrapper,
    callback: (_item, index) =>
      createElement({
        tag: "a",
        eClass: "footer__link",
        attr: { href: FOOTER_INFO.link[index], target: "_blank" },
        inner: `${FOOTER_INFO.text[index]}`,
      }),
  });
  const copyright = createElement({eClass: 'footer__copyright', parent: footerWrapper, inner: '2022'});
  return footer;
}
