const line = document.querySelector('.donation__line');
let items = document.querySelectorAll('.donation__item');
const buttons = document.querySelectorAll('.donation__btn, .donation__button');
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
setActive();
getActive();