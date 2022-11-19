import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import { FOOTER_INFO } from "../data/globals.js";
import { getDataFromStorage } from "../utils/local-storage.js";


const lang = getDataFromStorage('lang');
export function createFooter() {
  const footer = createElement({ tag: "footer", eClass: "footer" });
  const container = createElement({ eClass: "container", parent: footer });
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

  const year = createElement({
    eClass: 'footer__year',
    inner: '2022',
    parent: footerWrapper,
  });

  const rsLink = createElement({
    tag: "a",
    eClass: "footer__link footer__link--bg",
    attr: { href: 'https://rs.school/js/', target: "_blank" },
    inner: ``,
    parent: footerWrapper,
  });

  const swan = createElement({ 
    eClass: "swan", 
    parent: footerWrapper,
    attr: {'title': `${getDataFromStorage('lang') == 'EN' ? 'Click me!' : 'Кликни!'}`}
  });
  const modal = createElement({
    eClass: "modal",
    parent: footer,
});
const modalOverlay = createElement({
    eClass: "modal__overlay",
    parent: modal,
});
const modalContent = createElement({
  eClass: "modal__content",
  parent: modalOverlay,
});
const modalInfo = createElement({
  eClass: "modal__info",
  parent: modalContent,
});
const modalText = createElement({
  tag: "p",
  eClass: "modal__text",
  inner: lang == 'EN' ? '🍒Thanks to Cherry for the beautiful design!🍒' : '🍒Спасибо за дизайн чудесной Cherry!🍒',
  parent: modalInfo,
});
const modalLink = createElement({
  tag: "a",
  eClass: "modal__link",
  inner: lang == 'EN' ? `Link to design's author` : '🍒Ссылка на автора дизайна🍒',
  attr: {'href': '', 'target': '_blank'},
  parent: modalInfo,
});

const modalImg = createElement({
  tag: 'img',
  eClass: 'modal__img',
  attr: {'src': '../assets/images/modal.png'},
  parent: modalInfo,
});
modalOverlay.addEventListener("click", (e) => {
  let target = e.target;
  if (target === modalOverlay) {
    modal.classList.toggle('is-open');
  }
});
  swan.addEventListener('click', () => {
    modal.classList.toggle('is-open');
  });
  return footer;
}
