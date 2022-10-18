import { State } from './utils/state.js';
import { container, puzzlesArr, playGround } from './index.js';
import { createElement } from './utils/createElement.js';
import { createElementsArr } from './utils/createElementArr.js';

const optionsText = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
const btnsText = ['Start', 'Stop', 'Save', 'Results'];
const controlsPanel = createElement({tag: 'div', eClass: 'control-panel'});
const setFrameSelect = createElement({tag: 'select', eClass: 'control-panel__select', parent: controlsPanel, attr: {'name': 'frame-select'}});
let optionArr = createElementsArr({arrLength: optionsText.length, parent: setFrameSelect, callback: (item, index) => {
    item = createElement({tag: 'option', eClass: 'control-panel__option', inner: optionsText[index], attr: {'value': `${index + 3}`}});
    if (index == 1) item.selected = true;
    return item;
}});
const btnArr = createElementsArr({arrLength: btnsText.length, parent:controlsPanel, callback: (_item, index) => createElement({tag: 'button', eClass: 'control-panel__btn', inner: btnsText[index], attr: {'type': 'button'}})});

setFrameSelect.addEventListener('change', () => {
    let currentFrame = setFrameSelect.value;
    State.currentFrame = +currentFrame;
    if (currentFrame !== State.currentFrame) {
        playGround.innerHTML = '';
        puzzlesArr.splice(0);
        puzzlesArr.push(...createElementsArr({arrLength: +State.currentFrame * +State.currentFrame, parent: playGround, callback: (_item, index) => createElement({tag: 'button', eClass: 'playground__item', inner: `${index + 1}`, data: {'matrixId': `${index + 1}`}})}));
    }
});

export default controlsPanel;