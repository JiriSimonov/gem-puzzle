import { createElement } from "../utils/createElement.js";
import { createAudio } from "./audio.js";

export function createMain(wrapper) {
    const main = createElement({tag: 'main', eClass: 'main'});
    const game = createElement({tag: 'section', eClass: 'game', parent: main});
    const container = createElement({eClass: 'container', parent: game});
    container.append(wrapper, createAudio());
    return main;
}
