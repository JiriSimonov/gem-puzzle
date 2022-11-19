import { createFooter } from "./footer.js";
import { createHeader } from "../song-bird/header.js";
import { createMain } from "./main.js";

export default function createQuizPage(score) {
  const el = document.createElement("div");
  el.classList.add("quiz-page");
  el.appendChild(createHeader(score));
  el.appendChild(createMain());
  el.appendChild(createFooter());
  return el;
}
