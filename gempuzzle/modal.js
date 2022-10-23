import { createElement } from './utils/createElement.js';
import { State } from './utils/state.js';
import { startTimer, stopTimer, timer, playShuffleSound, randomShuffle } from './index.js';
import { getScoreFromStorage, setStateToStorage } from './utils/localStrage.js';

const body = document.querySelector('body');
export const modal = createElement({ tag: 'div', eClass: 'modal' });
const modalOverlay = createElement({ tag: 'div', eClass: 'modal__overlay', parent: modal });
const modalContent = createElement({ tag: 'div', eClass: 'modal__content', parent: modalOverlay });
const modalWrapper = createElement({ tag: 'div', eClass: 'modal__wrapper', parent: modalContent });
export const modalScore = createElement({ tag: 'div', eClass: 'modal__text', parent: modalWrapper, inner: 'Your score:' });
const modalForm = createElement({ tag: 'form', eClass: 'modal__form', parent: modalWrapper });
const modalLabel = createElement({ tag: 'label', eClass: 'modal__label', parent: modalForm });
const modalInput = createElement({
    tag: 'input', eClass: 'modal__input', parent: modalLabel,
    attr: { 'required': true, 'type': 'text', 'placeholder': 'Enter your name', 'maxlength': '14' }
});
const modalBtn = createElement({ tag: 'button', eClass: 'modal__btn', parent: modalForm, inner: 'Add' });

modalOverlay.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalOverlay) {
        if (getScoreFromStorage()) {
            const data = getScoreFromStorage();
            const newResult = {
                moves: State.moves,
                result: `Unknown ${State.moves} moves, time: ${State.currentTime.minutes}:${State.currentTime.seconds}`
            }
            data[`resultsFrame${State.currentFrame}`].push(newResult);
            data[`resultsFrame${State.currentFrame}`].sort((a, b) => a.moves - b.moves);
            data[`resultsFrame${State.currentFrame}`].splice(10);
            setStateToStorage('Score', data);
            stopTimer();
            if (State.isSoundOn === true) playShuffleSound();
            randomShuffle();
        } else {
            const Score = {
                resultsFrame3: [],
                resultsFrame4: [],
                resultsFrame5: [],
                resultsFrame6: [],
                resultsFrame7: [],
                resultsFrame8: [],
            }
            const newResult = {
                moves: State.moves,
                result: `Unknown ${State.moves} moves, time: ${State.currentTime.minutes}:${State.currentTime.seconds}`
            }
            Score[`resultsFrame${State.currentFrame}`].push(newResult);
            setStateToStorage('Score', Score);
            modal.classList.toggle('modal--visible');
            body.classList.toggle('no-scroll');
            stopTimer();
            timer.time = 0;
            startTimer();
        }
        modal.classList.remove('modal--visible');
        body.classList.remove('no-scroll');
    }
});

modalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (modalInput.value != '') {
        if (getScoreFromStorage()) {
            const data = getScoreFromStorage();
            console.log(data[`resultsFrame${State.currentFrame}`]); // работает!!!

            const newResult = {
                moves: State.moves,
                result: `${modalInput.value} ${State.moves} moves, time: ${State.currentTime.minutes}:${State.currentTime.seconds}`
            }
            data[`resultsFrame${State.currentFrame}`].push(newResult);
            data[`resultsFrame${State.currentFrame}`].sort((a, b) => a.moves - b.moves);
            data[`resultsFrame${State.currentFrame}`].splice(10);
            setStateToStorage('Score', data);
            modal.classList.toggle('modal--visible');
            body.classList.toggle('no-scroll');
            stopTimer();
        } else {
            const Score = {
                resultsFrame3: [],
                resultsFrame4: [],
                resultsFrame5: [],
                resultsFrame6: [],
                resultsFrame7: [],
                resultsFrame8: [],
            }
            const newResult = {
                moves: State.moves,
                result: `${modalInput.value} ${State.moves} moves, time: ${State.currentTime.minutes}:${State.currentTime.seconds}`
            }
            Score[`resultsFrame${State.currentFrame}`].push(newResult);
            setStateToStorage('Score', Score);
            modal.classList.toggle('modal--visible');
            body.classList.toggle('no-scroll');
            stopTimer();
            timer.time = 0;
            startTimer();
        }
    }
});