let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

let timeAutoNext = 5000; // 5 seconds
let runNextAuto;
let unAcceppClick; // Unaccepted click timeout

const startAutoTransition = () => {
    if (!carousel.classList.contains('showDetail')) { // Check if not in detail view
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextButton.click();
        }, timeAutoNext);
    }
};

const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000);

    startAutoTransition(); // Reset the timer
};

nextButton.onclick = function() {
    showSlider('next');
    startAutoTransition(); // Reset the timer
};

prevButton.onclick = function() {
    showSlider('prev');
    startAutoTransition(); // Reset the timer
};

seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
        clearTimeout(runNextAuto); // Stop auto transition when showing details
    }
});

backButton.onclick = function(){
    carousel.classList.remove('showDetail');
    startAutoTransition(); // Restart auto transition when going back to homepage
};

// Initialize the auto transition on page load
startAutoTransition();
