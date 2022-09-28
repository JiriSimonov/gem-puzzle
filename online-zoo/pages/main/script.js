const burgerItem = document.querySelector('.burger');
function toggleBurger() {
    burgerItem.addEventListener('click', () => {
        burgerItem.classList.toggle('is-open')
        console.log('clicked')
    })
}

toggleBurger();