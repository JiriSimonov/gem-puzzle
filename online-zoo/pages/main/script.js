const burgerItem = document.querySelector('.burger');
const testimonialsBtn = document.querySelector('.btn-modal');
const modalOverlay = document.querySelector('.modal__overlay');
const modalContent = document.querySelector('.modal__content');
const modalClose = document.querySelector('.modal__close');
const menu = document.querySelector('.nav');

modalOverlay.addEventListener('click', (e) => {
   if (e.target == modalOverlay) {
       modalOverlay.classList.remove('modal__overlay--visible');
       modalContent.classList.remove('modal__content--visible');
   }
})
testimonialsBtn.addEventListener('click', () => {
    modalOverlay.classList.add('modal__overlay--visible');
    modalContent.classList.add('modal__content--visible');
})
modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('modal__overlay--visible');
    modalContent.classList.remove('modal__content--visible');
})
burgerItem.addEventListener('click', () => {
    burgerItem.classList.toggle('is-open');
    menu.classList.toggle('nav--open');
})
