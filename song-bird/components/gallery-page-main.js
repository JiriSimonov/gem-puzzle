import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import BIRDS_DATA from "../data/data.js";
import BIRD_DATA_EN from "../data/dataEn.js";
import { STATE } from "../data/globals.js";
import { getDataFromStorage } from "../utils/local-storage.js";
import { startGTimer, stopGTimer, timer } from "../utils/timer.js";

const curentLang = getDataFromStorage('lang');
export function createMainGallery() {
    const lang = getDataFromStorage('lang') == 'EN' ? BIRD_DATA_EN : BIRDS_DATA;
    const inputs = [];
    const main = createElement({
        tag: "main",
        eClass: "main",
    });
    const container = createElement({
        eClass: "container",
        parent: main,
    });
    const gallery = createElement({
        eClass: "gallery",
        parent: container,
    });
    const galleryItems = createElements({
        arrLength: BIRDS_DATA.length,
        parent: gallery,
        callback: (_item, index) => {
            const path = lang[STATE.currentStep][index];
            const galleryItem = createElement({
                eClass: "gallery__item",
                parent: gallery,
            });
            const galleryImg = createElement({
                tag: "img",
                eClass: "gallery__img",
                attr: { src: `${path.image}` },
                parent: galleryItem,
            });
            const galleryTitle = createElement({
                tag: "h2",
                eClass: "gallery__title",
                inner: path.name,
                parent: galleryItem,
            });
            const gallerySubtitle = createElement({
                tag: "h3",
                eClass: "gallery__subtitle",
                inner: path.species,
                parent: galleryItem,
            });
            const tooltip = createElement({
                eClass: "tooltip",
                parent: galleryItem,
            });
            const tooltipBtn = createElement({
                tag: "button",
                eClass: "tooltip__btn",
                attr: { id: `${index + 1}` },
                inner: curentLang == 'EN' ? 'Learn more' : "Узнать больше",
                parent: tooltip,
            });
            printModal(STATE.galleryStep, index, galleryItem);
            tooltipBtn.addEventListener("click", (e) => {
                showModal(tooltip.nextSibling.children[0], tooltip.nextSibling.children[0].children[0]);
            });
            return galleryItem;
        },
    });
    const pagination = createElement({
        eClass: "pagination",
        parent: container,
    });
    const labels = createElements({
        arrLength: BIRDS_DATA.length,
        parent: pagination,
        callback: (_item, index) => {
            const label = createElement({
                tag: "label",
                eClass: "pagination__label",
                parent: pagination,
            });
            const input = createElement({
                tag: "input",
                eClass: "pagination__input",
                attr: { type: "radio", value: index, name: "pagination" },
                parent: label,
            });
            if (+input.value === STATE.currentStep)
                input.parentNode.classList.add("active");
            inputs.push(input);
            return label;
        },
    });
    inputs.forEach((e) => {
        e.addEventListener("click", () => {
            inputs.forEach((e) => {
                e.parentNode.classList.remove("active");
            });
            e.parentNode.classList.add("active");
            printGallery(galleryItems, e.value);
        });
    });
    return main;
}

function printGallery(arr, num) {
    STATE.galleryStep = +num;
    for (let i = 0; i < arr.length; i++) {
        const path = getDataFromStorage('lang') == 'EN' ? BIRD_DATA_EN[num][i] : BIRDS_DATA[num][i];
        const [img, title, subtitle] = arr[i].childNodes;
        title.textContent = path.name;
        subtitle.textContent = path.species;
        img.src = path.image;
        arr[i].lastChild.remove();
        printModal(STATE.galleryStep, i, arr[i]);
    }
}

function showModal(...elems) {
    elems.forEach((el) => {
        el.classList.toggle(`${el.classList[0]}--visible`);
    });
}

