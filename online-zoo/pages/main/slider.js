/*
let position = 0 ;
const slidesToShow = 3;
const slidesToScroll = 3;
const slider = document.querySelector('.pets__wrapper');
const sliderLine = document.querySelectorAll('.pets__list');
const sliderItem = document.querySelectorAll('.pets__item');
const btnNext = document.querySelector('.pets__btn--next');
const btnDescPrev = document.querySelector('.pets__btn--desc-prev');
const btnDescNext = document.querySelector('.pets__btn--desc-next');
const btnPrev = document.querySelector('.pets__btn--prev');
const itemWidth = slider.clientWidth / slidesToShow + 2;
const sliderStep = slidesToScroll * itemWidth;
const itemCount = sliderItem.length;

console.log(itemCount + 'всего элементов');
console.log(itemWidth + 'ширина элемента');
console.log(sliderStep + 'шаг');

btnNext.addEventListener('click', () => {
    /*const itemsLeft = itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= sliderStep >= slidesToScroll ? sliderStep : itemsLeft * itemWidth;
    console.log(position)
    */
  /*  position -= sliderStep;
    sliderLine.style.transform = `translateX(${position})`;
    console.log(sliderLine);
    setPosition();0


})

btnPrev.addEventListener('click', () => {
    position -= sliderStep;
    setPosition();
})
btnNext.addEventListener('click', () => {
    position += sliderStep;
    setPosition();
})
btnDescPrev.addEventListener('click', () => {
    position -= sliderStep;
    setPosition();
})
btnDescNext.addEventListener('click', () => {
    position += sliderStep;
    setPosition();
})

const setPosition = () => {
    sliderLine.forEach(e => {
        e.style.transform = `translateX(${position}px)`;
        console.log(`translateX(${position})`);
    })
}

   */