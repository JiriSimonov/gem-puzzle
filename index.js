// app.appendChild(createHeader(headerScore));
// app.appendChild(createMain());
// app.appendChild(createFooter());

import { createRouter } from './router.js';

function createLinks() {
    const links = [
        document.createElement('a'),
        document.createElement('a'),
        document.createElement('a'),
    ];
    links[0].href = `#${"start" /* AppRoute.Start */}`;
    links[0].textContent = 'Start';
    links[1].href = `#${"quiz" /* AppRoute.Quiz */}`;
    links[1].textContent = 'Quiz';
    links[2].href = `#${"results" /* AppRoute.Results */}`;
    links[2].textContent = 'Result';
    return links;
}
class App {
    constructor() {
        this.appId = 'app';
    }
    start() {
        const root = document.querySelector(`#${this.appId}`);
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        createLinks().forEach((link) => {
            root.appendChild(link);
        });
        root.appendChild(wrapper);
        if (root) {
            this.router = createRouter(wrapper);
        }
    }
    destroyApp() {
        const root = document.querySelector(`#${this.appId}`);
        root.innerHTML = '';
        this.router.destroy();
    }
}
const app = new App();
app.start();