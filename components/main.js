import { createElement } from "../utils/createElement.js";

export function createMain(wrapper) {
    const main = createElement({tag: 'main', eClass: 'main'});
    const game = createElement({tag: 'section', eClass: 'game', parent: main});
    const container = createElement({eClass: 'container', parent: game});

    container.appendChild(wrapper);
    return main;
}
