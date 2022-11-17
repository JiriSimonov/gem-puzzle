import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import BIRDS_DATA from "../data/data.js";
import { STATE } from "../data/globals.js";

export function createMainGallery() {
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
            const path = BIRDS_DATA[STATE.currentStep][index];
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
                inner: "Узнать больше",
                parent: tooltip,
            });
            printModal(STATE.galleryStep, index , galleryItem);
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
        const path = BIRDS_DATA[num][i];
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
        let modalPath = BIRDS_DATA[state][num];
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
            }
        });
        const modalContent = createElement({
            eClass: "modal__content",
            parent: modalOverlay,
        });
        const modalText = createElement({
            tag: "p",
            eClass: "modal__text",
            inner: modalPath.description,
            parent: modalContent,
        });
        const modalBtn = createElement({
            tag: "button",
            eClass: "modal__btn",
            inner: "Закрыть",
            parent: modalContent,
        });
        modalBtn.addEventListener("click", (e) => {
            showModal(modalContent, modalOverlay);
        });
    }