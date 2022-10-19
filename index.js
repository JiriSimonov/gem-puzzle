import { State } from './utils/state.js';
import { createElement } from './utils/createElement.js';
import { rundomNum } from './utils/getRundomNum.js';
import controlsPanel from './controls.js';
import { createElementsArr } from './utils/createElementArr.js';
import { bottm } from './bottom-side.js';
import { modal } from './modal.js';
import { statsPanel, statsMovesCounter, statsTimerCounter, statsTimerCounterSeconds } from './stats.js';

const body = document.querySelector('body');
export const container = createElement({tag: 'div', eClass: 'container', parent: body});
const puzzlesWrapper = createElement({tag: 'div', eClass: 'puzzles', parent: container});
const setNewBg = createElement({tag: 'button', eClass: 'btn', parent: puzzlesWrapper, inner: 'Switch background', attr: {'type' : 'button'}});
puzzlesWrapper.appendChild(controlsPanel);
puzzlesWrapper.appendChild(statsPanel);
export const playGround = createElement({tag: 'div', eClass: 'playground', parent: puzzlesWrapper});
puzzlesWrapper.appendChild(bottm);
body.appendChild(modal);

export const movesCounter = {moves: 0};
export const timer = {time: 0};
let timerCounter;

setNewBg.addEventListener('click', () => {
    puzzlesWrapper.style.background = `url('./assets/backrounds/bg-${rundomNum(1, 7)}.jpg')`;
});

export const puzzlesArr = createElementsArr({
    arrLength: +State.currentFrame * +State.currentFrame, 
    parent: playGround, 
    callback: (_item, index) => createElement({tag: 'button', eClass: 'playground__item', 
    inner: `${index + 1}`, 
    data: {'matrixId': `${index + 1}`},
    bg: `${index + 1}`
})});

puzzlesArr[puzzlesArr.length - 1].style.display = 'none';
export let matrix = getMatrix(puzzlesArr.map((item) => Number(item.dataset.matrixId)), +State.currentFrame);

export function getShuffledArr() {
    const shuffledArr = shuffleArray(matrix.flat());
    matrix = getMatrix(shuffledArr, +State.currentFrame);
    return setPositionItems(matrix);
}

getShuffledArr();

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



function setPositionItems(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = puzzlesArr[value - 1];
            setNodeStyles(node, x, y);
        }
    }
}

function shuffleArray(arr) {
    return arr
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
}
export const blankNumber = {number: +State.currentFrame * +State.currentFrame};
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
        setPositionItems(matrix);
    }
});

function getBtnPositionByNumber(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === number) return {x, y};
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
    const audio = createElement({tag: 'audio', eClass: 'audio', parent:body, inner: '<source src=\"./assets/audio/audio.mp3\" type=\"audio/mpeg\">', attr: {'autoplay': true}});
    setTimeout(() => {
        body.removeChild(audio);
    }, 300);
}

export function playShuffleSound() {
    const audio = createElement({tag: 'audio', eClass: 'audio', parent:body, inner: '<source src=\"./assets/audio/shuffle.mp3\" type=\"audio/mpeg\">', attr: {'autoplay': true}});
    setTimeout(() => {
        body.removeChild(audio);
    }, 400);
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
}

export function printTime(sec, min) {
    statsTimerCounterSeconds.innerHTML = `${(sec < 10 ? sec.toString().padStart(2, '0') : sec)}`;
    statsTimerCounter.innerHTML = `${(min < 10 ? min.toString().padStart(2, '0') : min)}`;
}

export function startTimer() {
    if (timer.time <= 0) {
        timerCounter = setInterval(function() {
            timer.time += 1/60;
            const secondsValue = Math.floor(timer.time) - Math.floor(timer.time / 60) * 60;
            const minutesValue = Math.floor(timer.time / 60);
            printTime(secondsValue, minutesValue);
        }, 1000/60);
    }
}

export function stopTimer() {
    clearInterval(timerCounter);
}