import { createElement } from "./utils/createElement.js";

export const headerScore = createElement({
  eClass: "header__score",
  inner: "Счёт: 0",
});

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
export class Router {
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
      route !== null && route !== void 0
        ? route
        : {
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
        component: () =>
          __awaiter(this, void 0, void 0, function* () {
            const { default: createPage } = yield import(
              "./components/start-page.js"
            );
            return createPage();
          }),
      },
      {
        name: "quiz" /* AppRoute.Quiz */,
        component: () =>
          __awaiter(this, void 0, void 0, function* () {
            const { default: createPage } = yield import(
              "./components/quiz-page.js"
            );
            return createPage(headerScore);
          }),
      },
      {
        name: "results" /* AppRoute.Results */,
        component: () =>
          __awaiter(this, void 0, void 0, function* () {
            const { default: createPage } = yield import(
              "./components/results-page.js"
            );
            return createPage([
              { name: "test", score: 100 },
              { name: "test1", score: 110 },
              { name: "test2", score: 120 },
              { name: "test3", score: 130 },
            ]);
          }),
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
    () =>
      __awaiter(this, void 0, void 0, function* () {
        const { default: createPage } = yield import("./components/start-page");
        return createPage();
      })
  );
}
