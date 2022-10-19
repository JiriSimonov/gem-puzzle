import { createElement } from './utils/createElement.js';

export const statsPanel = createElement({tag: 'div', eClass: 'stats-panel'});
const statsMoves = createElement({tag: 'div', eClass: 'stats-panel__moves', parent: statsPanel, inner: 'Moves:'});
const statsMovesCounter = createElement({tag: 'div', eClass: 'stats-panel__moves-counter', parent: statsMoves, inner: '0'});
const statsTimer = createElement({tag: 'div', eClass: 'stats-panel__time', parent: statsPanel, inner: 'Time:'});
const statsTimerCounter = createElement({tag: 'div', eClass: 'stats-panel__timer-counter', parent: statsTimer, inner: '00:00'});