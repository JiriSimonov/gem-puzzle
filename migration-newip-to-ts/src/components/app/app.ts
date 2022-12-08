import AppController from '../controller/controller';
import { AppView } from '../view/appView';

export class App {
    private view: AppView;

    private controller: AppController;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const container = document.querySelector('.sources') as HTMLElement;
        const contentWrapper = document.querySelector('.main__content') as HTMLDivElement;
        container.addEventListener('click', (e) => {
            this.controller.getNews(e, (data) => this.view.drawNews(data));
            contentWrapper.classList.add('main__content_is-open');
        });
        this.controller.getSources((data) => {
            this.view.drawSources(data);
        });
    }
}
