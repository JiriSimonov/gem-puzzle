const line = document.querySelector('.donation__line');
let items = document.querySelectorAll('.donation__item');
const buttons = document.querySelectorAll('.donation__btn, .donation__button');
const burgerItem = document.querySelector('.burger');
const burgerBtn = document.querySelector('.burger--orange');
const menu = document.querySelector('.nav');

burgerItem.addEventListener('click', () => {
    burgerItem.classList.toggle('is-open');
    menu.classList.toggle('nav--open');
})

function setActive() {
    line.addEventListener('click', (event) => {
        if (event.target.classList.contains('donation__item')) {
            items.forEach(e => {
                e.classList.remove('active');
            });
            buttons.forEach(e => {
                e.classList.remove('target');
            });
            event.target.classList.add('active');
        }
        if (event.target.classList.contains('donation__btn')) {
            buttons.forEach(e => {
                e.classList.remove('target');
            });
            items.forEach(e => {
                e.classList.remove('active');
            });
            event.target.classList.add('target');
        }
        if (event.target.classList.contains('donation__button')) {
            buttons.forEach(e => {
                e.classList.remove('target');
            });
            items.forEach(e => {
                e.classList.remove('active');
            });
            event.target.parentNode.classList.add('target')
        }
    })
}
function getActive() {
    const countItems = document.querySelectorAll('.donation__total');
    items = [].slice.apply(items);
    items.forEach(function (element, i) {
        element.addEventListener('click', function () {
            countItems.forEach(e => {
                e.classList.remove('current');
            })
            countItems[i].classList.add('current');
        })
    });


}

function getMinMax() {
    const input = document.querySelector('.donation__input');
    const min = +input.min;
    const max = +input.max;
    input.addEventListener('input', (e) => {
        const value = +input.value;
        if (value > max) { input.value = max }
        else if (value < min) { input.value = min }
    })
}

getMinMax();
setActive();
getActive();