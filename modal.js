import { createElement } from './utils/createElement.js';

const body = document.querySelector('body');
export const modal = createElement({tag: 'div', eClass: 'modal'});
const modalOverlay = createElement({tag: 'div', eClass: 'modal__overlay', parent: modal});
const modalContent = createElement({tag: 'div', eClass: 'modal__content', parent: modalOverlay});
const modalTitle = createElement({tag: 'h1', eClass: 'modal__title', parent: modalContent, inner: 'Grats!'});
const modalText = createElement({tag: 'p', eClass: 'modal__text', parent: modalContent, inner: 'you solved my game'});
const modalScore = createElement({tag: 'div', eClass: 'modal__text', parent: modalContent, inner: 'your score:'});
const modalTurns = createElement({tag: 'div', eClass: 'modal__turns', parent: modalContent, inner: 'turns: 56'});
const modalTime = createElement({tag: 'div', eClass: 'modal__time', parent: modalContent, inner: ' time:56:28'});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modal.classList.toggle('modal--visible');
        body.classList.toggle('no-scroll');
    }
});