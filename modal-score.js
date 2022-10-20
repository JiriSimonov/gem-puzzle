import { createElement } from './utils/createElement.js';
import { createElementsArr } from './utils/createElementArr.js';


const listText = ['You can be first','You can be first','You can be first','You can be first','You can be first','You can be first','You can be first','You can be first','You can be first','You can be first'];
export const score = createElement({tag: 'div', eClass: 'score'});
const scoreOverlay = createElement({tag: 'div', eClass: 'score__overlay', parent: score});
const scoreContent = createElement({tag: 'div', eClass: 'score__content', parent: scoreOverlay});
const scoreTitle = createElement({tag: 'h2', eClass: 'score__title', parent: scoreContent, inner: 'Top results:'});
const scoreList = createElement({tag: 'ol', eClass: 'score__list', parent: scoreContent});
const scoreItem = createElementsArr({arrLength: listText.length,parent: scoreList,
    callback: (_item, index) => createElement({tag: 'li', eClass: 'score__item', parent: scoreList, inner: listText[index]})});