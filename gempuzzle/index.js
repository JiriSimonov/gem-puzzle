import { State } from './utils/state.js';
import { createElement } from './utils/createElement.js';
import { rundomNum } from './utils/getRundomNum.js';
import controlsPanel from './controls.js';
import { createElementsArr } from './utils/createElementArr.js';
import { footer } from './bottom-side.js';
import { modal, modalScore } from './modal.js';
import { statsPanel, statsMovesCounter, statsTimerCounter, statsTimerCounterSeconds } from './stats.js';
import { score } from './modal-score.js';

const body = document.querySelector('body');
export const container = createElement({ eClass: 'container', parent: body });
const puzzlesWrapper = createElement({ eClass: 'puzzles', parent: container });
const setNewBg = createElement({ eClass: 'btn', parent: body, inner: 'Switch background', attr: { 'type': 'button' } });
puzzlesWrapper.appendChild(controlsPanel);
puzzlesWrapper.appendChild(statsPanel);
export const playGround = createElement({ eClass: 'playground is-shuffle', parent: puzzlesWrapper });
body.appendChild(footer);
body.appendChild(modal);
body.appendChild(score);

export const movesCounter = { moves: 0 };
export const timer = { time: 0 };
export const blankNumber = { number: +State.currentFrame * +State.currentFrame };
const maxShuffle = 100;
let blockedPosition = null;
let shuffleTimer;
let shuffleCounter = 0;
clearInterval(shuffleTimer);
export function randomShuffle() {
    playGround.classList.add('is-shuffle');
    stopTimer();
    if (State.isSoundOn === true) playShuffleSound();
    statsMovesCounter.innerHTML = '0';
    statsTimerCounterSeconds.innerHTML = '00';
    if (shuffleCounter === 0) {
        shuffleTimer = setInterval(() => {
            randomSwap(matrix);
            setPositionItems(matrix, puzzlesArr);
            ++shuffleCounter;
            if (shuffleCounter >= maxShuffle) {
                clearInterval(shuffleTimer);
                shuffleCounter = 0;
                playGround.classList.remove('is-shuffle');
                statsMovesCounter.innerHTML = '0';
                statsTimerCounter.innerHTML = '0';
                statsTimerCounterSeconds.innerHTML = '0';
                State.currentTime.minutes = 0;
                State.currentTime.seconds = 0;
                movesCounter.moves = 0;
                timer.time = 0;
                stopTimer();
                startTimer();
            }
        }, 30);
    }
}
randomShuffle();
setNewBg.addEventListener('click', () => {
    body.style.backgroundImage = `url('./assets/backrounds/bg-${rundomNum(1, 7)}.jpg')`;
});

export const puzzlesArr = createElementsArr({
    arrLength: +State.currentFrame * +State.currentFrame,
    parent: playGround,
    callback: (_item, index) => createElement({
        tag: 'button', eClass: 'playground__item',
        attr: { 'draggable': 'true' },
        inner: `${index + 1}`,
        data: { 'matrixId': `${index + 1}` },
        bg: `${index + 1}`
    })
});

puzzlesArr[puzzlesArr.length - 1].style.display = 'none';
export let matrix = getMatrix(puzzlesArr.map((item) => Number(item.dataset.matrixId)), +State.currentFrame);

export function randomSwap(matrix) {
    const blankPosition = getBtnPositionByNumber(blankNumber.number, matrix);
    const validPositions = getValidPosition({
        blankPosition,
        matrix,
        blockedPosition
    });

    const swapPositions = validPositions[
        Math.floor(Math.random() * validPositions.length)
    ];
    switchBtns(blankPosition, swapPositions, matrix);
    blockedPosition = blankPosition;
}

export function getValidPosition({ blankPosition, matrix, blockedPosition }) {
    const validPositions = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (isPossibleForSwitch({ x, y }, blankPosition)) {
                if (blockedPosition === null || !(blockedPosition.x === x && blockedPosition.y === y)) {
                    validPositions.push({ x, y });
                }
            }
        }
    }
    return validPositions;
}

export function getMatrix(arr, currentFrame) {
    let matrix = [];
    for (let i = 0; i < currentFrame; i++) {
        matrix.push([]);
    }
    let y = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
        if (x >= currentFrame) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x++;
    }
    return matrix
}

