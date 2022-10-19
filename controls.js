import { State } from './utils/state.js';
import { container, puzzlesArr, playGround,
    matrix, getMatrix, getShuffledArr, generateWinArr,
    blankNumber, stopTimer, timer, startTimer, playShuffleSound, printTime} from './index.js';
import { createElement } from './utils/createElement.js';
import { createElementsArr } from './utils/createElementArr.js';
import { rundomNum } from './utils/getRundomNum.js';
import { statsMovesCounter,
    statsTimerCounter, 
    statsTimerCounterSeconds } from './stats.js';

const optionsText = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
const btnsText = ['Start', 'Save', 'Results'];
const controlsPanel = createElement({tag: 'div', eClass: 'control-panel'});
const setFrameSelect = createElement({tag: 'select', eClass: 'control-panel__select', parent: controlsPanel, attr: {'name': 'frame-select'}});
let optionArr = createElementsArr({arrLength: optionsText.length, parent: setFrameSelect, callback: (item, index) => {
    item = createElement({tag: 'option', eClass: 'control-panel__option', inner: optionsText[index], attr: {'value': `${index + 3}`}});
    if (index == 1) item.selected = true;
    return item;
}});
const btnArr = createElementsArr({arrLength: btnsText.length, parent:controlsPanel,
    callback: (_item, index) => createElement({tag: 'button', eClass: 'control-panel__btn', inner: btnsText[index], attr: {'type': 'button', 'id': `${btnsText[index]}`}})});
const musicBtn = createElement({tag: 'button', eClass: 'control-panel__btn control-panel__btn_music', parent: controlsPanel});
let startBtn = btnArr[0];
let saveBtn = btnArr[1];
saveBtn.classList.add('is-playing');
let resultsBtn = btnArr[2];

startBtn.addEventListener('click', () => {
    if (State.isSoundOn === true) playShuffleSound();
    getShuffledArr();
    statsMovesCounter.innerHTML = '0';
    statsTimerCounter.innerHTML = '0';
    statsTimerCounterSeconds.innerHTML = '0';
    timer.time = 0;
    stopTimer();
    startTimer();
});

saveBtn.addEventListener('click', () => {
    if (saveBtn.classList.contains('is-playing')) {
        stopTimer();
        saveBtn.innerHTML = 'Save';
    } else {
        classList.add('is-playing');
        classList.innerHTML = 'Continue';
    } 
});

musicBtn.addEventListener('click', () => {
    if (State.isSoundOn === true) {
        musicBtn.style.backgroundImage = 'url(/jirisimonov-JSFE2022Q3/assets/icons/sound-off.svg)';
        State.isSoundOn = false;
    } else {
        musicBtn.style.backgroundImage = 'url(/jirisimonov-JSFE2022Q3/assets/icons/sound-on.svg)';
        State.isSoundOn = true;
    }
});

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
        matrix.push(...getMatrix(puzzlesArr.map((item) => Number(item.dataset.matrixId)), +currentFrame));
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