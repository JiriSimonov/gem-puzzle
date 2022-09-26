const petsImg = document?.querySelector('.pets__image').clientWidth;
const petsItems = document.querySelectorAll('.pets__item');
const petsDescr = document.querySelectorAll('.pets__descr');
const burgerItem = document.querySelector('.burger');
/*function getWidth() {
    petsItems.forEach(e => {
        e.setAttribute("style" , "max-width:" + (petsImg + 2) + "px");
    })
    petsDescr.forEach(e => {
        e.setAttribute("style" , "max-width:" + (petsImg + 2) + "px");
    })
}
*/
function toggleBurger() {
    burgerItem.addEventListener('click', () => {
        burgerItem.classList.toggle('is-open')
        console.log('clicked')
    })
}
/*
getWidth();
window.onresize = function( event ) {
    getWidth();
}
 */
toggleBurger();