import { State } from './utils/state.js';
import { container, puzzlesArr, playGround,
    matrix, getMatrix, getShuffledArr, generateWinArr,
    blankNumber, stopTimer, timer} from './index.js';
import { createElement } from './utils/createElement.js';
import { createElementsArr } from './utils/createElementArr.js';
import { rundomNum } from './utils/getRundomNum.js';
import { statsMovesCounter,
    statsTimerCounter, 
    statsTimerCounterSeconds } from './stats.js';

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

setFrameSelect.addEventListener('change', (e) => {
    let currentFrame = e.target.value;
    if (+currentFrame != State.currentFrame) {
        State.currentFrame = +currentFrame;
        playGround.innerHTML = '';
        puzzlesArr.splice(0);
        puzzlesArr.push(...createElementsArr({arrLength: +State.currentFrame * +State.currentFrame, 
            parent: playGround, 
            callback: (_item, index) => createElement({tag: 'button', 
                eClass: 'playground__item', inner: `${index + 1}`,
                attr: {'style': `width: ${100 / currentFrame}%; height: ${100 / currentFrame}%`,}, 
                data: {'matrixId': `${index + 1}`},
                bg: `${rundomNum(1, 15)}`})}));
                
        puzzlesArr[puzzlesArr.length - 1].style.display = 'none';
        generateWinArr(currentFrame);
        matrix.splice(0);
        let newArr = puzzlesArr.map((item) => Number(item.dataset.matrixId));
        matrix.push(...getMatrix(newArr, +currentFrame));
        getShuffledArr();
        blankNumber.number = +currentFrame * +currentFrame;
        statsMovesCounter.innerHTML = '0';
        statsTimerCounter.innerHTML = '0';
        statsTimerCounterSeconds.innerHTML = '0';
        timer.time = 0;
        stopTimer();
    }
});

export default controlsPanel;