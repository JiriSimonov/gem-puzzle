export const getDataFromStorage = (item) => {
    if (localStorage.getItem(item)) {
        return JSON.parse(localStorage.getItem(item));
    }
};

export const setStateToStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
};
