import { State } from './utils/state.js';
import {
    puzzlesArr, playGround,
    matrix, getMatrix, generateWinArr,
    blankNumber, stopTimer, timer, startTimer,
    movesCounter, setPositionItems, randomShuffle, resetGameState, printGameTimeAndSteps
} from './index.js';
import { createElement } from './utils/createElement.js';
import { createElementsArr } from './utils/createElementArr.js';
import { rundomNum } from './utils/getRundomNum.js';
import {
    statsMovesCounter,
    statsTimerCounter,
    statsTimerCounterSeconds
} from './stats.js';
import { setStateToStorage, getDataFromStorage } from './utils/localStorage.js';
import { score, scoreList, scoreBtn } from './modal-score.js';

const optionsText = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
const btnsText = ['Restart', 'Save', 'Results'];
export const controlsPanel = createElement({ eClass: 'control-panel' });
const setFrameSelect = createElement({ tag: 'select', eClass: 'control-panel__select', parent: controlsPanel, attr: { 'name': 'frame-select' } });
let optionArr = createElementsArr({
    arrLength: optionsText.length, parent: setFrameSelect, callback: (item, index) => {
        item = createElement({ tag: 'option', eClass: 'control-panel__option', inner: optionsText[index], attr: { 'value': `${index + 3}` } });
        if (index == 1) item.selected = true;
        return item;
    }
});
let btnArr = createElementsArr({
    arrLength: btnsText.length, parent: controlsPanel,
    callback: (_item, index) => createElement({ tag: 'button', eClass: 'control-panel__btn', inner: btnsText[index], attr: { 'type': 'button', 'id': `${btnsText[index]}` } })
});
const [startBtn, saveBtn, resultsBtn] = btnArr;
const musicBtn = createElement({ tag: 'button', eClass: 'control-panel__btn control-panel__btn_music', parent: controlsPanel });
export const shuffleSound = new Audio('./assets/audio/shuffle.mp3');
export const switchSound = new Audio('./assets/audio/audio.mp3');

resultsBtn.addEventListener('click', () => {
    stopTimer();
    score.classList.add('is--open');
    scoreBtn.forEach((e) => {
        if (parseInt(e.textContent) == State.currentFrame) {
            e.classList.add('is--selected');
        } else {
            e.classList.remove('is--selected');
        }
        printScore(State.currentFrame);
    });
});

startBtn.addEventListener('click', () => {
    if (State.isSoundOn === true) {
        shuffleSound.currentTime = 0;
        shuffleSound.play();
    }
    randomShuffle();
});

function isHasSavedGame() {
    if (localStorage.getItem('State') == null) {
    } else {
        saveBtn.innerHTML = 'Continue';
        State.isPlay = false;
    }
}

isHasSavedGame();
saveBtn.addEventListener('click', () => {
    if (State.isPlay === true) {
        State.isPlay = false;
        State.currentMaxtrix = matrix;
        stopTimer();
        setStateToStorage('State', State);
        saveBtn.innerHTML = 'Continue';
    } else {
        const storageData = getDataFromStorage('State');
        matrix.splice(0);
        matrix.push(...storageData.currentMaxtrix);
        State.currentFrame = storageData.currentFrame;
        playGround.innerHTML = '';
        puzzlesArr.splice(0);
        puzzlesArr.push(...createElementsArr({
            arrLength: +State.currentFrame * +State.currentFrame,
            parent: playGround,
            callback: (_item, index) => createElement({
                tag: 'button',
                eClass: 'playground__item', inner: `${index + 1}`,
                attr: { 'style': `width: ${100 / +State.currentFrame}%; height: ${100 / +State.currentFrame}%`, 'draggable': 'true', 'tabindex': '-1' },
                data: { 'matrixId': `${index + 1}` },
                bg: `${rundomNum(1, 15)}`
            })
        }));
        puzzlesArr[puzzlesArr.length - 1].style.display = 'none';
        blankNumber.number = +State.currentFrame * +State.currentFrame;
        setPositionItems(matrix, puzzlesArr);
        setFrameSelect.value = State.currentFrame;
        State.isPlay = true;
        saveBtn.innerHTML = 'Save';
        movesCounter.moves = storageData.moves;
        statsMovesCounter.innerHTML = movesCounter.moves;
        State.currentTime.seconds = storageData.currentTime.seconds;
        State.currentTime.minutes = storageData.currentTime.minutes;
        timer.time = State.currentTime.seconds + State.currentTime.minutes * 60;
        startTimer();
        localStorage.removeItem('State');
    }
});

musicBtn.addEventListener('click', () => {
    if (State.isSoundOn === true) {
        musicBtn.style.backgroundImage = 'url(./assets/icons/sound-off.svg)';
        State.isSoundOn = false;
    } else {
        musicBtn.style.backgroundImage = 'url(./assets/icons/sound-on.svg)';
        State.isSoundOn = true;
    }
});

setFrameSelect.addEventListener('change', (e) => {
    let currentFrame = e.target.value;
    if (+currentFrame != State.currentFrame) {
        State.currentFrame = +currentFrame;
        playGround.innerHTML = '';
        puzzlesArr.splice(0);
        puzzlesArr.push(...createElementsArr({
            arrLength: +State.currentFrame * +State.currentFrame,
            parent: playGround,
            callback: (_item, index) => createElement({
                tag: 'button',
                eClass: 'playground__item', inner: `${index + 1}`,
                attr: { 'style': `width: ${100 / currentFrame}%; height: ${100 / currentFrame}%`, 'draggable': 'true', 'tabindex': '-1' },
                data: { 'matrixId': `${index + 1}` },
                bg: `${rundomNum(1, 15)}`
            })
        }));

        puzzlesArr[puzzlesArr.length - 1].style.display = 'none';
        generateWinArr(currentFrame);
        matrix.splice(0);
        randomShuffle();
        matrix.push(...getMatrix(puzzlesArr.map((item) => Number(item.dataset.matrixId)), +currentFrame));
        blankNumber.number = +currentFrame * +currentFrame;
        resetGameState(movesCounter, State, State);
        printGameTimeAndSteps(statsMovesCounter, statsTimerCounter, statsTimerCounterSeconds, timer);
        stopTimer();
    }
});

export function printScore(frameSize) {
    if (getDataFromStorage('Score') === null) {
        const Score = {
            resultsFrame3: [],
            resultsFrame4: [],
            resultsFrame5: [],
            resultsFrame6: [],
            resultsFrame7: [],
            resultsFrame8: [],
        }
        setStateToStorage('Score', Score);
    }
    let resultsData = getDataFromStorage('Score');
    let data = resultsData[`resultsFrame${frameSize}`];
    let scoreItems = Array.from(scoreList.childNodes);
    for (let i = 0; i < scoreItems.length; i++) {
        if (data[i] === undefined) {
            scoreItems[i].innerHTML = 'unknown';
        } else {
            scoreItems[i].innerHTML = data[i].result;
        }
    }
}