function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${shiftPs * x}%, ${shiftPs * y}%, 0)`;
}



export function setPositionItems(matrix, arr) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = arr[value - 1];
            setNodeStyles(node, x, y);
        }
    }
}

playGround.addEventListener('click', (event) => {
    const currentBtn = event.target.closest('.playground__item');
    if (!currentBtn) return;
    const btnNumber = +currentBtn.dataset.matrixId;
    const btnPosition = getBtnPositionByNumber(btnNumber, matrix);
    const blankPosition = getBtnPositionByNumber(blankNumber.number, matrix);
    const isPossible = isPossibleForSwitch(btnPosition, blankPosition);

    if (isPossible) {
        switchBtns(blankPosition, btnPosition, matrix);
        if (State.isSoundOn === true) playSound();
        startTimer();
        statsMovesCounter.innerHTML = ++movesCounter.moves;
        State.moves = movesCounter.moves;
        setPositionItems(matrix, puzzlesArr);
        State.currentMaxtrix = matrix;
    }
});

playGround.addEventListener('dragstart', ({ target }) => {
    target.setAttribute('id', 'isDragged');
});
playGround.addEventListener('dragend', (event) => {
    event.preventDefault();
    event.target.removeAttribute('id');
});

playGround.addEventListener('dragover', (event) => {
    event.preventDefault();
});

playGround.addEventListener('drop', (event) => {
    const currentBtn = document.getElementById('isDragged');
    if (event.target == playGround) {
        event.preventDefault();
        const btnNumber = +currentBtn.dataset.matrixId;
        const btnPosition = getBtnPositionByNumber(btnNumber, matrix);
        const blankPosition = getBtnPositionByNumber(blankNumber.number, matrix);
        const isPossible = isPossibleForSwitch(btnPosition, blankPosition);
        if (isPossible) {
            switchBtns(blankPosition, btnPosition, matrix);
            if (State.isSoundOn === true) playSound();
            startTimer();
            statsMovesCounter.innerHTML = ++movesCounter.moves;
            State.moves = movesCounter.moves;
            setPositionItems(matrix, puzzlesArr);
            State.currentMaxtrix = matrix;
        }
    }
});

playGround.addEventListener('touchstart', (e) => {
    e.preventDefault();
    let target = e.target;
    const currentBtn = target;
    const btnNumber = +currentBtn.dataset.matrixId;
    const btnPosition = getBtnPositionByNumber(btnNumber, matrix);
    const blankPosition = getBtnPositionByNumber(blankNumber.number, matrix);
    const isPossible = isPossibleForSwitch(btnPosition, blankPosition);
    if (isPossible) {
        switchBtns(blankPosition, btnPosition, matrix);
        if (State.isSoundOn === true) playSound();
        startTimer();
        statsMovesCounter.innerHTML = ++movesCounter.moves;
        State.moves = movesCounter.moves;
        setPositionItems(matrix, puzzlesArr);
        State.currentMaxtrix = matrix;
    }
});

function getBtnPositionByNumber(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === number) return { x, y };
        }
    }
    return null;
}

function isPossibleForSwitch(posOne, posTwo) {
    const diffX = Math.abs(posOne.x - posTwo.x);
    const diffY = Math.abs(posOne.y - posTwo.y);
    return (diffX === 1 || diffY === 1) && (posOne.x === posTwo.x || posOne.y === posTwo.y);
}

function switchBtns(posOne, posTwo, matrix) {
    const posNumber = matrix[posOne.y][posOne.x];
    matrix[posOne.y][posOne.x] = matrix[posTwo.y][posTwo.x];
    matrix[posTwo.y][posTwo.x] = posNumber;
    if (isWon(matrix)) {
        addWon();
    }
}

function playSound() {
    const audio = createElement({ tag: 'audio', eClass: 'audio', parent: body, inner: '<source src=\"./assets/audio/audio.mp3\" type=\"audio/mpeg\">', attr: { 'autoplay': true } });
    setTimeout(() => {
        body.removeChild(audio);
    }, 300);
}

export function playShuffleSound() {
    const audio = createElement({ tag: 'audio', eClass: 'audio', parent: body, inner: '<source src=\"./assets/audio/shuffle.mp3\" type=\"audio/mpeg\">', attr: { 'autoplay': true } });
    setTimeout(() => {
        body.removeChild(audio);
    }, 2000);
}

export function generateWinArr(currentFrame) {
    const winArr = new Array(currentFrame * currentFrame).fill(0).map((_item, index) => index + 1);
    return winArr;
}
function isWon(matrix) {
    const flatMatrix = matrix.flat();
    let winArr = generateWinArr(State.currentFrame);
    for (let i = 0; i < winArr.length; i++) {
        if (flatMatrix[i] !== winArr[i]) {
            return false;
        }
    }
    return true;
}

function addWon() {
    body.classList.toggle('no-scroll');
    modal.classList.toggle('modal--visible');
    stopTimer();
    modalScore.innerHTML = `Hooray! You solved the puzzle in ${State.currentTime.minutes.toString().padStart(2, '0')}:${State.currentTime.seconds.toString().padStart(2, '0')} and ${State.moves} moves!`
    stopTimer();
}

export function printTime(sec, min) {
    statsTimerCounterSeconds.textContent = `${(sec < 10 ? sec.toString().padStart(2, '0') : sec)}`;
    statsTimerCounter.textContent = `${(min < 10 ? min.toString().padStart(2, '0') : min)}`;
    State.currentTime.seconds = sec;
    State.currentTime.minutes = min;
}

export function startTimer() {
    if (!State.isStartTimer) {
        State.isStartTimer = setInterval(function () {
            timer.time += 1 / 60;
            const secondsValue = Math.floor(timer.time) - Math.floor(timer.time / 60) * 60;
            const minutesValue = Math.floor(timer.time / 60);
            printTime(secondsValue, minutesValue);
        }, 1000 / 60);
    }
}

export function stopTimer() {
    clearInterval(State.isStartTimer);
    State.isStartTimer = null;
}