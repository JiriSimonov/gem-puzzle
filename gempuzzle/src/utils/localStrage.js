export const savedGame = {};

export const getDataFromStorage = (item) => {
    if (item === 'State') {
        const currentState = JSON.parse(localStorage.getItem('State'));
        for (const key in currentState) {
            savedGame[key] = currentState[key];
        }
        return savedGame;
    }
    if (item === 'Score') {
        return JSON.parse(localStorage.getItem('Score'));
    }
};

export const setStateToStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
};