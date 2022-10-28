import { createElement } from './utils/createElement.js';

export const statsPanel = createElement({ eClass: 'stats-panel' });
const statsWrapper = createElement({ eClass: 'stats-panel__wrapper', parent: statsPanel });
const statsMoves = createElement({ eClass: 'stats-panel__moves', parent: statsWrapper, inner: 'Moves:' });
export const statsMovesCounter = createElement({ eClass: 'stats-panel__moves-counter', parent: statsWrapper, inner: '0' });
const statsTimer = createElement({ eClass: 'stats-panel__time', parent: statsWrapper, inner: 'Time:' });
export const statsTimerCounter = createElement({ eClass: 'stats-panel__timer-counter', parent: statsWrapper, inner: '00' });
export const statsTimerCounterSeconds = createElement({ eClass: 'stats-panel__timer-counter_seconds', parent: statsWrapper, inner: '00' });