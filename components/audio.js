import { createElement } from "../utils/createElement.js";
import { STATE } from "../data/globals.js";

export function createAudio() {
    const audio = createElement({eClass: 'audio'});
    const audioWrapper = createElement({eClass: 'audio__wrapper', parent: audio});
    const audioBtn = createElement({tag: 'button', eClass: 'audio__btn', parent: audioWrapper});
    const audioCurrentTime = createElement({eClass: 'audio__time', inner: '00:00', parent: audioWrapper});
    const audioFullTime = createElement({eClass: 'audio__time', inner: '00:00', parent: audioWrapper});
    return audio;
}