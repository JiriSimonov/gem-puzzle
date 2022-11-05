import { createElement } from "./utils/createElement.js";
import { createHeader } from "./components/header.js";
import { createFooter } from "./components/footer.js";

export const app = document.getElementById('app');

const headerScore = createElement({
    eClass: "header__score",
    inner: "Score: 0",
});

app.appendChild(createHeader(headerScore));
app.appendChild(createFooter());

