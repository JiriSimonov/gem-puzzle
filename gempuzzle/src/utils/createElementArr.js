export function createElementsArr({ arrLength, callback, parent }) {
    const arr = new Array(arrLength).fill(0).map(callback);
    arr.forEach((e) => {
        parent.appendChild(e);
    });
    return arr;
}