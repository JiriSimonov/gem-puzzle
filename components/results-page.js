import { createFooter } from "./footer.js";
import { createHeader } from "./header.js";
import { createMainResults } from "./result-page-main.js";

export default function createResultPage(props) {
    const el = document.createElement('div');
    el.classList.add('results-page');
    el.append(createHeader());
    el.append(createMainResults());
    el.append(createFooter());    
    return el;
}
