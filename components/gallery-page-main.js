import { createElement } from "../utils/createElement.js";
import { createElements } from "../utils/createElements.js";
import BIRDS_DATA from "../data/data.js";
import { STATE } from "../data/globals.js";

export function createMainGallery() {
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
            const galleryItem = createElement({
                eClass: "gallery__item",
                parent: gallery,
            });
            const galleryImg = createElement({
                tag: "img",
                eClass: "gallery__img",
                attr: { src: `${BIRDS_DATA[STATE.currentStep][index].image}` },
                parent: galleryItem,
            });
            const galleryTitle = createElement({
                tag: "h2",
                eClass: "gallery__title",
                inner: `${BIRDS_DATA[STATE.currentStep][index].name}`,
                parent: galleryItem,
            });
            const gallerySubtitle = createElement({
                tag: "h3",
                eClass: "gallery__subtitle",
                inner: `${BIRDS_DATA[STATE.currentStep][index].species}`,
                parent: galleryItem,
            });
            const tooltip = createElement({
                eClass: 'tooltip',
                parent: galleryItem,
            });
            const tooltipBtn = createElement({
                tag: 'button',
                eClass: 'tooltip__btn',
                attr: {'id': `${index + 1}`},
                inner: 'Узнать больше',
                parent: tooltip,
            });
            const modal = createElement({
                eClass: 'modal',
                parent: galleryItem,
            });
            const modalOverlay = createElement({
                eClass: 'modal__overlay',
                parent: modal,
            });
            modalOverlay.addEventListener('click', (e) => {
                let target = e.target;
                if(target === modalOverlay) {
                    modalOverlay.classList.toggle('modal__overlay--visible');
                    modalContent.classList.toggle('modal__content--visible');
                }
            });
            const modalContent = createElement({                
                eClass: 'modal__content',
                parent: modalOverlay,
            });
            const modalText = createElement({
                tag: 'p',
                eClass: 'modal__text',
                inner: BIRDS_DATA[STATE.currentStep][index].description,
                parent: modalContent,
            });
            const modalBtn = createElement({
                tag: 'button',
                eClass: 'modal__btn',
                inner: 'Закрыть',
                parent: modalContent,
            });
            modalBtn.addEventListener('click', (e) => {
                modalOverlay.classList.toggle('modal__overlay--visible');
                modalContent.classList.toggle('modal__content--visible');
            });
            tooltipBtn.addEventListener('click', (e) => {
                modalOverlay.classList.toggle('modal__overlay--visible');
                modalContent.classList.toggle('modal__content--visible');
            });
            return galleryItem;
        },
    });
    const pagination = createElement({
        eClass: 'pagination',
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
            attr: { type: "radio", value: index, name: 'pagination' },
            parent: label,
          });
          input.addEventListener("click", () => {
            printGallery(galleryItems, input.value);
          });
          return label;
        },
      });
    return main;
}


function printGallery(arr, num) {
    for (let i = 0; i < arr.length; i++) {
        const path = BIRDS_DATA[num][i];
        const [img,title,subtitle] = arr[i].childNodes;
        title.textContent = path.name;
        subtitle.textContent = path.species;
        img.src = path.image;
        console.log(BIRDS_DATA[num - 1][i]);
    }
}

