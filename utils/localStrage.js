export const savedGame = {};

export const getStateFromStorage = () => {
    if (localStorage.getItem('State')) {
        const currentState = JSON.parse(localStorage.getItem('State'));
        for (const key in currentState) {
            savedGame[key] = currentState[key];
        }
        return savedGame;
    };
};

export const getScoreFromStorage = () => {
    if (localStorage.getItem('Score')) return JSON.parse(localStorage.getItem('Score'));
};

export const setStateToStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
};