import { createRouter } from "./router.js";

class App {
  constructor() {
    this.appId = "app";
  }
  start() {
    const root = document.querySelector(`#${this.appId}`);
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    root.appendChild(wrapper);
    if (root) {
      this.router = createRouter(wrapper);
    }
  }
  destroyApp() {
    const root = document.querySelector(`#${this.appId}`);
    root.innerHTML = "";
    this.router.destroy();
  }
}
const app = new App();
app.start();
console.log(`Score: 270/270

Вёрстка, дизайн, UI всех трёх страниц приложения +60

Аудиоплеер +30

Верхняя панель страницы викторины +20:

Блок с вопросом +20:

Блок с вариантами ответов (названия птиц) +60:

Блок с описанием птицы: +30:

Кнопка перехода к следующему вопросу +30:

Создание галереи всех птиц приложения c информацией о них (фото, аудио, название, описание) +10:

Перевод приложения на 2 языка +10.
`)
