import { createElement } from './utils/createElement.js';

const body = document.querySelector('body');
export const modal = createElement({tag: 'div', eClass: 'modal'});
const modalOverlay = createElement({tag: 'div', eClass: 'modal__overlay', parent: modal});
const modalContent = createElement({tag: 'div', eClass: 'modal__content', parent: modalOverlay});
const modalWrapper = createElement({tag: 'div', eClass: 'modal__wrapper', parent: modalContent});
const modalTitle = createElement({tag: 'h1', eClass: 'modal__title', parent: modalWrapper, inner: 'Grats!'});
const modalText = createElement({tag: 'p', eClass: 'modal__text', parent: modalWrapper, inner: 'You solved my game!'});
const modalScore = createElement({tag: 'div', eClass: 'modal__text', parent: modalWrapper, inner: 'Your score:'});
export const modalTurns = createElement({tag: 'div', eClass: 'modal__turns', parent: modalWrapper});
export const modalTime = createElement({tag: 'div', eClass: 'modal__time', parent: modalWrapper});
const modalForm = createElement({tag: 'form', eClass: 'modal__form', parent: modalWrapper});
const modalLabel = createElement({tag: 'label', eClass: 'modal__label', parent: modalForm});
const modalInput = createElement({tag: 'input', eClass: 'modal__input', parent: modalLabel,
    attr: {'required': true, 'type': 'text', 'placeholder': 'Enter your name'}});
const modalBtn = createElement({tag: 'button', eClass: 'modal__btn', parent: modalForm, inner: 'Add'});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modal.classList.toggle('modal--visible');
        body.classList.toggle('no-scroll');
    }
});