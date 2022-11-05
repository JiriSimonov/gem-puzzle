import { createElement } from "./utils/createElement.js";
import { createElements } from "./utils/createElements.js";
import { MAIN__SECTIONS } from "./data/globals.js";
import { createHeader } from "./components/header.js";
import { createFooter } from "./components/footer.js";
import { createMain } from "./components/main.js";
import birdsData from "./data/data.js";


export const app = document.getElementById('app');

const headerScore = createElement({
    eClass: "header__score",
    inner: "Счёт: 0",
});

const gameWrapper = createElement({eClass: 'game__wrapper'});
const mainSections = createElements({
    arrLength: MAIN__SECTIONS.length,
    parent: gameWrapper,
    callback: (_item, index) =>
      createElement({
        eClass: "game__section",
        inner: `${MAIN__SECTIONS[index]}`,
        parent: gameWrapper
      }),
  });

app.appendChild(createHeader(headerScore));
app.appendChild(createMain(gameWrapper));
app.appendChild(createFooter());

console.log(birdsData);