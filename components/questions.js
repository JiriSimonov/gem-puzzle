import { createElement } from "../utils/createElement.js";

export function createQuestions(wrapper) {
    const questions = createElement({ eClass: 'questions' });
    questions.append(wrapper);
    const questionsContainer = createElement({ eClass: 'questions__container', parent: questions });
    const questionsDescr = createElement({ eClass: 'questions__text', inner: 'Послушайте плеер.', parent: questionsContainer });
    const questionsScondDescr = createElement({ eClass: 'questions__text', inner: 'Выберите птицу из списка.', parent: questionsContainer });
    return questions;
}
