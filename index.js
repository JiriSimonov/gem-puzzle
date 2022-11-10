import { createElement } from "./utils/createElement.js";
import { createHeader } from "./components/header.js";
import { createFooter } from "./components/footer.js";
import { createMain } from "./components/main.js";

export const app = document.getElementById("app");
export const headerScore = createElement({
  eClass: "header__score",
  inner: "Счёт: 0",
});

app.appendChild(createHeader(headerScore));
app.appendChild(createMain());
app.appendChild(createFooter());