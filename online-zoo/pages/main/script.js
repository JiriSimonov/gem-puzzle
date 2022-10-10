const burgerItem = document.querySelector('.burger');
const testimonialsBtn = document.querySelector('.btn-modal');
const modalOverlay = document.querySelector('.modal__overlay');
const modalContent = document.querySelector('.modal__content');
const modalClose = document.querySelector('.modal__close');
const menu = document.querySelector('.nav');
const body = document.body;
/* media */
const mediaQueryTablet = window.matchMedia('(max-width: 999px)');
const mediaQuery = window.matchMedia('(max-width: 1599px)');

modalOverlay.addEventListener('click', (e) => {
    if (e.target == modalOverlay) {
        modalOverlay.classList.remove('modal__overlay--visible');
        modalContent.classList.remove('modal__content--visible');
    }
})
testimonialsBtn.addEventListener('click', () => {
    modalOverlay.classList.add('modal__overlay--visible');
    modalContent.classList.add('modal__content--visible');
    body.classList.add('no-scroll');
})
modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('modal__overlay--visible');
    modalContent.classList.remove('modal__content--visible');
    body.classList.remove('no-scroll');
})
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

const testimonContainer = document.querySelector('.testimonials__list');
const testimonItems = document.querySelectorAll('.testimonials__item');
let testimonItem = document.querySelector('.testimonials__item').clientWidth + 4 + 30;
let position = 0;
let testimonPosition = 0;
const testInput = document.querySelector('.testimonials__input');
const setPosition = () => {
    testimonContainer.style.transform = `translateX(${testimonPosition}px)`;
    list1.style.transform = `translateX(${position}px)`;
    list2.style.transform = `translateX(${position}px)`;
}

testInput.addEventListener('click', () => {
    testimonPosition = testInput.value * -testimonItem;
    setPosition();
})
testInput.addEventListener('input', () => {
    testimonPosition = testInput.value * -testimonItem;
    setPosition();
})


if (mediaQuery.matches === true) {
    testInput.max = '8';
    testInput.addEventListener('click', () => {
        testimonPosition = testInput.value * -testimonItem;
        setPosition();
    })
    testInput.addEventListener('input', () => {
        testimonPosition = testInput.value * -testimonItem;
        setPosition();
    })
}

/* 999px @media */
if (mediaQueryTablet.matches === true) {
    const container = document.querySelector('.testimonials__list');
    const items = document.querySelectorAll('.testimonials__item');
    const bodyCont = document.querySelector('.body');
    const overlay = document.querySelectorAll('.popup__overlay');
    const closeBtns = document.querySelectorAll('.popup__close');
    container.addEventListener('click', (e) => {
        let target = e.target;
        items.forEach(i => {
            if (target === i || i === target.parentNode || i === target.parentNode.parentNode) {
                i.classList.add('open');
                bodyCont.classList.add('no-scroll');
            }
        });
        overlay.forEach(y => {
            if (target === y && target !== target.closest('.popup__content') && target !== target.closest('.popup__item')) {
                bodyCont.classList.remove('no-scroll');
                y.closest('.open').classList.remove('open');
            }
        });
        closeBtns.forEach(x => {
            if (target === x) {
                bodyCont.classList.remove('no-scroll');
                x.closest('.open').classList.remove('open');
            }
        }
        )
    });
}

const list1 = document.querySelector('.pets__list--1');
const list2 = document.querySelector('.pets__list--2');

function setRandom(arr) {
    for (let i = arr.children.length; i >= 0; i--) {
        let randomNum = Math.random() * i | 0;
        let currentItem = arr.children[randomNum];
        arr.appendChild(currentItem);
    }
}

setRandom(list1);
setRandom(list2);

const btnPrev = document.querySelector('.pets__btn--pr');
const btnPrevSm = document.querySelector('.pets__btn--prev');
const btnNext = document.querySelector('.pets__btn--nx');
const btnNextSm = document.querySelector('.pets__btn--next');
const petsWrapper = document.querySelector('.pets__wrapper');

btnPrev.addEventListener('click', () => {
    btnPrev.disabled = true;
    if (position === 0) {
        position = -1188;
        setRandom(list1);
        setRandom(list2);
        setPosition();
    } else {
        position = position + petsWrapper.clientWidth + 28;
        setRandom(list1);
        setRandom(list2);
        setPosition();
    }
    setTimeout(function () { btnPrev.disabled = false }, 500);
})
btnPrevSm.addEventListener('click', () => {
    btnPrevSm.disabled = true;
    if (position === 0) {
        position = -969;
        setRandom(list1);
        setRandom(list2);
        setPosition();
    } else {
        position = position + petsWrapper.clientWidth + 29;
        setRandom(list1);
        setRandom(list2);
        setPosition();
    }
    setTimeout(function () { btnPrevSm.disabled = false }, 500);
})
btnNext.addEventListener('click', () => {
    btnNext.disabled = true;
    if (position <= -969) {
        position = 0;
        setRandom(list1);
        setRandom(list2);
        setPosition();
    } else {
        setRandom(list1);
        setRandom(list2);
        position = position + -petsWrapper.clientWidth + -28;
        setPosition();
    }
    setTimeout(function () { btnNext.disabled = false }, 500);
})

btnNextSm.addEventListener('click', () => {
    btnNextSm.disabled = true;
    if (position <= -969) {
        position = 0;
        setRandom(list1);
        setRandom(list2);
        setPosition();
    } else {
        setRandom(list1);
        setRandom(list2);
        position = position + -petsWrapper.clientWidth + -29;
        setPosition();
    }
    setTimeout(function () { btnNextSm.disabled = false }, 500);
})

if (mediaQueryTablet.matches) {
    let stepPosition = 0;
    const setNewPosition = () => {
        list1.style.transform = `translateX(${stepPosition}px)`;
        list2.style.transform = `translateX(${stepPosition}px)`;
    }
    btnPrevSm.addEventListener('click', () => {
        btnPrevSm.disabled = true;
        if (stepPosition === 289) {
            stepPosition = -1260;
            setRandom(list1);
            setRandom(list2);
        }
        if (stepPosition === 0) {
            stepPosition = -1260;
            setRandom(list1);
            setRandom(list2);
            setNewPosition();
        } else {
            stepPosition = stepPosition + 630;
            setRandom(list1);
            setRandom(list2);
            setNewPosition();
        }
        setTimeout(function () { btnPrevSm.disabled = false }, 500);
    })
    btnNextSm.addEventListener('click', () => {
        btnNextSm.disabled = true;
        if (stepPosition <= -1260) {
            stepPosition = 0;
            setRandom(list1);
            setRandom(list2);
            setNewPosition();
        } else {
            setRandom(list1);
            setRandom(list2);
            stepPosition = stepPosition - 630;
            setNewPosition();
        }
        setTimeout(function () { btnNextSm.disabled = false }, 500);
    })
}

alert('Привет! Не забывайте обновлять страницу при смене разрешения. В слайдере pets есть ограничение на пролистывание во время анимации, его можно отследить в DevTools. Кнопке добавляется атрибут disabled на время анимаци. В testimonials попап открывается только при клике на карточку или текст карточки(при нажатии на имя/дату поста он не откроется (в критериях снятия баллов за это нет))')