import { createElement } from "../utils/createElement.js";

export function createAudio(btn, input, current, max, img = '') {
  const audio = createElement({ eClass: "audio" });
  if (img) audio.appendChild(img);
  const audioWrapper = createElement({
    eClass: "audio__wrapper",
    parent: audio,
  });
  audioWrapper.appendChild(btn);
  const audioControls = createElement({
    eClass: "audio__controls",
    parent: audioWrapper,
  });
  const audioProgressBar = createElement({
    eClass: "audio__container",
    parent: audioControls,
  });
  audioProgressBar.appendChild(input);
  const audioTimePanel = createElement({
    eClass: "audio__timeline",
    parent: audioControls,
  });
  audioTimePanel.append(current, max);
  return audio;
}
