import { getDataFromStorage, setStateToStorage } from "../utils/local-storage.js";

export const MAIN_SECTIONS = [
  {
    title: ["Разминка",
      "Воробьиные",
      "Лесные птицы",
      "Певчие птицы",
      "Хищные птицы",
      "Морские птицы"]
  },
  {
    title: [
      "Warm-up",
      "Sparrows",
      "Forest Birds",
      "Singing Birds",
      "Predator birds",
      "Sea Birds"
    ]
  }
];

export const FOOTER_INFO = {
  text: ["@JiriSimonov"],
  link: ["https://github.com/JiriSimonov"],
};

export const HEADER_LINKS = [

  {
    text: "Главная",
    textEn: "Home",
    link: "#start",
  },
  {
    text: "Викторина",
    textEn: "Quiz",
    link: "#quiz",
  },
  {
    text: "Галерея",
    textEn: "Gallery",
    link: "#gallery",
  }

];


try {
  if (getDataFromStorage('lang') === 'EN' || getDataFromStorage('lang') === 'RU') {
    getDataFromStorage('lang');
  }
} catch (err) {
  setStateToStorage('lang', 'RU');
}

export const STATE = {
  lang: getDataFromStorage('lang'),
  score: 0,
  currentStep: 0,
  currentAnswer: 0,
  solution: undefined,
  volume: 50,
  currentTime: undefined,
  isGetAnswer: false,
  isStartTimer: null,
  isStartQTimer: null,
  isStartGTimer: null,
  isGameEnd: false,
  theme: getDataFromStorage('theme') ?? true,
  galleryStep: 0,
};
