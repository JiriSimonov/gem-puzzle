function getWidth() {
    const petsImg = document.querySelector('.pets__image').clientWidth;
    const petsItems = document.querySelectorAll('.pets__item');
    petsItems.forEach(e => {
        e.setAttribute("style" , "max-width:" + petsImg + "px");
    })
}
window.onresize = function( event ) {
    getWidth()
}