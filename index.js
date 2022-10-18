import { State } from './utils/state.js';
import { createElement } from './utils/createElement.js';
import controlsPanel from './controls.js';
import { createElementsArr } from './utils/createElementArr.js';
import { bottm } from './bottom-side.js';

const body = document.querySelector('body');
export const container = createElement({tag: 'div', eClass: 'container', parent: body});
const puzzesWrapper = createElement({tag: 'div', eClass: 'puzzles', parent: container});

puzzesWrapper.appendChild(controlsPanel);
export const playGround = createElement({tag: 'div', eClass: 'playground', parent: puzzesWrapper});
puzzesWrapper.appendChild(bottm);
export const puzzlesArr = createElementsArr({
    arrLength: +State.currentFrame * +State.currentFrame, 
    parent: playGround, 
    callback: (_item, index) => createElement({tag: 'button', eClass: 'playground__item', 
    inner: `${index + 1}`, 
    data: {'matrixId': `${index + 1}`},
    bg: `${index + 1}`
})});
