import { createElement } from './utils/createElement.js';
import { createElementsArr } from './utils/createElementArr.js';

const linksText = ['GitHub'];
const linksHref = ['https://github.com/JiriSimonov'];
export const footer = createElement({ tag: 'footer', eClass: 'footer' });
const bottm = createElement({ eClass: 'bottm', parent: footer });
const bottmWrapper = createElement({ eClass: 'bottm__wrapper', parent: bottm });
const bottmLinks = createElementsArr({ arrLength: linksText.length, parent: bottmWrapper, callback: (_item, index) => createElement({ tag: 'a', eClass: 'bottm__link', inner: linksText[index], attr: { 'href': `${linksHref[index]}`, 'target': '_blank' } }) });
export default bottm;