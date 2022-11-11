import { createFooter } from "./footer.js";
import { createHeader } from "./header.js";
import { createMain } from "./main.js";

export default function createGalleryPage(props) {
  const el = document.createElement("div");
  el.classList.add("gallery-page");
  el.append(createHeader());
  el.append(createFooter());
  return el;
}
