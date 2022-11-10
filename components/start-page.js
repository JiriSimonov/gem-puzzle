import { createFooter } from "./footer.js";
import { createHeader } from "./header.js";

export default function createStartPage() {
    const el = document.createElement('div');
    el.classList.add('start-page');
    el.append(createHeader());
    el.append(createFooter());    
    return el;
}
