const line = document.querySelector('.donation__line');
let items = document.querySelectorAll('.donation__item');
const buttons = document.querySelectorAll('.donation__btn, .donation__button');
const lineBtns = document.querySelectorAll('.donation__button');
const burgerItem = document.querySelector('.burger');
const menu = document.querySelector('.nav');
const input = document.querySelector('.donation__input');
const body = document.body;
let values = document.querySelectorAll('.donation__total');
let count = 0;

input.addEventListener('input', () => {
    let curVal = input.value;
    const countItems = document.querySelectorAll('.donation__total');
    items.forEach(e => {
        e.classList.remove('active');
        values.forEach(e => {
            e.classList.remove('current')
        });
    });
    buttons.forEach(e => {
        e.classList.remove('active');
        e.classList.remove('target');
        values.forEach(e => {
            e.classList.remove('current')
        });
    });
    countItems.forEach(e => {
       if (e.textContent === curVal) {
           e.classList.add('current');
       }
    });
    lineBtns.forEach(e => {
        if (e.textContent === curVal) {
            lineBtns.forEach(e => {
                e.parentNode.classList.remove('target');
            })
            e.parentNode.classList.add('target');
        }
    });
});

burgerItem.addEventListener('click', () => {
    burgerItem.classList.toggle('is-open');
    menu.classList.toggle('nav--open');
    body.classList.toggle('no-scroll');
})

menu.addEventListener('click', (e) => {
    if (e.target == menu) {
        menu.classList.remove('nav--open');
        burgerItem.classList.toggle('is-open');
        body.classList.toggle('no-scroll');
    }
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
            count = parseInt(countItems[i].textContent);
            input.value = count;
        });
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
    input.addEventListener('keydown', (e) => {
        if (['e', '-', '+', '.', ','].includes(e.key)) {
            e.preventDefault();
        }
    })
}

getMinMax();
setActive();
getActive();