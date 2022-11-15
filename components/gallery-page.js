import { createHeader } from "./header.js";
import { createMainGallery } from "./gallery-page-main.js";
import { createFooter } from "./footer.js";

export default function createGalleryPage(props) {
  const el = document.createElement("div");
  el.classList.add("gallery-page");
  el.append(createHeader());
  el.append(createMainGallery());
  el.append(createFooter());
  return el;
}
