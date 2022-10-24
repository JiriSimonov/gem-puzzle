import { createElement } from './utils/createElement.js';
import { createElementsArr } from './utils/createElementArr.js';
import { startTimer } from './index.js';
import { printScore } from './controls.js';


const listText = ['', '', '', '', '', '', '', '', '', ''];
const btnText = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
export const score = createElement({ eClass: 'score' });
const scoreOverlay = createElement({ eClass: 'score__overlay', parent: score });
const scoreContent = createElement({ eClass: 'score__content', parent: scoreOverlay });
const scoreWrapper = createElement({ eClass: 'score__wrapper', parent: scoreContent });
const scoreTitle = createElement({ tag: 'h2', eClass: 'score__title', parent: scoreWrapper, inner: 'Top results:' });
export const scoreList = createElement({ tag: 'ol', eClass: 'score__list', parent: scoreWrapper });
const scoreItem = createElementsArr({
    arrLength: listText.length, parent: scoreList,
    callback: (_item, index) => createElement({ tag: 'li', eClass: 'score__item', parent: scoreList, inner: listText[index] })
});
const scorePanel = createElement({ eClass: 'score__panel', parent: scoreContent });
export const scoreBtn = createElementsArr({
    arrLength: btnText.length, parent: scorePanel,
    callback: (_item, index) => createElement({ tag: 'button', eClass: 'score__btn', parent: scorePanel, inner: btnText[index], attr: { 'type': 'button' } })
});

scoreOverlay.addEventListener('click', (e) => {
    let target = e.target;
    if (target === scoreOverlay) {
        score.classList.remove('is--open');
        startTimer();
    }
});

scoreBtn.forEach((e) => {
    e.addEventListener('click', (e) => {
        scoreBtn.forEach((i) => {
            i.classList.remove('is--selected');
        })
        e.target.classList.add('is--selected');
        let target = e.target.textContent;
        printScore(parseInt(target[0]));
    });
});