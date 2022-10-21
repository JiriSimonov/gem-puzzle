import { createElement } from './utils/createElement.js';
import { State } from './utils/state.js';
import { scoreList } from './modal-score.js';
import { startTimer, stopTimer, timer } from './index.js';
import { getScoreFromStorage, setStateToStorage } from './utils/localStrage.js';

const body = document.querySelector('body');
export const modal = createElement({tag: 'div', eClass: 'modal'});
const modalOverlay = createElement({tag: 'div', eClass: 'modal__overlay', parent: modal});
const modalContent = createElement({tag: 'div', eClass: 'modal__content', parent: modalOverlay});
const modalWrapper = createElement({tag: 'div', eClass: 'modal__wrapper', parent: modalContent});
export const modalScore = createElement({tag: 'div', eClass: 'modal__text', parent: modalWrapper, inner: 'Your score:'});
const modalForm = createElement({tag: 'form', eClass: 'modal__form', parent: modalWrapper});
const modalLabel = createElement({tag: 'label', eClass: 'modal__label', parent: modalForm});
const modalInput = createElement({tag: 'input', eClass: 'modal__input', parent: modalLabel,
    attr: {'required': true, 'type': 'text', 'placeholder': 'Enter your name', 'maxlength': '14'}});
const modalBtn = createElement({tag: 'button', eClass: 'modal__btn', parent: modalForm, inner: 'Add'});
const results = Array.from(scoreList.childNodes);

modalOverlay.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalOverlay) {
        modal.classList.toggle('modal--visible');
        body.classList.toggle('no-scroll');
    }
});

modalBtn.addEventListener('click', (e) => {
    if (modalInput.value != '') {
        if (getScoreFromStorage()) {
            const data = getScoreFromStorage();
            const newResult = {
                moves: State.moves,
                result: `${modalInput.value} score: ${State.moves} moves, ${State.currentTime.minutes} minutes and  ${State.currentTime.seconds} seconds`
            }
            const results = Object.keys(data);
            for (let i = 0; i < results.length; i++) {
                if (data[results[i]] === null) {
                    data[results[i]] = newResult;
                    console.log(data[results[i]]);
                    setStateToStorage('Score', data);
                    break;
                }
                if (data[results[i]].moves > newResult.moves) {
                    data[results[i]] = newResult;
                    setStateToStorage('Score', data);
                    break;
                }
            }
            modal.classList.toggle('modal--visible');
            body.classList.toggle('no-scroll');
            stopTimer();
        } else {
            const Score = {
                player1: null,
                player2: null,
                player3: null,
                player4: null,
                player5: null,
                player6: null,
                player7: null,
                player8: null,
                player9: null,
                player10: null
            }
            setStateToStorage('Score', Score);
            const data = getScoreFromStorage();
            const newResult = {
                moves: State.moves,
                result: `${modalInput.value} score: ${State.moves} moves, ${State.currentTime.minutes} minutes and  ${State.currentTime.seconds} seconds`
            }
            const results = Object.keys(data);
            for (let i = 0; i < results.length; i++) {
                if (data[results[i]] === null) {
                    data[results[i]] = newResult;
                    console.log('null')
                    console.log(data[results[i]]);
                    setStateToStorage('Score', data);
                    break;
                }
                if (data[results[i]].moves < newResult.moves) {
                    data[results[i]] = newResult;
                    console.log('menshe');
                    setStateToStorage('Score', data);
                    break;
                }
            }
            modal.classList.toggle('modal--visible');
            body.classList.toggle('no-scroll');
            stopTimer();
            timer.time = 0;
            startTimer();
        }
    }
});

