import { State } from './utils/state.js';
import { createElement } from './utils/createElement.js';
import controlsPanel from './controls.js';
import { createElementsArr } from './utils/createElementArr.js';
import { bottm } from './bottom-side.js';

const body = document.querySelector('body');
export const container = createElement({tag: 'div', eClass: 'container', parent: body});
const puzzesWrapper = createElement({tag: 'div', eClass: 'puzzles', parent: container});

puzzesWrapper.appendChild(controlsPanel);
export const playGround = createElement({tag: 'div', eClass: 'playground', parent: puzzesWrapper});
puzzesWrapper.appendChild(bottm);
export const puzzlesArr = createElementsArr({
    arrLength: +State.currentFrame * +State.currentFrame, 
    parent: playGround, 
    callback: (_item, index) => createElement({tag: 'button', eClass: 'playground__item', 
    inner: `${index + 1}`, 
    data: {'matrixId': `${index + 1}`},
    bg: `${index + 1}`
})});
puzzlesArr[puzzlesArr.length - 1].style.display = 'none';
let matrix = getMatrix(puzzlesArr.map((item) => Number(item.dataset.matrixId)));

function getShuffledArr() {
    const shuffledArr = shuffleArray(matrix.flat());
    matrix = getMatrix(shuffledArr);
    return setPositionItems(matrix);
}

getShuffledArr();

function getMatrix(arr) {
    const matrix = [[],[],[],[]];
    let y = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
        if (x >= 4) {
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
            console.log(value);
            console.log(node);
            console.log(setNodeStyles(node, x, y));
        }
    }
}

function shuffleArray(arr) {
    return arr
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
}