function printModal(state, num, parent) {
    const lang = getDataFromStorage('lang') == 'EN' ? BIRD_DATA_EN : BIRDS_DATA;
    let modalPath = lang[state][num];
    const modal = createElement({
        eClass: "modal",
        parent: parent,
    });
    const modalOverlay = createElement({
        eClass: "modal__overlay",
        parent: modal,
    });
    modalOverlay.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalOverlay) {
            showModal(modalContent, modalOverlay);
            gPlayer.pause();
            gPlayer.currentTime = 0;
            timer.gtime = 0;
            stopGTimer();
            if (audioGBtn.classList.contains("is-play") === true) {
                audioGBtn.classList.toggle('is-play');
            }
            audioGCurrentTime.textContent = "00:00";
            audioGProgress.value = gPlayer.currentTime;
        }
    });
    const modalContent = createElement({
        eClass: "modal__content",
        parent: modalOverlay,
    });
    const modalInfo = createElement({
        eClass: "modal__info",
        parent: modalContent,
    });
    const modalText = createElement({
        tag: "p",
        eClass: "modal__text",
        inner: modalPath.description,
        parent: modalInfo,
    });
    const modalBtn = createElement({
        tag: "button",
        eClass: "modal__btn",
        inner: curentLang == 'EN' ? 'Close' : "Закрыть",
        parent: modalContent,
    });
    modalBtn.addEventListener('click', () => {
        showModal(modalContent, modalOverlay);
        gPlayer.pause();
        gPlayer.currentTime = 0;
        timer.gtime = 0;
        stopGTimer();
        if (audioGBtn.classList.contains("is-play") === true) {
            audioGBtn.classList.toggle('is-play');
        }
        audioGCurrentTime.textContent = "00:00";
        audioGProgress.value = gPlayer.currentTime;
    });
    const gPlayer = new Audio();
    const audio = createElement({
        eClass: "audio",
        parent: modalInfo,
    });
    const audioWrapper = createElement({
        eClass: "audio__wrapper",
        parent: audio,
    });
    const audioGBtn = createElement({
        tag: "button",
        eClass: "audio__btn",
        parent: audioWrapper,
    });
    const audioControls = createElement({
        eClass: "audio__controls",
        parent: audioWrapper,
    });
    const audioGProgress = createElement({
        tag: "input",
        eClass: "audio__progress",
        attr: { type: "range", min: 0, max: ``, value: "0", step: "0.1" },
        parent: audioControls,
    });
    const audioTimePanel = createElement({
        eClass: "audio__timeline",
        parent: audioControls,
    });
    const audioGCurrentTime = createElement({
        eClass: "audio__time",
        inner: "00:00",
        parent: audioTimePanel,
    });
    const audioGFullTime = createElement({
        eClass: "audio__time",
        inner: `${BIRDS_DATA[state][num].duration}`,
        parent: audioTimePanel,
    });
    const audioGVolume = createElement({
        tag: "input",
        eClass: "audio__volume",
        attr: { type: "range", min: 0, max: 100, value: 50, step: 5 },
        parent: audioControls,
    });
    stopGTimer();
    timer.gtime = 0;
    gPlayer.src = BIRDS_DATA[state][num].audio;
    gPlayer.currentTime = 0;
    audioGBtn.addEventListener('click', () => {
        if (audioGCurrentTime.textContent === audioGFullTime.textContent) {
            audioGCurrentTime.textContent = "00:00";
            stopGTimer();
        }
        if (audioGBtn.classList.contains("is-play") === false) {
            audioGBtn.classList.toggle("is-play");
            gPlayer.play();
            audioGProgress.value = gPlayer.currentTime;
            audioGProgress.setAttribute("max", Math.floor(gPlayer.duration));
            STATE.isStartGTimer = startGTimer(
                audioGCurrentTime,
                STATE.isStartGTimer,
                audioGProgress
            );
        } else {
            audioGBtn.classList.toggle("is-play");
            gPlayer.pause();
            stopGTimer();
        }
    });
    gPlayer.addEventListener("ended", () => {
        stopGTimer();
        audioGBtn.classList.toggle("is-play");
        timer.gtime = 0;
        audioGProgress.value = 0;
        audioGCurrentTime.textContent = "00:00";
    });

    audioGProgress.addEventListener("input", (e) => {
        stopGTimer();
        gPlayer.currentTime = +audioGProgress.value;
        timer.gtime = +audioGProgress.value;
        audioGBtn.classList.add("is-play");
        gPlayer.play();
        audioGProgress.setAttribute("max", Math.floor(gPlayer.duration));
        STATE.isStartGTimer = startGTimer(
            audioGCurrentTime,
            STATE.isStartGTimer,
            audioGProgress,
        );
    });

    audioGVolume.addEventListener('input', () => {
        gPlayer.volume = audioGVolume.value / 100;
    });
}