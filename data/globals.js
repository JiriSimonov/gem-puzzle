import { getDataFromStorage, setStateToStorage } from "../utils/local-storage.js";

export const MAIN_SECTIONS = [
  "Разминка",
  "Воробьиные",
  "Лесные птицы",
  "Певчие птицы",
  "Хищные птицы",
  "Морские птицы",
];

export const FOOTER_INFO = {
  text: ["@JiriSimonov", "RSSchool 2022"],
  link: ["https://github.com/JiriSimonov", "https://rs.school/js/"],
};

export const HEADER_LINKS = [
  {
    text: "Home",
    link: "#start",
  },
  {
    text: "Quiz",
    link: "#quiz",
  },
  {
    text: "Gallery",
    link: "#gallery",
  },
];

if (getDataFromStorage('lang') === 'EN' || getDataFromStorage('lang') === 'RU' ) {
  getDataFromStorage('lang');
} else {
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
  isGameEnd: false,
  theme: getDataFromStorage('theme') ?? true,
  galleryStep: 0,
};
