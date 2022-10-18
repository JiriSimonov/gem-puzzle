const body = document.querySelector('body');


/* создаем элементы*/
let container = document.createElement('div');
container.className = 'container';
let puzzlesWrapper = document.createElement('div');
puzzlesWrapper.className = 'puzzles';

// controls
let controls = document.createElement('div');
controls.className = 'controls';
// кнопка выбора фрейма
let setFrameBtn = document.createElement('select');
setFrameBtn.setAttribute('name', 'setFrame');
setFrameBtn.className = 'controls__select';
let setOptionOne = document.createElement('option');
setOptionOne.setAttribute('value', '4x4');
setOptionOne.innerHTML = '4x4';
setFrameBtn.appendChild(setOptionOne);
let setOptionTwo = document.createElement('option');
setOptionTwo.setAttribute('value', '5x5');
setOptionTwo.innerHTML = '5x5';
setFrameBtn.appendChild(setOptionTwo);
let setOptionThree = document.createElement('option');
setOptionThree.setAttribute('value', '6x6');
setOptionThree.innerHTML = '6x6';
setFrameBtn.appendChild(setOptionThree);
let setOptionFour = document.createElement('option');
setOptionFour.setAttribute('value', '7x7');
setOptionFour.innerHTML = '7x7';
setFrameBtn.appendChild(setOptionFour);
let setOptionFive = document.createElement('option');
setOptionFive.setAttribute('value', '8x8');
setOptionFive.innerHTML = '8x8';
setFrameBtn.appendChild(setOptionFive);

let startBtn = document.createElement('button');
startBtn.className = 'controls__btn controls__btn_start';
startBtn.innerHTML = 'Start';
let saveBtn = document.createElement('button');
saveBtn.className = 'controls__btn controls__btn_save';
saveBtn.innerHTML = 'Save';
let stopBtn = document.createElement('button');
stopBtn.innerHTML = 'Stop';
stopBtn.className = 'controls__btn controls__btn_stop';

// собираем кнопки
controls.appendChild(setFrameBtn);
controls.appendChild(startBtn);
controls.appendChild(stopBtn);
controls.appendChild(saveBtn);


// добавляем в верстку
body.appendChild(container);
container.appendChild(puzzlesWrapper);
puzzlesWrapper.appendChild(controls);
