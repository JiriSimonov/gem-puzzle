export function createElement({ tag, eClass, inner = '', parent = '', attr = '', data = '', bg = '' }) {
    const elem = document.createElement(tag);
    elem.className = eClass;
    if (inner) elem.innerHTML = inner;
    if (attr) {
        for (const key in attr) {
            elem.setAttribute(key, attr[key]);
        }
    }
    if (data) {
        for (const key in data) {
            elem.dataset[key] = data[key];
        }
    }
    if (parent) parent.appendChild(elem);
    if (bg) elem.style.backgroundImage = `url('./assets/gems/gem-${+bg}.png')`;
    return elem;
}