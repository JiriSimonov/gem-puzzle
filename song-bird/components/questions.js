import { createElement } from "../utils/createElement.js";
import { getDataFromStorage } from "../utils/local-storage.js";

const lang = getDataFromStorage('lang')
export function createQuestions(wrapper = '', container = '', descriotion = '') {
  const questions = createElement({ eClass: "questions" });
  questions.append(wrapper);
  questions.append(container);
  questions.append(descriotion);
  container.innerHTML = '';
  const questionsDescr = createElement({
    eClass: "questions__text",
    inner: lang == 'EN' ? "Listen to the player" : 'Послушайте плеер',
    parent: container,
  });
  const questionsSecondDescr = createElement({
    eClass: "questions__text",
    inner: lang == 'EN' ? "Select a bird from the list": "Выберите птицу из списка",
    parent: container,
  });
  return questions;
}
