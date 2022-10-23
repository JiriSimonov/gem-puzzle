import { createElement } from './utils/createElement.js';
import { createElementsArr } from './utils/createElementArr.js';
import { stopTimer, startTimer } from './index.js';


const listText = ['', '', '', '', '', '', '', '', '', ''];
export const score = createElement({tag: 'div', eClass: 'score'});
const scoreOverlay = createElement({tag: 'div', eClass: 'score__overlay', parent: score});
const scoreContent = createElement({tag: 'div', eClass: 'score__content', parent: scoreOverlay});
const scoreWrapper = createElement({tag: 'div', eClass: 'score__wrapper', parent: scoreContent});
const scoreTitle = createElement({tag: 'h2', eClass: 'score__title', parent: scoreWrapper, inner: 'Top results:'});
export const scoreList = createElement({tag: 'ol', eClass: 'score__list', parent: scoreWrapper});
const scoreItem = createElementsArr({arrLength: listText.length,parent: scoreList,
    callback: (_item, index) => createElement({tag: 'li', eClass: 'score__item', parent: scoreList, inner: listText[index]})});

scoreOverlay.addEventListener('click', (e) => {
    let target = e.target;
    if (target != scoreItem) {
        score.classList.remove('is--open');
        startTimer();
    }
});