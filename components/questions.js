import { createElement } from "../utils/createElement.js";

export function createQuestions(wrapper, container, descriotion) {
  const questions = createElement({ eClass: "questions" });
  questions.append(wrapper);
  questions.append(container);
  questions.append(descriotion);
  const questionsDescr = createElement({
    eClass: "questions__text",
    inner: "Послушайте плеер.",
    parent: container,
  });
  const questionsScondDescr = createElement({
    eClass: "questions__text",
    inner: "Выберите птицу из списка.",
    parent: container,
  });
  return questions;
}
