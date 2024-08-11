let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

let timeAutoNext = 5000;

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}

let runNextAuto;
const startAutoTransition = () => {
    runNextAuto = setTimeout(() => {
        if (!carousel.classList.contains('showDetail')) { // Check if not in detail view
            nextButton.click();
        }
        startAutoTransition(); // Restart the auto transition
    }, timeAutoNext);
}

startAutoTransition(); // Start the auto transition

const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(runNextAuto); // Clear the previous timeout
    startAutoTransition(); // Restart the auto transition

    setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000);
}

seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});

backButton.onclick = function(){
    carousel.classList.remove('showDetail');
}
