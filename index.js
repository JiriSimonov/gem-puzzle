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
