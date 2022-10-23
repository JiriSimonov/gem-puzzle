import { container } from './index.js';
import { createElement } from './utils/createElement.js';
import { createElementsArr } from './utils/createElementArr.js';

const linksText = ['RSSchool', 'GitHub'];
const linksHref = ['https://docs.rs.school/#/', 'https://github.com/JiriSimonov'];
export const footer = createElement({tag: 'footer', eClass: 'footer'});
const bottm = createElement({tag: 'div', eClass: 'bottm', parent: footer});
const bottmWrapper = createElement({tag: 'div', eClass: 'bottm__wrapper', parent: bottm});
const bottmLinks = createElementsArr({arrLength: linksText.length, parent:bottmWrapper, callback: (_item, index) => createElement({tag: 'a', eClass: 'bottm__link', inner: linksText[index], attr: {'href': `${linksHref[index]}`, 'target': '_blank'}})});
export default bottm;