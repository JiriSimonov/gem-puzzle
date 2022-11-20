export function createElement({
  tag = "div",
  eClass,
  inner = "",
  parent = "",
  attr = "",
  data = "",
}) {
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
  return elem;
}
