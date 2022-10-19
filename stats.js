import { createElement } from './utils/createElement.js';

export const statsPanel = createElement({tag: 'div', eClass: 'stats-panel'});
const statsWrapper = createElement({tag: 'div', eClass: 'stats-panel__wrapper', parent: statsPanel});
const statsMoves = createElement({tag: 'div', eClass: 'stats-panel__moves', parent: statsWrapper, inner: 'Moves:'});
export const statsMovesCounter = createElement({tag: 'div', eClass: 'stats-panel__moves-counter', parent: statsWrapper, inner: '0'});
const statsTimer = createElement({tag: 'div', eClass: 'stats-panel__time', parent: statsWrapper, inner: 'Time:'});
export const statsTimerCounter = createElement({tag: 'div', eClass: 'stats-panel__timer-counter', parent: statsWrapper, inner: '00:00'});