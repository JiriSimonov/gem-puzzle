export const MAIN_SECTIONS = [
  "Разминка",
  "Воробьиные",
  "Лесные птицы",
  "Певчие птицы",
  "Хищные птицы",
  "Морские птицы",
];

export const FOOTER_INFO = {
  text: ["GitHub", "RSSchool"],
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
];

export const STATE = {
  lang: "RU",
  score: 0,
  currentStep: 0,
  currentAnswer: 0,
  solution: undefined,
  volume: 50,
  currentTime: undefined,
  isGetAnswer: false,
  isStartTimer: null,
  theme: true,
};
