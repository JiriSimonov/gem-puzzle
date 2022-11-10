import { createElement } from "./utils/createElement.js";

export const headerScore = createElement({
  eClass: "header__score",
  inner: "Счёт: 0",
});
export class Router {
  routes;
  onHashChange;
  defaultComponent;
  constructor(routes, onHashChange, defaultComponent) {
    this.routes = routes;
    this.onHashChange = onHashChange;
    this.defaultComponent = defaultComponent;
    window.addEventListener("hashchange", this.onHashChangeHandler.bind(this));
    this.onHashChangeHandler();
  }
  onHashChangeHandler() {
    const path = window.location.hash.slice(1);
    const route = this.routes.find((r) => r.name === path);
    this.onHashChange(
      route ?? {
        name: "default" /* AppRoute.Default */,
        component: this.defaultComponent,
      }
    );
  }
  destroy() {
    window.removeEventListener(
      "hashchange",
      this.onHashChangeHandler.bind(this)
    );
  }
}
export function createRouter(routerOutlet) {
  return new Router(
    [
      {
        name: "start" /* AppRoute.Start */,
        component: async () => {
          const { default: createPage } = await import(
            "./components/start-page.js"
          );
          return createPage();
        },
      },
      {
        name: "quiz" /* AppRoute.Quiz */,
        component: async () => {
          const { default: createPage } = await import(
            "./components/quiz-page.js"
          );
          return createPage(headerScore);
        },
      },
      {
        name: "results" /* AppRoute.Results */,
        component: async () => {
          const { default: createPage } = await import(
            "./components/results-page.js"
          );
          return createPage();
        },
      },
    ],
    (route) => {
      if (route) {
        route.component().then((component) => {
          routerOutlet.innerHTML = "";
          routerOutlet.appendChild(component);
        });
      }
    },
    async () => {
      const { default: createPage } = await import(
        "./components/start-page.js"
      );
      return createPage();
    }
  );
}
